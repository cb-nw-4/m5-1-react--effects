import { useEffect, useCallback } from "react";


const useKeyDown = (code, callback) => {
  const spacebar = useCallback((ev) => {
    if (ev.code === code) {
      callback()
    }
  }, [code, callback])

  useEffect(() => {
    window.addEventListener('keydown', spacebar)
  
    return () => {
      window.removeEventListener('keydown', spacebar)
    }
  }, [spacebar])  
}

  export default useKeyDown;