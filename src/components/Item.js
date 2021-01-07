import React, { useState, useEffect, useRef} from "react";
import styled from "styled-components";

const Item = ({ id, name, cost, value, numOwned, handleClick, itemIndex }) => {
    const firstIndexRef = useRef(null);
    // console.log(id);

    useEffect(() => {
        if(itemIndex === 0){
            firstIndexRef.current.focus();
        }
    }, [])
    
    return (
    <Button onClick={handleClick} ref={firstIndexRef}>
        <div>
            <Name>{id!=="megaCursor" ? name: name}</Name>
            {/* <Description>Cost: {cost} cookie(s). Produces: {value} cookies/second.</Description> */}
            <Description>{id!=="megaCursor" ? `Cost: ${cost} cookie(s). Produces: ${value} cookies/second.`:`Cost: ${cost} cookie(s). Produce: ${value} cookies/click`}</Description>
        </div>
        <Number>{numOwned}</Number>
    </Button>
    )
};

const Button = styled.button`
    margin-bottom: 10px;
    display: flex;
    justify-content: space-around;
    background: transparent;
    border: 0;
    border-bottom: 1px solid gray;
    color: white;
    text-align: left;
    width: 25vw;
    /* outline: none; //UNCOMMENT WHEN THE numOwned WORKS */
`;
const Name = styled.h2`
    padding-bottom: 5px;
`;
const Description = styled.p`
    color: gray;
    padding-bottom: 10px;
`;
const Number = styled.div`
display: flex;
align-items: center;
font-size: 2.2em;
`;

export default Item;