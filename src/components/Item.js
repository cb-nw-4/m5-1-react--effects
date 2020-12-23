import React, { useRef, useEffect } from "react";
import styled from "styled-components";

const Item = ({ firstItem, id, name, cost, value, numOwned, handleItemClick }) => {
  const itemButton = useRef(null);

  useEffect(() => {
    if (firstItem) {
      itemButton.current.focus();
    }
  }, []);
  
  return (
    <Button id={id} onClick={handleItemClick} ref={itemButton}>
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
