import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const Item = ({ id, name, cost, itemValue, numOwned, onClick, firstItem }) => {
    const ref = useRef(null);
    
    useEffect(() => {
        if (firstItem) {
            ref.current.focus();
        }
    })

    return (
        <>
        <Button value={id} onClick={onClick} ref={ref}>
            <ItemContainer>
                <ItemName>{name}</ItemName>
                <ItemBody>Cost: {cost} cookie(s). Produces {itemValue} cookies/second.</ItemBody>
                <Line />
            </ItemContainer>
            <ItemContainer>
                <Counter>{numOwned}</Counter>
            </ItemContainer>
        </Button>
        </>
    )
}

const Button =  styled.button`
    display: flex;
    justify-content: space-between;
    background: transparent;
    border-style: none;
`;

const ItemContainer = styled.div`
    margin: 15px;
`;

const ItemName = styled.h1`
    text-align: left;
    color: white;
`;

const ItemBody = styled.p`
    color: grey;
    font-size: 14px;
    text-align: left;
`;

const Counter = styled.h1`
    color: white;
    font-size: 36px;
`;

const Line = styled.hr`
    position: relative;
    left: 5px;
    width: 385px;
    background-color: white;
`;

// const ItemName = styled.h1`

// `;

export default Item;