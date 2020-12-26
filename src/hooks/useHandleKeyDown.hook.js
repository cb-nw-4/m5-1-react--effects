import React from 'react';

const useHandleKeyDown=(key, callback)=>{
    let eventHandler=(event)=>{
        if(event.code===key){
            callback();
        }
    }
    React.useEffect(()=>{
        window.addEventListener('keydown', eventHandler);
        return ()=>{
            window.removeEventListener('keydown', eventHandler);
        }
    });
};

export default useHandleKeyDown;