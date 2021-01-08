import { useEffect } from 'react';

const useKeyDown = (keyCode, handleCookieClick, cookieRef) => {
    const handleKeyDown = (ev) => {
        //console.log("eventListener added")
        if (ev.code === keyCode && cookieRef.current.focus() ) {
            handleCookieClick();
        }
      }
      
    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        
        return() => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [handleKeyDown]);
};

export default useKeyDown;