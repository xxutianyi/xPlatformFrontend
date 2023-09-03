import useWindowSize from '@/hooks/useWindowSize';
import { useEffect, useState } from 'react';

export default function () {
  const { width } = useWindowSize();

  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setMobile(width < 768);
  }, [width]);

  return mobile;
}
