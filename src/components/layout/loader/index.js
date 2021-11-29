import React from 'react';

function Loader({ state, label }) {
  return state ? (
    <div style={{
      margin: '0px !important'
    }} className="loaderContainer">
      <div className="loaderAnimation"></div>
      {label && <div>{label}</div>}
    </div>
  ) : (
    <></>
  );
}

export default Loader;
