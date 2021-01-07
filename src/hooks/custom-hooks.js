import { useState, useEffect } from "react"; 

function useKeydown(code, callback) {
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

function useDocumentTitle(title, fallbackTitle) {
    useEffect(() => {
        document.title = `${Object.values(title)} cookies - Cookie Clicker`;
    }, [title]);
    return () => {
        document.title = `${fallbackTitle}`;
    }
}

export {useKeydown, useDocumentTitle};
