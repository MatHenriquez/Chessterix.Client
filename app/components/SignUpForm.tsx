import * as React from 'react';
import { Formik, Form } from 'formik';
import axiosInstance from '@/utils/axios-config/axios-instance';
import { BackEndLinks } from '@/constants/back-end-links';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingButton from '@/components/LoadingButton';
import { AxiosError } from 'axios';
import FloatingLabelField from '@/components/FloatingLabelField';

interface SignUpFormValues {
  email: string;
  password: string;
  repeatPassword: string;
}

export const SignUpForm = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const initialValues: SignUpFormValues = {
    email: '',
    password: '',
    repeatPassword: ''
  };

  const signUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);

    const email = event.currentTarget.email.value;
    const password = event.currentTarget.password.value;

    try {
      const { data } = await axiosInstance.post(BackEndLinks.REGISTER, {
        email,
        password
      });

      const jwt = data.data.token;
      localStorage.setItem('jwt', jwt);

      setIsLoading(false);
      toast.success('Success!');

      setTimeout(() => {
        window.location.href = '/home';
      }, 3000);
    } catch (error) {
      console.error(error);
      setIsLoading(false);

      const axiosError = error as AxiosError;

      if (axiosError?.response?.status === 409)
        toast.error('Error! User already exists.');
      else toast.error('Error! Please try again.');
    }
  };

  const validate = (values: SignUpFormValues) => {
    const errors: Partial<SignUpFormValues> = {};

    if (!values.email) {
      errors.email = '*Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = '*Invalid email address';
    }

    if (!values.password) {
      errors.password = '*Required';
    } else if (values.password.length < 8) {
      errors.password = '*Password must be at least 8 characters';
    }

    if (!values.repeatPassword) {
      errors.repeatPassword = '*Required';
    } else if (values.password !== values.repeatPassword) {
      errors.repeatPassword = '*Passwords do not match';
    }

    return errors;
  };
  return (
    <div className="w-full">
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={(values, actions) => {
          actions.setSubmitting(false);
        }}
      >
        {({ handleSubmit }) => (
          <Form
            className="space-y-6"
            onSubmit={(event) => {
              handleSubmit(event);
              signUp(event);
            }}
          >
            <FloatingLabelField
              name="email"
              type="email"
              label="Email"
              id="email"
              data-cy="email-input"
              placeholder="john.doe@mail.com"
            />

            <FloatingLabelField
              name="password"
              type="password"
              label="Password"
              id="password"
              data-cy="password-input"
              placeholder="••••••••"
            />

            <FloatingLabelField
              name="repeatPassword"
              type="password"
              label="Repeat Password"
              id="repeatPassword"
              data-cy="repeat-password-input"
              placeholder="••••••••"
            />

            <div className="flex w-full justify-center">
              {!isLoading ? (
                <button
                  type="submit"
                  className="w-full py-3 bg-red-main text-white font-semibold rounded-md hover:bg-kimono-200 transition-colors duration-300 shadow-md"
                  data-cy="submit-sign-up"
                >
                  Register
                </button>
              ) : (
                <LoadingButton dataTestId="submit-sign-up" />
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
