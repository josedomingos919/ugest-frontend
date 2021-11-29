import React, { useState } from 'react';

export function Input({ icon, label = '', ...props }) {
  return (
    <div className="input">
      {label && <span>{label}</span>}
        <input {...props} />
      {icon && <i className={icon} />}
    </div>
  );
}
export function TextArea({ value = '', icon, label = '', ...props }) {
  return (
    <div className="input">
      {label && <span>{label}</span>}
      <textarea {...props} />
      {icon && <i className={icon} />}
    </div>
  );
}
export function Button({
  style,
  styleButton,
  children,
  className = '',
  ...props
}) {
  return (
    <div style={style}>
      <button
        style={{ styleButton }}
        className={'btnSystem ' + className}
        {...props}
      >
        {children}
      </button>
    </div>
  );
}
export function Tab({
  data = [
    {
      name: '',
      content: <div></div>,
      icon: '',
    },
  ],
  isStep = false,
  onDone = () => {},
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="tab">
      <div
        style={{
          marginBottom: isStep ? '0' : '1.5rem',
        }}
        className="tabContainerWithStep"
      >
        {data.map(({ name, icon }, index) => {
          return (
            <span
              className={index < activeIndex && isStep ? 'stepPass' : ''}
              onClick={() => setActiveIndex(index)}
              active={index === activeIndex ? 'true' : 'false'}
              key={index}
            >
              {icon && <i className={icon} />}
              {name}
            </span>
          );
        })}
      </div>
      {isStep && (
        <div className="btnNextPrev">
          {activeIndex > 0 && (
            <Button
              style={{
                marginRight: '1rem',
              }}
              onClick={() => {
                if (activeIndex > 0) setActiveIndex(activeIndex - 1);
              }}
            >
              <i className="fa fa-chevron-left" /> Anterior
            </Button>
          )}
          <Button
            onClick={() => {
              if (activeIndex < data.length - 1)
                setActiveIndex(activeIndex + 1);

              if (activeIndex + 1 === data.length) onDone();
            }}
          >
            {activeIndex + 1 !== data.length ? 'Próximo' : 'Finalizar'}{' '}
            <i
              className={
                activeIndex + 1 !== data.length
                  ? 'fa fa-chevron-right'
                  : 'fa fa-save'
              }
            />
          </Button>
        </div>
      )}
      <div>{data[activeIndex] && data[activeIndex].content}</div>
    </div>
  );
}
export function Select({
  icon,
  label,
  data = [
    {
      label: '',
      value: '',
    },
  ],
  ...props
}) {
  return (
    <div className="input">
      {label && <span>{label}</span>}
      <select {...props}>
        <optgroup>
          {data.map(({ label, value }, index) => {
            return (
              <option key={index} value={value}>
                {label}
              </option>
            );
          })}
        </optgroup>
      </select>
      {icon && <i className={icon} />}
    </div>
  );
}
export function InputFile({ onChange, ...props }) {
  return (
    <div className="inputFile">
      <label htmlFor="file">
        <i className="fa fa-upload" />
        <div>Clica ou arraste o seu arquivo aqui</div>
      </label>
      <input
        onChange={onChange}
        id="file"
        {...props}
        type="file"
        hidden={true}
      />
    </div>
  );
}
