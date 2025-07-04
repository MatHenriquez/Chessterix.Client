import * as React from 'react';
import { Formik, Form } from 'formik';
import FloatingLabelField from '@/components/FloatingLabelField';

interface Values {
  email: string;
  password: string;
}

const SignInForm = () => {
  const initialValues: Values = { email: '', password: '' };

  const validate = (v: Values) => {
  const e: Partial<Values> = {};
  if (!v.email) e.email = '*Required';
  else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(v.email))
    e.email = '*Invalid email';
  if (!v.password) e.password = '*Required';
  return e;
};

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={(values, actions) => {
        actions.setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-6">
          <FloatingLabelField
            name="email"
            type="email"
            label="Email"
            id="email"
            data-cy="email-input"
            placeholder="example@domain.com"
          />

          <FloatingLabelField
            name="password"
            type="password"
            label="Password"
            id="password"
            data-cy="password-input"
            placeholder="••••••••"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-red-main text-white font-semibold rounded-md hover:bg-kimono-200 transition-colors duration-300 shadow-md"
            data-cy="submit-login"
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SignInForm;
