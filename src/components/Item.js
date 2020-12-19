import React from "react";
import styled from "styled-components";


const Item = ({ name, cost, value, count }) => {
  return (
    <Wrapper>
      <ItemContainer>
          <ItemInfo>
            <Name>{name}</Name>
            <ItemDescription>{`Cost: ${cost} cookies(s). Produces ${value} cookies/second.`}</ItemDescription>
          </ItemInfo>
          <Count>{count}</Count>
      </ItemContainer>  
    </Wrapper>
  )
}

const Wrapper = styled.div` 
    display: flex;
    flex-direction: column;
    width: 500px;
`;

const ItemContainer = styled.div` 
    display: flex;
    justify-content: space-between;
    width: 500px;
    border-bottom: 1px solid white;
    margin: 15px;
    padding-bottom: 15px;
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
