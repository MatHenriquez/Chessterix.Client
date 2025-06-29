import React from 'react';

const Message = () => (
  <p
    className="text-white font-bold text-center md:mb-4"
    style={{
      fontSize: '3rem'
    }}
    data-cy="welcome-message"
  >
    Welcome to{' '}
    <span
      className="text-red-main block md:mt-4 font-stranger animate-pulse"
      style={{
        WebkitTextStroke: '0.5px red',
        textShadow: '4px 4px 4px white',
        fontSize: '15rem'
      }}
    >
      Chessterix
    </span>
  </p>
);

export default Message;
