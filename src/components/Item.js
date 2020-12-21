import React from "react";
import styled from "styled-components";

const Item = ({ id, name, cost, value, numOwned, handleItemClick }) => {
  return (
    <Button id={id} onClick={handleItemClick}>
      <div>
        <Name>{name}</Name>
        <Detail>Cost: {cost} cookie(s). Produces {value} cookies/second.</Detail>
      </div>
      <Owned>
        {numOwned}
      </Owned>
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border: 0;
  box-shadow: none;
  background: none;
  text-align: left;
  border-bottom: 1px solid gray;
  padding: 20px 20px 20px 0;
  color: white;
  cursor: pointer;
`;

const Name = styled.span`
  font-weight: bold;
  font-size: 1rem;
`;

const Detail = styled.p`
  color: lightgray;
  font-size: 0.8rem;
`;

const Owned = styled.span`
  font-size: 2rem;
  margin-left: 20px;
`;

export default Item;
