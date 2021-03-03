import React from "react";
import styled from "styled-components";

const Item = ({ name, cost, value, numOwned, handleClick, itemNum }) => {
  const firstButton = React.useRef(null);
  React.useEffect(() => {
    if (itemNum === 0) {
      firstButton.current.focus();
    }
  }, []);
  return (
    <Div>
      <Button onClick={handleClick} ref={firstButton}>
        <Container>
          <h2>{name}</h2>
          <p>
            Cost: {cost} cookie(s). Produces {value}{" "}
            {name === "Mega Cursor" ? "cookies/click" : "cookies/second"}.
          </p>{" "}
        </Container>
        <Score>{numOwned}</Score>
      </Button>
    </Div>
  );
};

const Div = styled.div`
  display: flex;
  width: 500px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  margin-right: 100px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 500px;
  height: 100px;
  background: #222;
  border: none;
  border-bottom: 2px solid white;
  color: white;
  font-size: 20px;
  text-align: left;
  margin: 0;
`;
const Container = styled.div``;

const Text = styled.p`
  color: lightgray;
`;

const Score = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 45px;
`;

export default Item;
