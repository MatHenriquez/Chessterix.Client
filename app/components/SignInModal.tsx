import React from 'react';
import SignInForm from './SignInForm';
import Modal from '@/components/Modal';
import { ToastContainer } from 'react-toastify';

type Props = {
  showLoginModal: boolean;
  setShowLoginModal: (value: boolean) => void;
};

const SignInModal = ({ showLoginModal, setShowLoginModal }: Props) => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Modal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        title={
          <>
            Here again?
            <br />
            <span className="text-lg">Mmm... Ok, be my guest</span>
          </>
        }
        dataCy="login-modal"
      >
        <SignInForm />
      </Modal>
    </>
  );
};

export default SignInModal;
