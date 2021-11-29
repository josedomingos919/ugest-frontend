import React, { useEffect, useState } from 'react';

function Counter({ min, max, onChange }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(min);
  }, [min]);

  useEffect(() => onChange(count), [onChange, count]);

  return (
    <span className="counterContainer">
      <button
        onClick={() => {
          if (count > min) setCount(count - 1);
        }}
      >
        <i className="fa fa-minus" />
      </button>
      <span>{count}</span>
      <button
        onClick={() => {
          if (count < max) setCount(count + 1);
        }}
      >
        <i className="fa fa-plus" />
      </button>
    </span>
  );
}

export default Counter;
