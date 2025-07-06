'use client';

import React, { useState } from 'react';
import Landing from './components/Landing';

export default function Home() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  return (
    <Landing
      showLoginModal={showLoginModal}
      setShowLoginModal={setShowLoginModal}
      showSignUpModal={showSignUpModal}
      setShowSignUpModal={setShowSignUpModal}
    />
  );
}
