import React, { useEffect } from "react";
import styled from "styled-components";


const Item=({key, id, index, name, cost, value, purchasedItems, handleClick})=>{
    // const ref = React.useRef(null);

    // useEffect(() => {
    //     if (index === 0) {
    //     ref.current.focus();
    //     }
    // }, []);
    return (
        <>
            <Wrapper>
                <Items 
                onClick={handleClick}
                index={index}
                >
                    <Name>{name}</Name>
                    <Description>
                        Cost: {cost} cookie(s). Produces {value} cookies/second
                    </Description>
                </Items>
                <Purchased>
                    {purchasedItems}
                </Purchased>
            </Wrapper>
        </>
    )
}
const Wrapper = styled.div`
    display: flex;
    flex-direction:row;
    border-bottom:2px solid gray;
`;
const Name=styled.p`
    font-size:2em;
    color: white;
`;

const Description=styled.p`
    font-size:1em;
    color:gray;
`;
const Items=styled.button`
    width:350px;
    padding:10px;
    border: none;
    background: transparent;
    cursor: pointer;
    text-align:left;
    outline:none;
    &:active{
        transform:scale(0.95);
    }
`;

const Purchased=styled.div`
    font-size:2em;
    padding:10px;
`;

export default Item;
