import React, { useRef, useEffect, ReactNode } from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: ReactNode;
  children: ReactNode;
  dataCy?: string;
};

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  dataCy = 'modal'
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const timeoutId = setTimeout(() => {
      document.addEventListener('mousedown', handleOutsideClick);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />

      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div
          ref={modalRef}
          className="relative w-full max-w-md bg-white/80 backdrop-blur-md rounded-xl shadow-xl overflow-hidden"
          data-cy={dataCy}
        >
          <button
            className="absolute top-4 right-4 text-kimono-950 hover:text-gray-900"
            onClick={onClose}
            data-cy={`close-${dataCy}`}
          >
            ✕
          </button>

          <div className="p-8">
            <h2 className="text-3xl font-semibold mb-4 text-center text-kimono-900">
              {title}
            </h2>

            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
