import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ClickedItem from "./ClickedItem";

const Item = ({ items, cookieCount, setCookieCount, purchasedItems }) => {
  const { cursor, grandma, farm } = purchasedItems;
  const [numOwned, setNumOwned] = useState(0);
  const [categorySelected, setCategorySelected] = useState(false);
  const [isClicked, setIsClicked] = useState([""]);

  const [allCategory, setAllCategory] = useState(purchasedItems);

  console.log(allCategory);

  useEffect(() => {
    if (categorySelected) {
      setNumOwned(numOwned + 1);
      console.log(isClicked);
    }
  }, [isClicked]);

  const fullList = items.map((it) => {
    return (
      <Markup>
        <List>
        
          <ClickedItem
            id={it.id}
            key={it.id}
            value={it.cost}
            purchasedItems={purchasedItems}
            setCookieCount ={setCookieCount}
            cookieCount={cookieCount}
          >
           <Items key={it.id}>
              <Div>
                <Title>{it.name}</Title>
                <Description>
                  Cost: {it.cost} cookie(s). Produces {it.value} cookies/second.
                </Description>
              </Div>
           
            </Items>
            </ClickedItem>
        </List>
      </Markup>
    );
  });
  return fullList;
};

const Markup = styled.div`
  width: 400px;
  display: flex;
  height: 100px;
`;
const Div = styled.div`
  display: flex;
  flex-direction: column;
`;

const List = styled.ul``;
const Items = styled.li`
  display: flex;
  justify-content: flex-end;
  border-bottom: 1px white solid;
`;
const Title = styled.h1``;
const Description = styled.p`
  display: flex;
  flex-direction: column;
`;

export default Item;
