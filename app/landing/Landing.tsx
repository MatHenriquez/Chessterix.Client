import React from 'react';
import SignInModal from '@/sign-in/SignInModal';
import SignUpModal from '@/sign-up/SignUpModal';
import AuthButton from '@/components/AuthButton';
import './landing.css';

type Props = {
  showLoginModal: boolean;
  setShowLoginModal: (value: boolean) => void;
  showSignUpModal: boolean;
  setShowSignUpModal: (value: boolean) => void;
};

const Landing = ({
  showLoginModal,
  setShowLoginModal,
  showSignUpModal,
  setShowSignUpModal
}: Props) => (
  <>
    <div className="modal-container">
      <SignInModal
        showLoginModal={showLoginModal}
        setShowLoginModal={setShowLoginModal}
      />
      <SignUpModal
        showSignUpModal={showSignUpModal}
        setShowSignUpModal={setShowSignUpModal}
      />
    </div>

    <section
      className="
        landing-wrapper
        bg-[url(/image/bg.png)] bg-center bg-cover bg-no-repeat
        h-screen w-screen overflow-hidden
        flex flex-col items-center justify-center bg-kimono-900
      "
      data-cy="landing-container"
    >
      <div
        className="flex flex-col items-center justify-center md:justify-between
      w-full h-[90vh] md:h-[95%] max-w-xl
      text-center mx-auto
      shadow-inner shadow-bone-500/50
      bg-wood-700/60 rounded-md
      p-4
      gap-4"
        data-cy="landing-content"
      >
        <div className="flex items-center justify-center">
          <Message />
        </div>

        <div className="flex flex-col md:flex-row gap-y-4 md:gap-x-6 items-center justify-center md:mt-40">
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
        <div className="mb-12 md:mb-24">
          <GuestLink />
        </div>
      </div>
    </section>
  </>
);

const Message = () => (
  <p
    className="max-w-lg inline-block align-middle py-2 px-12 lg:mb-8 lg:mt-0 text-9xl lg:text-title font-stranger shadow-inner h-fit font-extrabold text-bone-500"
    style={{
      WebkitTextStroke: '0.6px white',
      textShadow: '2px 2px 2px white',
      padding: '10px',
      fontSize: '10rem'
    }}
    data-cy="welcome-message"
  >
    Welcome to{' '}
    <span
      className="text-red-main block mt-4"
      style={{
        WebkitTextStroke: '0.5px red',
        textShadow: '4px 4px 4px white',
        padding: '10px',
        fontSize: '15rem'
      }}
    >
      Chessterix
    </span>
  </p>
);

const GuestLink = () => (
  <a
    href="/board"
    className="text-white underline p-1 w-64 underline-offset-2 font-bold"
    data-cy="guest-link"
  >
    Continue as a guest
  </a>
);

export default Landing;
