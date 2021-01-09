import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Item from "./Item";
import useInterval from "../hooks/use-interval.hook";

import cookieSrc from "../cookie.svg";

const useDocumentTitle = () => {
  const [numCookies, setNumCookies] = useState(0);
  const [title, setTitle] = useState("idle");
  const [fallbackTitle, setFallbackTitle] = useState("idle");
  useEffect(() => {
    setTitle((document.title = `${numCookies} cookies - Cookie Game`));
    return () => {
      setFallbackTitle((document.title = `Cookie Clicker Workshop`));
    };
  }, [numCookies]);

  return { title, fallbackTitle, numCookies, setNumCookies };
};
const useKeydown = () => {
  const { numCookies, setNumCookies } = useDocumentTitle();
  const [code, setCode] = useState();
  const [callback, setCallback] = useState();
  useEffect(() => {
    const handleKeydown = (ev) => {
      if (ev.code === "Space") {
        setNumCookies((numCookies) => numCookies + 1);
      }
    };
    setCode(document.addEventListener("keydown", handleKeydown));
    return () => {
      setCallback(document.removeEventListener("keydown", handleKeydown));
    };
  }, [numCookies]);

  return { code, callback, numCookies, setNumCookies };
};

const items = [
  {
    id: "cursor",
    name: "Cursor",
    cost: 10,
    value: 1,
    type: "tick",
    increase: 0,
  },
  {
    id: "grandma",
    name: "Grandma",
    cost: 100,
    value: 10,
    type: "tick",
    increase: 0,
  },
  {
    id: "farm",
    name: "Farm",
    cost: 1000,
    value: 80,
    type: "tick",
    increase: 0,
  },
  {
    id: "megaCursor",
    name: "megaCursor",
    cost: 1,
    value: 0,
    type: "click",
    increase: 1,
  },
];

const Game = () => {
  const { title, fallbackTitle } = useDocumentTitle();
  const { code, callback, numCookies, setNumCookies } = useKeydown();
  const [purchasedItems, setPurchasedItems] = useState({
    cursor: 0,
    grandma: 0,
    farm: 0,
    megaCursor: 0,
  });

  const calculateCookiesPerTick = (purchasedItems) => {
    return Object.keys(purchasedItems).reduce((acc, itemId) => {
      // where itemId = currentValue(cursor, grandma or farm)
      const numOwned = purchasedItems[itemId];
      // where numOwned = current owned amount for each item
      const item = items.find((item) => item.id === itemId);
      // where item is needed for value (below).
      const value = item.value;
      // where value = value of each item

      return acc + value * numOwned;
      // returns one number (the reduced value) - where for each item the following is calculated: value * numOwned,
      // which is added to the accumulator and a final value is obtained for calculateCookiesPerTick (purchasedItems).
      // This total value is passed to useInterval as numOfGeneratedCookies. This updates every second and adds the amount of
      // calculateCookiesPerTick of purchase items on to the total numCookies. If this is stable at just Cursor having e.g numOwned
      // as 4. Then cursor value = 1, so the use interval updates every second by adding 4*1 cookies to the numCookies total.
    }, 0);
    // here the accumulator begins at 0
  };

  const handleClick = (item) => {
    console.log("handleClick", item);
    if (numCookies < item.cost) {
      alert("costs too much");
    } else if (item.type === "tick") {
      // (3)
      setNumCookies(numCookies - item.cost);
      setPurchasedItems({
        ...purchasedItems,
        [item.id]: purchasedItems[item.id] + 1,
      });
    } else if (item.type === "click") {
      setNumCookies(numCookies - item.cost);
      setPurchasedItems({
        ...purchasedItems,
        [item.id]: purchasedItems[item.id] + 1,
      });
    }
  };

  useInterval(() => {
    const numOfGeneratedCookies = calculateCookiesPerTick(purchasedItems);
    // (1)
    setNumCookies(numCookies + numOfGeneratedCookies);

    // Add this number of cookies to the total
  }, 1000);

  const valueOfMegaCursor = purchasedItems["megaCursor"];

  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          {/* numCookies is the total no of cookies in the bank */}
          <Total>{numCookies} cookies</Total>
          {/* if item = cursor and amount = 1 then 1 cookie is added to {numCookies} every second
              if item = grandma and amount = 1 then 10 cookies are added to {numCookies} every second
              if item = farm and amount = 1 then 80 cookies are added to {numCookies} every second */}
          {/* so overall total {numCookies} = (1)number of cookies per second (as described above) plus (2)numCookies (from clicking 
              on the cookie) - (3)item cost) */}
          {/* cookies per second works as follows: we need to workout numOfGeneratedCookies so can add this no. to numCookies
              and therefore setNumCookies. */}
          {/* as numOfGeneratedCookies = calculateCookiesPerTick(purchasedItems), need to calculate 
              calculateCookiesPerTick(purchasedItems).   */}
          <strong>{calculateCookiesPerTick(purchasedItems)}</strong> cookies per
          second
        </Indicator>
        {/* each time the cookie is clicked the cookie count (numCookies) increases by 1 */}

        {/* (2) */}
        <Button
          onClick={() =>
            purchasedItems["megaCursor"] > 0
              ? setNumCookies(numCookies + valueOfMegaCursor + 1)
              : setNumCookies(numCookies + 1)
          }
        >
          {/* <Button onClick={() => setNumCookies(numCookies + 1)}> */}
          <Cookie src={cookieSrc} />
        </Button>
      </GameArea>

      <ItemArea>
        {/* each time an item (Cursor, Grandma, Farm) is clicked on - if the {numCookies} total is < cost of the item an alert 
        says "costs too much. If the {numCookies} total is > cost of the specific item, then the item increases by 1 (under 
        each item name). This works by:
        {numCookies} = setNumCookies(numCookies - item.cost); 
        purchasedItems by item = setPurchasedItems({
        ...purchasedItems,
        [item.id]: purchasedItems[item.id] + 1,
        where ([item.id]: purchasedItems[item.id] + 1) is equivalent to (grandma: 0 + 1) etc
      });
         */}
        <SectionTitle>Items:</SectionTitle>
        <>
          {items.map((item, index) => (
            <Item
              clicksX={item.clicksX}
              name={item.name}
              cost={item.cost}
              value={item.value}
              numOwned={purchasedItems[item.id]}
              onClick={() => handleClick(item)}
              index={index}
              increase={item.increase === 0 ? 0 : valueOfMegaCursor + 2}
            />
          ))}
        </>
      </ItemArea>
      <HomeLink to="/">Return home</HomeLink>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;
const GameArea = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
`;
const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
`;

const Cookie = styled.img`
  width: 200px;
`;

const ItemArea = styled.div`
  height: 100%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionTitle = styled.h3`
  text-align: center;
  font-size: 32px;
  color: yellow;
`;

const Indicator = styled.div`
  position: absolute;
  width: 250px;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
`;

const Total = styled.h3`
  font-size: 28px;
  color: lime;
`;

const HomeLink = styled(Link)`
  position: absolute;
  top: 15px;
  left: 15px;
  color: #666;
`;

export default Game;
