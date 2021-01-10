import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import cookieSrc from "../cookie.svg";
import Item from "./Item";
import useInterval from "../hooks/use-interval.hook";
import useKeyDown from "../hooks/useKeyDown";
import useDocumentTitle from "../hooks/useDocumentTitle";

const items = [
  { id: "cursor", name: "Cursor", cost: 10, value: 1 },
  { id: "grandma", name: "Grandma", cost: 100, value: 10 },
  { id: "farm", name: "Farm", cost: 1000, value: 80 },
];

const Game = () => {
  // TODO: Replace this with React state!
  const [numCookies, setNumCookies] = useState(100);

  const [purchasedItems, setPurchasedItems] = useState({ cursor: 0, grandma: 0, farm: 0 })

  const ref = useRef(null);

  // useEffect(() => {
  //   document.title = `${numCookies} cookies - Cookie Clicker Game`;
  // }, [numCookies]);

  // useEffect(() => {
  //   window.addEventListener("keydown", handleKeyDown)
    
  //   return () => {
  //     window.removeEventListener("keydown", handleKeyDown
  //     )}

  //   }, [numCookies])

  // const handleKeyDown = (ev) => {
  //   if (ev.code === "Space") {
  //     handleCookieClick();
  //   }
  // }

  const handleCookieClick = (ev) => {
    setNumCookies(numCookies + 1);
  }

  useKeyDown("Space", handleCookieClick, numCookies);

  useDocumentTitle(`${numCookies} cookies - Cookie Clicker Game`, "Cookie Clicker Game", numCookies)


  const handleClick = (itemClicked, count) => {

    items.forEach((item) => {
      if (item.id === itemClicked && numCookies > 0) {
        setPurchasedItems({...purchasedItems, [itemClicked]: count})
        setNumCookies(numCookies - [item.cost]);
        if (numCookies - [item.cost] < 0) {
          setNumCookies(numCookies);
          window.alert("You're too poor for more cookies.")
        }
      }
    })

  }

  const calculateCookiesPerTick = (purchasedItems) => {
    const data = [];
    const itemValues = {}
    items.map((item) => {
      itemValues[item.id]=item.value;
    });

    data.push(itemValues, purchasedItems)
    
    let object = {}

    data.forEach((obj) => {
      Object.keys(obj).forEach((key) => {
        object[key] = (object[key] || 1) * obj[key]
      })
    })

    const sumValues = Object.values(object).reduce((a, b) => {
      return a + b;
    })

    return sumValues;
  }
  
  useInterval(() => {
    const numOfGeneratedCookies = calculateCookiesPerTick(purchasedItems);
  
    setNumCookies(numCookies + numOfGeneratedCookies);

  }, 1000);

  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{numCookies} cookies</Total>
            <strong>{calculateCookiesPerTick(purchasedItems)}</strong> cookies per second
        </Indicator>
        <Button onClick={handleCookieClick}>
          <Cookie src={cookieSrc} />
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        {items.map((item, index) => {
          const purchasedItem = Object.values(purchasedItems)[index];
          return (
          <div>
          <Item item={item} purchasedItem={purchasedItem} handleClick={handleClick}/>
          </div>
            )
        })}
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
