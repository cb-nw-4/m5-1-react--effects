import React, { useEffect } from 'react';

const useKeyDown = (code, callback, render) => {

    const handleKeyDown = (ev) => {
        if (ev.code === code) {
            callback();
        }
    }

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);

        return() => {
            window.removeEventListener("keydown", handleKeyDown);
        }
    }, [render])
}

export default useKeyDown;