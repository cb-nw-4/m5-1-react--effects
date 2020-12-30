import { useEffect } from 'react';

const useKeydown = (code, callback) => {
  const onKeydown = (event) => {
    if (event.code === code) { 
      callback();
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', onKeydown)

    return () => {
      window.removeEventListener('keydown', onKeydown)
    }
  }, [onKeydown])
}

export default useKeydown;
