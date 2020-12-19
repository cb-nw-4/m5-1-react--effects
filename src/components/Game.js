import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Item from './Item'
import useInterval from '../hooks/use-interval.hook'

import cookieSrc from "../cookie.svg";

const items = [
  { id: "cursor", name: "Cursor", cost: 10, value: 1 },
  { id: "grandma", name: "Grandma", cost: 100, value: 10 },
  { id: "farm", name: "Farm", cost: 1000, value: 80 },
];

const Game = () => {
  // TODO: Replace this with React state!
  const [numCookies, setNumCookies] = useState(0)
  const [purchased, setPurchased] = useState({cursor: 0,
    grandma: 0,
    farm: 0,})
  
  useEffect(() => {
    document.title = numCookies + ' cookies - Cookie Clicker'
  }, [numCookies])
  
  const calculateCookiesPerTick = () => {
    const cursor = purchased.cursor * items[0].value
    const grandma = purchased.grandma * items[1].value
    const farm = purchased.farm * items[2].value
    const totalValue = cursor + grandma + farm
    return totalValue    
    }
  
  useInterval(() => {
    const cookieResult = calculateCookiesPerTick()
     setNumCookies(numCookies + cookieResult)
    }, 1000)

  const handleClick = (item) => {
    console.log(item)
    if (numCookies < item.cost) {
      window.alert('you broke')
    } else {
      setPurchased({...purchased, [item.id]: purchased[item.id] + 1  })
      setNumCookies(numCookies - item.cost)
    }
  }

  const handleCookieClick = () => {
    setNumCookies(numCookies + 1)
  }


  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{numCookies} cookies</Total>
          
          <strong>{calculateCookiesPerTick()}</strong> cookies per second
        </Indicator>
        <Button onClick={handleCookieClick}>
          <Cookie src={cookieSrc} />
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        <Item items={items} numOwned={purchased} handleClick={handleClick}></Item>
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
