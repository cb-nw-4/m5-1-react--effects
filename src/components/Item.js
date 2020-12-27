import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const Item = ({ name, cost, value, count, id, focusOnMount }) => {

  const itemRef = useRef(null);

  useEffect(() => {
    if (focusOnMount) {
      itemRef.current.focus();
    }
  }, []);


  return (
    <ItemContainer ref={itemRef}>
        <ItemInfo>
          <Name>{name}</Name>
            {id === "MegaCursor"
              ? <ItemDescription>{`Cost: ${cost} cookies(s). Produces 5 cookies/click.`}</ItemDescription>
              : <ItemDescription>{`Cost: ${cost} cookies(s). Produces ${value} cookies/second.`}</ItemDescription>
            }
          </ItemInfo>
          <Count>{count}</Count>
      </ItemContainer>  
  )
}

const ItemContainer = styled.button` 
    display: flex;
    justify-content: space-between;
    width: 500px;
    border: none;
    border-bottom: 1px solid white;
    margin: 15px;
    padding-bottom: 20px;
    background: inherit;
`;

const ItemInfo = styled.div` 
    display: flex;
    flex-direction: column;
`;

const Name = styled.h3`
    color: white;
    font-size: 20px;
    padding-bottom: 5px;
`;

const ItemDescription = styled.p` 
    color: white;
    font-size: 14px;
`;

const Count = styled.p` 
    color: white;
    font-size: 40px;
    margin-right: 10px;
`;

export default Item;
