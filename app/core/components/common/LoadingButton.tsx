import React from 'react';

const LoadingButton = ({ dataTestId }: props) => {
  return (
    <button
      type="submit"
      className="block rounded text-xl bg-gray-400 px-12 py-3 lg:text-lg font-medium text-gray-700"
      data-cy={dataTestId}
      disabled={true}
    >
      Loading...
    </button>
  );
};

type props = {
  dataTestId: string;
};

export default LoadingButton;
