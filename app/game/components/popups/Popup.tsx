import React, { ReactNode } from 'react';
import { STATUS } from '@/core/constants/init-game-state';
import '../../styles/popup.css';
import { useAppContext } from '@/core/contexts/Context';
import { closePopup } from '@/core/reducer/actions/popup';

interface PopupProps {
  children: ReactNode;
}

interface PopupChildProps {
  onClosePopup?: () => void;
}

const Popup = ({ children }: PopupProps) => {
  const { state, dispatch } = useAppContext();

  const onClosePopup = () => {
    dispatch(closePopup());
  };

  if (state.status == STATUS.ONGOING) {
    return null;
  }

  return (
    <>
      <button
        aria-label="Close popup"
        style={{
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          zIndex: 9998,
          cursor: 'pointer',
          border: 'none',
          padding: 0,
          margin: 0,
          outline: 'none'
        }}
        onClick={onClosePopup}
        tabIndex={0}
      />

      <div
        className="popup"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: '20px',
          borderRadius: '10px',
          zIndex: 9999,
          display: 'block'
        }}
      >
        {React.Children.toArray(children)
          .filter(React.isValidElement)
          .map((child) =>
            React.cloneElement(child as React.ReactElement<PopupChildProps>, {
              onClosePopup
            })
          )}
      </div>
    </>
  );
};

export default Popup;