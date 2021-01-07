import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import useInterval from "../hooks/use-interval.hook";

import cookieSrc from "../cookie.svg";
import Item from "./item";
import useKeyDown from "../hooks/useKeyDown";

const items = [
  { id: "cursor", name: "Cursor", cost: 10, value: 1 },
  { id: "grandma", name: "Grandma", cost: 100, value: 10 },
  { id: "farm", name: "Farm", cost: 1000, value: 80 },
];

const Game = () => {
  const [numCookies, setnumCookies] = useState(10000);
  const [purchasedItems, setpurchasedItems] = useState({
    cursor: 0,
    grandma: 0,
    farm: 0,
  });

  const onKeyDown = (ev) => {
    if (ev.code === "Space") {
      handleButtonClick();
    }
  };

  useKeyDown(onKeyDown);

  // useEffect(() => {
  //   window.addEventListener("keydown", onKeyDown);
  //   return () => {
  //     window.removeEventListener("keydown", onKeyDown);
  //   };
  // }, [onKeyDown]);

  useEffect(() => {
    document.title = `Cookies:,${numCookies}`;
    return () => {
      document.title = `Cookie Clicker Workshop`;
    };
  }, [numCookies]);

  const calculateCookiesPerTick = (purchasedItems) => {
    return (
      purchasedItems.cursor * 1 +
      purchasedItems.grandma * 10 +
      purchasedItems.farm * 80
    );
  };

  useInterval(() => {
    const numOfGeneratedCookies = calculateCookiesPerTick(purchasedItems);
    setnumCookies(numCookies + numOfGeneratedCookies);
    // Add this number of cookies to the total
  }, 1000);

  const handleButtonClick = () => {
    setnumCookies(numCookies + 1);
  };

  const handleItemClick = (name) => {
    console.log();
    if (name === "Cursor") {
      if (numCookies >= 10) {
        setnumCookies(numCookies - 10);
        setpurchasedItems({
          cursor: purchasedItems.cursor + 1,
          grandma: purchasedItems.grandma,
          farm: purchasedItems.farm,
        });
      } else window.alert("You can't afford that!");
    } else if (name === "Grandma") {
      if (numCookies >= 100) {
        setnumCookies(numCookies - 100);
        setpurchasedItems({
          cursor: purchasedItems.cursor,
          grandma: purchasedItems.grandma + 1,
          farm: purchasedItems.farm,
        });
      } else window.alert("You can't afford that!");
    } else if (name === "Farm") {
      if (numCookies >= 1000) {
        setnumCookies(numCookies - 1000);
        setpurchasedItems({
          cursor: purchasedItems.cursor,
          grandma: purchasedItems.grandma,
          farm: purchasedItems.farm + 1,
        });
      } else window.alert("You can't afford that!");
    }
  };

  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{numCookies} cookies</Total>
          {/* TODO: Calcuate the cookies per second and show it here: */}
          <strong>{calculateCookiesPerTick(purchasedItems)}</strong> cookies per
          second
        </Indicator>
        <Button onClick={handleButtonClick}>
          <Cookie src={cookieSrc} />
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        {items.map((item, i) => (
          <Item
            key={item.id}
            name={item.name}
            value={item.value}
            cost={item.cost}
            numOwned={Object.values(purchasedItems)[i]}
            handleClick={handleItemClick}
          >
            {" "}
            Item 1{" "}
          </Item>
        ))}
        {/* TODO: Add <Item> instances here, 1 for each item type. */}
      </ItemArea>
      <HomeLink to="/">Return home</HomeLink>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
`;
const GameArea = styled.div`
  //flex: 1;
  display: grid;
  place-items: center;
  align-items: center;
`;
const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
`;

const Cookie = styled.img`
  width: 200px;
  margin: 80px;
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
