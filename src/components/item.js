import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Item = ({ name, cost, value, numOwned, handleClick }) => {
  const itemRef = React.useRef();

  useEffect(() => {
    if (name === `Cursor`) {
      itemRef.current.focus();
    }
  }, []);

  return (
    <>
      <ParentWrapper ref={itemRef} onClick={() => handleClick(name)} key={name}>
        <ItemTextWrapper>
          <ItemTitle>{name}</ItemTitle>
          <ItemText>
            Cost: {cost} Cookie(s). Produces {value} cookie(s)/second.
          </ItemText>
        </ItemTextWrapper>
        <ItemValueWrapper>
          <ItemNumOwned>{numOwned}</ItemNumOwned>
        </ItemValueWrapper>
      </ParentWrapper>
    </>
  );
};

const ParentWrapper = styled.button`
  display: flex;
`;

const ItemValueWrapper = styled.div`
  text-align: center;
  width: 75px;
`;

const ItemTextWrapper = styled.div`
  width: 430px;
`;

const ItemTitle = styled.h3`
  font-size: 24px;
`;

const ItemText = styled.h3`
  padding-top: 10px;
  padding-bottom: 10px;
  font-weight: normal;
`;

const ItemNumOwned = styled.h3`
  align-self: center;
  font-size: 36px;
  padding: 10px;
`;

export default Item;
