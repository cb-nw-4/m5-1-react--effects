import { useEffect, useCallback } from 'react';

function useKeyDown(callback, code) {

      
    const handleKeydown = useCallback((ev) => {  
        if (ev.code === code) {     
            callback();
        }
      }, [code, callback]);     

    useEffect(()=>{   
        console.log("useKeyDown");

        window.addEventListener("keydown", handleKeydown);
    
        return () =>{window.removeEventListener("keydown", handleKeydown)}   
      }, [handleKeydown]);

};

export default useKeyDown