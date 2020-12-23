import React, { useEffect, useCallback} from 'react'



const useKeyDown = (code, callback) => {

  const onKeyDown = useCallback((ev) => {
    if (ev.code === code) { 
      callback()
    }
  }, [code, callback])


  useEffect(() => {
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [onKeyDown])


}

export default useKeyDown