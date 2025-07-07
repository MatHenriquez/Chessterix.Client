import React from 'react';
import '../../styles/landing.css';
import AuthButtonGroup from '../../../auth/components/common/AuthButtonGroup';
import AuthModalGroup from '../../../auth/components/common/AuthModalGroup';
import FloatingBubbles from './FloatingBubbles';
import GuestLink from './GuestLink';
import Message from './Message';

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
          w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-lg
          mx-auto px-4
          text-center
          backdrop-blur-md
          bg-gradient-to-br from-wood-800/50 via-wood-700/20 to-wood-800/30
          rounded-2xl
          shadow-2xl shadow-black/50
          border border-gold-700/20
          p-6 sm:p-8
          space-y-4 sm:space-y-6 md:space-y-8
          animate-fade-in
          mb-8
          md:mb-0
          min-h-fit
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
