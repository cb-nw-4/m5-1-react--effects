import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';


const Item = ({ id, name, cost, value, numOwned, handleClick, focusOnMount })=>{  
    const ref = useRef(null);

    useEffect(() => {
       if (focusOnMount){
         ref.current.focus();
       }
      }, [focusOnMount]);

    return(
        <Link href="#" onClick={(ev)=> handleClick(ev, id, cost)} ref={ref} >
            <div>
                <h1>{name}</h1>
                <Text>{`Cost: ${cost} cookie(s). Produces ${value} cookies/second.`}</Text>        
            </div>
            <Number>{numOwned}</Number>
        </Link>
    );
};


const Link = styled.a`
    text-decoration: none;
    color: white;
    padding: 15px 0;    
    border-bottom: solid 2px grey;
    display: flex;
    justify-content: space-between;
`;

const Text = styled.p`
    color: lightgray;    
`;

const Number = styled.div`
    margin-left: 10px;
    font-size: 24px;
    margin: auto 15px;
`;

export default Item;