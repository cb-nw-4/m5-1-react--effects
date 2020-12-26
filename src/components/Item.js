import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Item = ({ items, cookieCount, setCookieCount, purchasedItems }) => {
  const { cursor, grandma, farm } = purchasedItems;
  const [numOwned, setNumOwned] = useState(0);
  const [categorySelected, setCategorySelected] = useState(false);
  const [cost, setCost] = useState(0);
    const [ isClicked, setIsClicked] = useState([""])
  const [allCategory, setAllCategory] = useState(purchasedItems);
  console.log(allCategory.cursor);

  useEffect(() => {
if(categorySelected) {
  setNumOwned(numOwned + 1)
  console.log(isClicked);
}
    
  }, [isClicked]);

  const handleClick = (event) => {
    console.log(event.currentTarget.id);
    setIsClicked(!isClicked);
    const itemsName = Object.keys(purchasedItems);

    console.log(categorySelected);
    if (cookieCount > 0) {
      setCookieCount(cookieCount - event.currentTarget.value);
    } else {
      return alert("You are out of cookies!");
    }
    const newItemPurchased = itemsName.map((item) => {
      if (event.currentTarget.id === item) {
        setCategorySelected(true);
        setIsClicked(item);
        console.log(isClicked);
      }
    });
    return newItemPurchased;
  };

  const fullList = items.map((it) => {
    return (
      <Markup>
        <List>
          <button id={it.id} key={it.id} value={it.cost} onClick={handleClick}>
            <Items key={it.id}>
              <Div>
                <Title>{it.name}</Title>
                <Description>
                  Cost: {it.cost} cookie(s). Produces {it.value} cookies/second.
                </Description>
              </Div>
              <Total key={it.id}>{numOwned}</Total>
            </Items>
          </button>
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
const ClickedItem = styled.a`
  color: white;
`;
const Total = styled.h2`
  margin-top: 30px;
  display: flex;
  padding-left: 20px;
`;

export default Item;
