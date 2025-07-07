import React from 'react';

const GuestLink = () => (
  <div className="animate-slide-up">
    <a
      href="/game"
      className="text-white underline p-1 w-64 underline-offset-2 font-bold"
      data-cy="guest-link"
    >
      Continue as a guest
    </a>
  </div>
);

export default GuestLink;
