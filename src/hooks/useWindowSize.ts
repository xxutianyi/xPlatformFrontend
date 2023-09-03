import { useEffect, useState } from 'react';

export default function () {
  const [state, setState] = useState({ width: 0, height: 0 });

  const resizeUpdate = () => {
    const newState = {
      width: document?.documentElement?.clientWidth,
      height: document?.documentElement?.clientHeight,
    };

    setState(newState);
  };

  useEffect(() => {
    resizeUpdate();
    window.addEventListener('resize', resizeUpdate);

    return () => {
      window.removeEventListener('resize', resizeUpdate);
    };
  }, []);

  return state;
}
