import { renameToKebabCase } from '@/core/utils/naming-conventions-converter';
import React, { FC } from 'react';

const AuthButton: FC<props> = ({
  showAuthModal,
  setShowAuthModal,
  text
}: props) => (
  <button
    className="block w-full text-xl rounded lg:text-lg bg-red-main px-12 py-3 font-medium text-white shadow-md hover:bg-kimono-200 focus:outline-none ring-1 ring-white focus:ring-4 active:bg-kimono-700 sm:w-auto shadow-red-50/75"
    data-cy={renameToKebabCase(text + '-button')}
    onClick={() => setShowAuthModal(!showAuthModal)}
  >
    {text}
  </button>
);

type props = {
  showAuthModal: boolean;
  setShowAuthModal: (value: boolean) => void;
  text: string;
};

export default AuthButton;
