import React, { useEffect } from 'react';


const useKeydown = (code, callback) => {
    
    function handleKeydown(ev) {
        if (ev.code === code) {
            //handleCookiesClick()
            callback()
        }
    }
    
    useEffect(() => {
    
        window.addEventListener("keydown", handleKeydown)
        return () => {
            window.removeEventListener("keydown", handleKeydown)
        };
    });

}
 
export default useKeydown;

