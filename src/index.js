import React, { Fragment, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

function Square(props) {
  return (
    <button
      className={`square  ${props.value ? "sel" : ""}`}
      onClick={props.onClick}
    >
      {props.item}
      {props.value}
    </button>
  );
}

function Topmessage(props) {
  let fellowName = useRef();

  function submitHandler(event) {
    event.preventDefault();
    props.setFellowName(fellowName.current.value);
    props.setItems(randomItems(fellowName.current.value));
  }
  return (
    <div className="topmessage">
      <div>
        Welcome to a fiery game about truth and collegial honor. Name yourself,
        fellow!
      </div>
      {fellowName.current === undefined && (
        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Your Name here..."
            required
            ref={fellowName}
          />
          <input type="submit" value="Done" />
        </form>
      )}
    </div>
  );
}

function RetryGame(props) {
  const [counter, setCounter] = useState(0);
  const magicPositions = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const [magicPosition, setMagicPosition] = useState(0);
  const messages = [
    "Congratulations, you are awesome and a winner...",
    "...because you know Alexander Gellert. Just think about having Alex as a colleague.",
    "Nice try. He is smart, isn't he? And viewed from a computational side, so good looking!",
    "Ok, let's be honest, he is not the best graphics designer, even if he thinks so. But at my opinion he is one of the world's best devs ever.",
    "Last time, I swear! I think, Alex will perfectly fit your company. Just my tought's!",
  ];

  function simplyCount(currentCounter, currentPos) {
    if (currentCounter < 4) {
      setCounter(counter + 1);
      let newPosition;
      console.log(newPosition);
      while (newPosition === undefined || newPosition === currentPos) {
        newPosition =
          magicPositions[(magicPositions.length * Math.random()) | 0];
      }
      setMagicPosition(newPosition);
    } else {
      props.resetBoard();
    }
  }
  return (
    <div className="retry-game">
      <div>{messages[counter]}</div>
      <div className={`button-container pos${magicPosition}`}>
        <button onClick={() => simplyCount(counter, magicPosition)}>Retry</button>
      </div>
    </div>
  );
}

function Board(props) {
  const [squares, setSquares] = useState(() => {
    let tempArray = Array(25).fill(false);
    tempArray[12] = true;
    return tempArray;
  });
  const [items, setItems] = useState();
  const [fellowName, setFellowName] = useState(null);

  function handleClick(i) {
    if (!checkWinningConditions(squares)) {
      const tempSquares = squares.slice();
      tempSquares[i] = true;
      setSquares(tempSquares);
    } else {
    }
  }
  function renderSquare(i) {
    return (
      <Square
        key={i}
        item={items[i]}
        value={squares[i]}
        onClick={() => handleClick(i)}
      />
    );
  }
  function resetBoard() {
    setSquares(() => {
      let tempArray = Array(25).fill(false);
      tempArray[12] = true;
      return tempArray;
    });
    setItems(randomItems(fellowName));
  }

  return (
    <Fragment>
      {fellowName === null ? (
        <Topmessage
          type={"initial"}
          value={"Message"}
          setFellowName={setFellowName}
          setItems={setItems}
        />
      ) : (
        <Fragment>
          {checkWinningConditions(squares) ? (
            <RetryGame resetBoard={resetBoard} />
          ) : (
            <div className="game-grid">
              {Array(25)
                .fill(0)
                .map((something, index) => {
                  return renderSquare(index);
                })}
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}

function Game() {
  return (
    <div className="game">
      <Board />
    </div>
  );
}

function randomItems(name) {
  const baseItems = [
    "(child noises in the hackground)",
    "Hello, hello?",
    "I need to jump in another call.",
    "Can everyone go on mute.",
    "Could you get please closer to the mic.",
    "(load painful echo / feedback)",
    "Next slide please.",
    "Can we take this offline?",
    `Is ___ on the call?`,
    "Could you share this slides afterwards?",
    "Can somebody grant presenter rights?",
    "Can you email that to everyone?",
    "Sorry, i had problems logging in.",
    "(animal noises in the background)",
    "Sorry i didn´t found the conference id.",
    "I was having connection issues.",
    "I´ll have to get back to you.",
    "Who just joined?",
    "Sorry something ___ with my calendar.",
    "Do you see my screen.",
    "Lets wait for ___!",
    "You will send the minutes?",
    "Sorry, i was on mute.",
    "Can you repeat, please?",
  ];

  let randomizedItems = baseItems.sort(() => Math.random() - 0.5);

  randomizedItems.splice(
    12,
    0,
    `${name}'s ultra personalized Conference Call Bingo`
  );

  return randomizedItems;
}

function checkWinningConditions(squares) {
  const lines = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    [0, 6, 12, 18, 24],
    [4, 8, 12, 16, 20],
    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],
  ];
  for (let i = 0; i < lines.length; i++) {
    if (
      squares[lines[i][0]] &&
      squares[lines[i][1]] &&
      squares[lines[i][2]] &&
      squares[lines[i][3]] &&
      squares[lines[i][4]]
    ) {
      return true;
    }
  }
  return false;
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
