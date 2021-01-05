import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Item = ({
  items,
  cookieCount,
  setCookieCount,
  purchasedItems,
  handleClick,
  cookieCost,
  setCookieCost,
  setPurchasedItems,
 
  id,
}) => {
  const [numOwned, setNumOwned] = useState(0);
  const [categorySelected, setCategorySelected] = useState([""]);
  const [cost, setCost] = useState(0);
  const [isClicked, setIsClicked] = useState(false);

  const useUpdateCost = () => {
    useEffect(() => {
      if (isClicked) {
        setNumOwned(numOwned + 1);
        let newPurchased = (purchasedItems[id] += 1);
        let updateValues = `${categorySelected}: ${newPurchased}`;
        setCost(updateValues);
      }
      return () => setIsClicked(false);
    }, [isClicked]);

    useEffect(() => {
      const updatedValue = items.find((item) => {
        if (id == item.id && isClicked) {
            let cost = item.cost
          setCookieCost(cost);
          handleClick(item.value);
        }
      });
      return updatedValue;
    }, [categorySelected, isClicked]);
  };
  useUpdateCost();

  const handleChange = (event) => {

    setIsClicked(true);
    setCategorySelected(event.currentTarget.id);

    if (cookieCount > 0) {
      setCookieCount(cookieCount - event.currentTarget.value);
    } else {
      return alert("You are out of cookies!");
    }
  };
  console.log(cookieCost);
  const fullList = items.map((it) => {
    if (it.id === id) {
      return (
        <Markup>
          <List>
            <ClickedItem
              id={it.id}
              key={it.id}
              value={it.cost}
              onClick={handleChange}
            >
              <Items key={it.id}>
                <Div>
                  <Title>{it.name}</Title>
                  <Description>
                    Cost: {it.cost} cookie(s). Produces {it.value}{" "}
                    cookies/second.
                  </Description>
                </Div>
                <Total key={it.id}>{numOwned}</Total>
              </Items>
            </ClickedItem>
          </List>
        </Markup>
      );
    }
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
const ClickedItem = styled.button`
  color: white;
  background-color: #222;
  width: 350px;
  border: none;
`;
const Total = styled.h2`
  margin-top: 30px;
  display: flex;
  padding-left: 20px;
`;

export default Item;
