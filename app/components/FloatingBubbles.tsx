import React from 'react';

const FloatingBubbles = () => (
  <div className="decorative-elements">
    <div
      className="floating-element w-16 h-16 top-10 left-10"
      style={{ animationDelay: '0s' }}
    ></div>
    <div
      className="floating-element w-8 h-8 top-20 right-20"
      style={{ animationDelay: '2s' }}
    ></div>
    <div
      className="floating-element w-12 h-12 bottom-20 left-20"
      style={{ animationDelay: '4s' }}
    ></div>
    <div
      className="floating-element w-20 h-20 bottom-10 right-10"
      style={{ animationDelay: '1s' }}
    ></div>
  </div>
);

export default FloatingBubbles;
