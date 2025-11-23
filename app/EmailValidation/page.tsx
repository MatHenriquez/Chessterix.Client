'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import React, { Suspense } from 'react';
import ValidationContainer from './components/ValidationContainer';
import ValidationCard from './components/ValidationCard';
import ValidationTitle from './components/ValidationTitle';
import LoadingState from './components/LoadingState';
import SuccessState from './components/SuccessState';
import ErrorState from './components/ErrorState';
import { useEmailValidation } from './hooks/useEmailValidation';

const EmailValidationContent: React.FC = () => {
    const EMAIL_VALIDATION_TOKEN = "token";
    const searchParams = useSearchParams();
    const validationToken = searchParams.get(EMAIL_VALIDATION_TOKEN);
    const router = useRouter();
    
    const { validationStatus, errorMessage } = useEmailValidation(validationToken);

    const handleGoHome = () => {
        router.push('/');
    };

    return (
        <ValidationContainer>
            <ValidationCard>
                <ValidationTitle />
                {validationStatus === 'loading' && <LoadingState />}
                {validationStatus === 'success' && <SuccessState onGoHome={handleGoHome} />}
                {validationStatus === 'error' && <ErrorState errorMessage={errorMessage} onGoHome={handleGoHome} />}
            </ValidationCard>
        </ValidationContainer>
    );
};

const EmailValidation: React.FC = () => {
    return (
        <Suspense fallback={
            <ValidationContainer>
                <ValidationCard>
                    <ValidationTitle />
                    <LoadingState />
                </ValidationCard>
            </ValidationContainer>
        }>
            <EmailValidationContent />
        </Suspense>
    );
};

export default EmailValidation;