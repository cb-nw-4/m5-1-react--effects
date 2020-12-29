import React from "react";
import styled from "styled-components";

const Item = ({ name, cost, value, numOwned, handleClick, itemIndex }) => {
    
    console.log(itemIndex);
    //use Ref and inside of it, use and if statement with the itemIndex to get first one  [0]
    return (
    <Button onClick={handleClick}> 
        <div>
            <Name>{name}</Name>
            <Description>Cost: {cost} cookie(s). Produces: {value} cookies/second.</Description>
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