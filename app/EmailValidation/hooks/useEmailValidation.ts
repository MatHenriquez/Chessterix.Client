import { useEffect, useState } from 'react';
import axiosInstance from '@/core/utils/axios-config/axios-instance';
import { BackEndLinks } from '@/core/constants/back-end-links';

type ValidationStatus = 'loading' | 'success' | 'error';

export const useEmailValidation = (validationToken: string | null) => {
  const [validationStatus, setValidationStatus] =
    useState<ValidationStatus>('loading');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!validationToken) {
      setValidationStatus('error');
      setErrorMessage('No validation token provided.');
      return;
    }

    const validateEmail = async () => {
      try {
        await axiosInstance.post(BackEndLinks.EMAIL_VERIFICATION, {
          token: validationToken
        });
        setValidationStatus('success');
      } catch (error) {
        console.error('Email validation failed:', error);
        setValidationStatus('error');
        setErrorMessage(
          'Email validation failed. Please try again or contact support.'
        );
      }
    };

    validateEmail();
  }, [validationToken]);

  return { validationStatus, errorMessage };
};
