import { useState, useEffect } from "react"; 

export default function useKeydown(code, callback) {
    const keyPressHandler = (ev) => {

        if (ev.code === code) {
            callback();
            console.log('Key Pressed:', code);
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', keyPressHandler);
    
        return () => {
            window.removeEventListener('keydown', keyPressHandler);
        }
    }, [keyPressHandler]);

    return { keyPressHandler };
}
