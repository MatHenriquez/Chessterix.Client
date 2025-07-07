import SignInModal from '@/auth/components/sign-in/SignInModal';
import SignUpModal from '@/auth/components/sign-up/SignUpModal';
import React, { FC } from 'react';

type AuthButtonProps = {
  showLoginModal: boolean;
  setShowLoginModal: (value: boolean) => void;
  showSignUpModal: boolean;
  setShowSignUpModal: (value: boolean) => void;
};

const AuthModalGroup: FC<AuthButtonProps> = ({
  showLoginModal,
  setShowLoginModal,
  showSignUpModal,
  setShowSignUpModal
}) => (
  <>
    <SignInModal
      showLoginModal={showLoginModal}
      setShowLoginModal={setShowLoginModal}
    />
    <SignUpModal
      showSignUpModal={showSignUpModal}
      setShowSignUpModal={setShowSignUpModal}
    />
  </>
);

export default AuthModalGroup;
