import { useState, useEffect } from 'react';
import './styles.css';

const icons = {
  success: 'fa fa-check',
  warning: 'fa fa-info-circle',
  error: 'fa fa-times',
};

function Alert({ message, show, type = 'warning' }) {
  const [className, setClassName] = useState('');

  function hideAlert() {
    setClassName('alert-hide');
  }

  useEffect(() => {
    if (show) {
      setClassName('alert-show');

      return;
    }

    hideAlert();
  }, [show]);

  useEffect(() => {
    setTimeout(() => {
      hideAlert();
    }, 4000);
  }, []);

  return (
    <>
      {show && (
        <div className={`alert-component show-alert ${className} ${type}`}>
          <span className={`${icons[type]} icon-alert`} />
          <span className="alert-message">{message}</span>
          <div className="close-btn-alert" onClick={() => hideAlert()}>
            <span>x</span>
          </div>
        </div>
      )}
    </>
  );
}

export default Alert;
