import React, { useState, useEffect } from "react"; 

function useKeydown(code, callback) {
    // const [isKeyPressed, setIsKeyPressed] = useState(false)

    const keyPressHandler = (ev) => {
        if (ev.code === code) {
            // incrementCount();
            callback();
            // setIsKeyPressed(true);
            console.log('Key Pressed');
        }
    }

    useEffect(() => {
        console.log('Key press effect')
        window.addEventListener('keydown', keyPressHandler);
    
        return () => {
            window.removeEventListener('keydown', keyPressHandler);
        }
    }, [keyPressHandler]);

    return { keyPressHandler };
}

export default useKeydown;