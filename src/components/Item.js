import React, { useEffect, useRef }  from "react";
import styled from "styled-components";

const Item = ({ id, name, cost, value, click, numOwned, handleClick, firstItem }) => {
    const ref = useRef(null);

    useEffect(() => {
        if (firstItem) {
            ref.current.focus();
        }
    })

    if (click === 0) {
        return (
        <Button onClick={handleClick} id={id} ref={ref}>
            <div>
                <Name>{name}</Name>
                <Description>Cost: {cost} cookie(s). Produces: {value} cookies/second.</Description>
            </div>
            <Number>{numOwned}</Number>
        </Button>
        )
    } else {
        return (
        <Button onClick={handleClick} id={id}>
            <div>
                <Name>{name}</Name>
                <Description>Cost: {cost} cookie(s). Produces: {click} cookies per click.</Description>
            </div>
            <Number>{numOwned}</Number>
        </Button>
        )
    }
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
`;

const Name = styled.h2`
    padding-bottom: 0.5em;
`;

const Description = styled.p`
    padding-bottom: 1em;
    color: gray;
`;

const Number = styled.div`
display: flex;
align-items: center;
font-size: 2em;
`;

export default Item; 