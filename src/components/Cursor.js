import React, { useState, useEffect } from "react";
import styled from "styled-components";
import cursorSource from "../cursor.png";
const Cursor = ({useMegaClick, megaClick, }) => {
 
 

  return (
  
      <Button  onClick={useMegaClick} megaClick={megaClick}>
        <Title>Mega Cursor</Title>
        <Description>Cost 500 cookies, Gives 5 cookies per click!</Description>
        <CursorImg src={cursorSource} />
      </Button>
    
  );
};

const Wrapper = styled.div`

`;

const Button = styled.button`


margin: 100px;
border:5px solid white;
background-color: #222;
color:white;
text-align:center;
border-radius:100%;
height:200px;
width:200px;
padding:10px;
cursor : url("https://findicons.com/files/icons/2776/android_icons/96/ic_cursor_off.png"), auto;
&:hover {
  cursor : url("https://findicons.com/files/icons/2776/android_icons/96/ic_cursor_off.png"), auto;
}

`;
const Title = styled.h2``;
const CursorImg = styled.img`
 width:50px;
 height:50px;

 
`;
const Description = styled.p``;
export default Cursor;
