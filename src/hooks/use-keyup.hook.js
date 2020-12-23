import { useEffect } from 'react';

const useKeyup = (code, callback) => {
    useEffect(() => {
        const handleKeyup = (ev) => {
            ev.preventDefault()
            if (ev.code === code) {
                callback();
            }
        }
    
        window.addEventListener('keyup', handleKeyup);
    
        return () => {
            window.removeEventListener('keyup', handleKeyup);
        }
    })
}

export default useKeyup;