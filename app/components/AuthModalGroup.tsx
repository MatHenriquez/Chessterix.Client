import SignInModal from '@/components/SignInModal';
import SignUpModal from '@/components/SignUpModal';
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
