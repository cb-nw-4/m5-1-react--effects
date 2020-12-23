import React from "react";
import styled from "styled-components";

const Item =({id, name, cost, value, operationPer, purchasedItems, itemHandleClick, focusOnMount})=> {
    // console.log(purchasedItems, id, purchasedItems[id]);
    const onClick = ()=>{itemHandleClick(id,cost)};
    
    const buttonRef = React.useRef(null);
    React.useEffect(() => {
        if(focusOnMount) {
            buttonRef.current.focus();
        };
    }, [focusOnMount]);

    return(
        <ItemButton onClick={onClick} ref={buttonRef}>
            <SubDiv>
                <Name>{name}</Name>
                <Description>Cost: {cost} cookie(s). Produces value: {value} cookies/{operationPer}.</Description>
            </SubDiv>
            <SubDiv>
                <Count>{purchasedItems[id]}</Count>
            </SubDiv> 
        </ItemButton>
    );
};

const ItemButton = styled.button`
background-color:inherit;
color:white; 
text-align: left;
display:flex;
justify-content: space-between;
border:none;
border-bottom: 1px solid grey; 
padding: 5px;
&:focus {
    outline: none;
};
&:active {
    box-shadow:0px 0px 15px 10px rgba(40,131,255,0.16);
};
`

const SubDiv = styled.div`
margin: 5px;
flex-direction:column;
align-self: center;
`

const Name = styled.h4`
font-size: 32px;
`

const Description = styled.p`
font-size: 24px;
color:grey;
`

const Count = styled.p`
font-size: 52px;
margin-left: 30px;
`

export default Item;