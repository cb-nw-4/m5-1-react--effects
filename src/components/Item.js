import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Item = ({ items, numOwned, handleClick }) => {
  return (
    <Markup>
      {items.map((item) => {
        return (
         
          <ClickedItem
            id={item.id}
            key={item.id}
            value={item.cost}
            onClick={() => handleClick(item)}
          >
               
            <Items key={item.id}>
              <Title>{item.name}</Title>
              <Description>
                Cost: {item.cost} cookie(s). Produces {item.value}{" "}
                cookies/second.
              </Description>
              </Items>
       
                <Total key={item.id}>{numOwned[item.id]}</Total>
            
         
          </ClickedItem>

        );
      })}
    </Markup>
  );
};

const ClickedItem = styled.button`
  color: white;
  display: flex;
  background-color: #222;
  align-items: center;
  border: none;
  justify-content: space-between;
  cursor: pointer;
  height: 100px;
`;

const Markup = styled.div`
  margin-top: 1rem;

`;

const Items = styled.div`
padding:20px;
`;
const Title = styled.h1`
padding:10px;
`;
const Description = styled.p``;

const Total = styled.h2`

margin-top:30px;

`;

export default Item;
