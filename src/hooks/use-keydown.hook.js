import { useEffect } from 'react';

const useKeydown = (code, callback) => {
    useEffect(() => {
        const handleKeydown = (ev) => {
            ev.preventDefault()
            if (ev.code === code) {
                callback();
            }
        }
    
        window.addEventListener('keydown', handleKeydown);
    
        return () => {
            window.removeEventListener('keydown', handleKeydown);
        }
    })
}

export default useKeydown;