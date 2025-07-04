import AuthButton from '@/components/AuthButton';
import React, { FC } from 'react';

type AuthButtonGroupProps = {
  showLoginModal: boolean;
  setShowLoginModal: (value: boolean) => void;
  showSignUpModal: boolean;
  setShowSignUpModal: (value: boolean) => void;
};

const AuthButtonGroup: FC<AuthButtonGroupProps> = ({
  showLoginModal,
  setShowLoginModal,
  showSignUpModal,
  setShowSignUpModal
}) => (
  <div className="flex flex-col md:flex-row gap-6 items-center justify-center animate-slide-up">
    <AuthButton
      showAuthModal={showLoginModal}
      setShowAuthModal={setShowLoginModal}
      text="Sign In"
    />
    <AuthButton
      showAuthModal={showSignUpModal}
      setShowAuthModal={setShowSignUpModal}
      text="Sign Up"
    />
  </div>
);

export default AuthButtonGroup;
