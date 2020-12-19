import React from 'react';
import styled from 'styled-components';


const Item = ({id, name, cost, value, numOwned, handleClick}) => {
    return (

        <Button onClick= {handleClick}>
            <Div>
                <h3>{name}</h3>
                <p>Cost: {cost} cookie(s): Produces {value} cookies/second</p>
            </Div>

            <h1>
                {numOwned}
            </h1>
        </Button>
        
        

    );
}

const Button = styled.button`
    display: flex;
    background-color: transparent;
    color: white;
    padding: 10px;
    border: none;
    border-bottom: 1px solid gray;
    justify-content: space-between;

    & h1{
        margin-left: 10px;
        align-self: center;
    }
`
const Div = styled.div`

    align-self: flex-start;

    & h3{
        text-align: start;
        padding: 10px 0;
    }

    & p{
        color: grey;
    }
`
export default Item;