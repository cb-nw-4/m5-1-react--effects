import React from "react";
import styled from "styled-components";


const Item = ({name, cost, value, numOwned, handleClick, itemNum }) =>{
    const firstButton = React.useRef(null);
    React.useEffect(() => {
        if (itemNum===0) {
          // stuff
          firstButton.current.focus();
        }
      },[]);

    return (
    <ItemLine onClick={handleClick} ref={firstButton}>
        <div>
        <Name>{name}</Name>
        <p>Cost: {cost} cookie(s). Produces {value} cookies/second.</p>
        </div>
        <Number>{numOwned}</Number>
    </ItemLine>
    );

};

const ItemLine = styled.button`
    display: flex;
    align-items: center;
    border: none;
    border-bottom: 1px solid grey;
    padding-bottom: 20px;
    padding-top: 24px;
    justify-content: space-between;
    color: white;
    background-color: transparent;

`;

const Name = styled.p`
    font-size:22px;
    font-weight: bold;
    text-align: left;
`;

const Number = styled.p`
    width: 70px;
    text-align: center;
    font-size: 32px;
`;

export default Item;
