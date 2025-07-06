import React from 'react';
import { SignUpForm } from './SignUpForm';
import Modal from '@/components/Modal';

type Props = {
  showSignUpModal: boolean;
  setShowSignUpModal: (value: boolean) => void;
};

const SignUpModal = ({ showSignUpModal, setShowSignUpModal }: Props) => {
  return (
      <Modal
        isOpen={showSignUpModal}
        onClose={() => setShowSignUpModal(false)}
        title={
          <>
            Go ahead...
            <br />
            <span className="text-lg">if you dare</span>
          </>
        }
        dataCy="sign-up-modal"
      >
        <SignUpForm />
      </Modal>
  );
};

export default SignUpModal;
