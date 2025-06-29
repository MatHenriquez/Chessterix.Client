import React from 'react';
import './styles/landing.css';
import Message from './components/Message';
import GuestLink from './components/GuestLink';
import FloatingBubbles from './components/FloatingBubbles';
import AuthButtonGroup from './components/AuthButtonGroup';
import AuthModalGroup from './components/AuthModalGroup';

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
    <AuthModalGroup
      showLoginModal={showLoginModal}
      setShowLoginModal={setShowLoginModal}
      showSignUpModal={showSignUpModal}
      setShowSignUpModal={setShowSignUpModal}
    />

    <section
      className="
        landing-wrapper
        h-screen w-screen overflow-hidden
        flex flex-col items-center justify-center
        relative
      "
      data-cy="landing-container"
    >
      <FloatingBubbles />

      <div
        className="
          flex flex-col items-center justify-center
          w-full md:w-1/4 max-w-2xl mx-auto
          text-center
          backdrop-blur-md
          bg-gradient-to-br from-wood-800/50 via-wood-700/20 to-wood-800/30
          rounded-2xl
          shadow-2xl shadow-black/50
          border border-gold-700/20
          p-8
          md:space-y-8
          space-y-2
          animate-fade-in
          mb-8
          md:mb-0
        "
        data-cy="landing-content"
      >
        <Message />

        <AuthButtonGroup
          showLoginModal={showLoginModal}
          setShowLoginModal={setShowLoginModal}
          showSignUpModal={showSignUpModal}
          setShowSignUpModal={setShowSignUpModal}
        />

        <GuestLink />
      </div>
    </section>
  </>
);

export default Landing;
