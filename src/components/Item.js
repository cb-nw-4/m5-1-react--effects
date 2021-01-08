import React from 'react';
import styled from "styled-components";

const Item = ({ item, purchasedItems, handleClick }) => {

    return (
        <Section onClick={() => handleClick(item)}>
            <Name>
                <h2>{item.name}</h2>
                <p>Cost: {item.cost} cookie(s). Produces: {item.value} cookie(s)/second.</p>
            </Name>
            <div>
                <h1>{purchasedItems[item.id]}</h1>
            </div>
        </Section>
    )
};

const Section = styled.button`
    display: flex;
    justify-content: space-between;
    color: white;
    text-align: left;
    border-top: none;
    border-left: none;
    border-bottom: 1px lightgray solid;
    margin-top: 15px; 
    background: none;
 
    & p {
        color: lightgray;
    }
`;

const Name = styled.div`
    margin-bottom: 15px;
    margin-right: 25px; 
`;

export default Item;