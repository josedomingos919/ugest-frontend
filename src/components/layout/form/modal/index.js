import React from 'react'

const Modal = ({children, className = '' , ...props}) =>{
  return(
    <div
        className="popup"
        style={
          props.display === true && false === !props.display
            ? { opacity: 1, visibility: 'visible' }
            : { opacity: 0, visibility: 'hidden' }
        }
      >
        <div
          onClick={()=>props.onClose()}
          className="contentStyle"
        >
          <div
            className={props.transparent ? className :  "popup_content " +className}
            onClick={(e) => {
              e.stopPropagation();
            }}
            style={
              props.display === true
                ? { opacity: 1, transform: 'scale(1)'}
                : { opacity: 0, transform: 'scale(.25)' }
            }
          >
            {children}
          </div>
        </div>
      </div>
  )
}
export default Modal
