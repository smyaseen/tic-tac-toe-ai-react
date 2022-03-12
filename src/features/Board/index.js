import './style.css';
import { useEffect, useState } from 'react';
import GridItem from '../GridItem';

const Board = () => {
  const [moveCount, setMoveCount] = useState(1);
  const [board, setBoard] = useState({});
  const [isGameEnd, setIsGameEnd] = useState(false);
  const [isGameDraw, setIsGamerDraw] = useState(false);
  const [score, setScore] = useState({
    human: 0,
    ai: 0,
  });

  useEffect(() => {
    moveCount > 3 && checkGameEnd();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moveCount]);

  useEffect(() => {
    if (moveCount % 2 === 0 && (!isGameDraw || !isGameEnd)) {
      console.log('CALLED');
      const cellNo = bestSpot();
      console.log(cellNo);
      setBoard(prev => ({ ...prev, [cellNo]: { value: 'X' } }));
      setMoveCount(prev => prev + 1);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board]);

  useEffect(() => {
    if (!isGameDraw && isGameEnd) {
      const player = moveCount % 2 === 0 ? 'human' : 'ai';
      setScore(prev => {
        return { ...prev, [player]: prev[player] + 1 };
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGameEnd]);

  const setMarker = cellNo => {
    if (board[cellNo] || isGameEnd) return;

    moveCount % 2 === 0
      ? setBoard(prev => ({ ...prev, [cellNo]: { value: 'X' } }))
      : setBoard(prev => ({ ...prev, [cellNo]: { value: 'O' } }));
    setMoveCount(prev => prev + 1);
  };

  const renderGridItems = () => {
    const items = [];

    for (let i = 1; i < 10; i++) {
      items.push(<GridItem board={board} cellNo={i} key={i} setMarker={setMarker} />);
    }

    return items;
  };

  const checkGameEnd = () => {
    if (
      board[1] &&
      board[2] &&
      board[3] &&
      board[1]?.value === board[2]?.value &&
      board[1]?.value === board[3]?.value
    ) {
      setBoard(prev => ({ ...prev, [1]: { ...board[1], winMark: 'hl' } }));
      setBoard(prev => ({ ...prev, [2]: { ...board[2], winMark: 'hl' } }));
      setBoard(prev => ({ ...prev, [3]: { ...board[3], winMark: 'hl' } }));
      setIsGameEnd(true);
    } else if (
      board[4] &&
      board[5] &&
      board[6] &&
      board[4]?.value === board[5]?.value &&
      board[4]?.value === board[6]?.value
    ) {
      setBoard(prev => ({ ...prev, [4]: { ...board[4], winMark: 'hl' } }));
      setBoard(prev => ({ ...prev, [5]: { ...board[5], winMark: 'hl' } }));
      setBoard(prev => ({ ...prev, [6]: { ...board[6], winMark: 'hl' } }));
      setIsGameEnd(true);
    } else if (
      board[7] &&
      board[8] &&
      board[9] &&
      board[7]?.value === board[8]?.value &&
      board[7]?.value === board[9]?.value
    ) {
      setBoard(prev => ({ ...prev, [7]: { ...board[7], winMark: 'hl' } }));
      setBoard(prev => ({ ...prev, [8]: { ...board[8], winMark: 'hl' } }));
      setBoard(prev => ({ ...prev, [9]: { ...board[9], winMark: 'hl' } }));
      setIsGameEnd(true);
    } else if (
      board[1] &&
      board[4] &&
      board[7] &&
      board[1]?.value === board[4]?.value &&
      board[1]?.value === board[7]?.value
    ) {
      setBoard(prev => ({ ...prev, [1]: { ...board[1], winMark: 'vl' } }));
      setBoard(prev => ({ ...prev, [4]: { ...board[4], winMark: 'vl' } }));
      setBoard(prev => ({ ...prev, [7]: { ...board[7], winMark: 'vl' } }));
      setIsGameEnd(true);
    } else if (
      board[2] &&
      board[5] &&
      board[8] &&
      board[2]?.value === board[5]?.value &&
      board[2]?.value === board[8]?.value
    ) {
      setBoard(prev => ({ ...prev, [2]: { ...board[2], winMark: 'vl' } }));
      setBoard(prev => ({ ...prev, [5]: { ...board[5], winMark: 'vl' } }));
      setBoard(prev => ({ ...prev, [8]: { ...board[8], winMark: 'vl' } }));
      setIsGameEnd(true);
    } else if (
      board[3] &&
      board[6] &&
      board[9] &&
      board[3]?.value === board[6]?.value &&
      board[3]?.value === board[9]?.value
    ) {
      setBoard(prev => ({ ...prev, [3]: { ...board[3], winMark: 'vl' } }));
      setBoard(prev => ({ ...prev, [6]: { ...board[6], winMark: 'vl' } }));
      setBoard(prev => ({ ...prev, [9]: { ...board[9], winMark: 'vl' } }));
      setIsGameEnd(true);
    } else if (
      board[1] &&
      board[5] &&
      board[9] &&
      board[1]?.value === board[5]?.value &&
      board[1]?.value === board[9]?.value
    ) {
      setBoard(prev => ({ ...prev, [1]: { ...board[1], winMark: 'dr' } }));
      setBoard(prev => ({ ...prev, [5]: { ...board[5], winMark: 'dr' } }));
      setBoard(prev => ({ ...prev, [9]: { ...board[9], winMark: 'dr' } }));
      setIsGameEnd(true);
    } else if (
      board[3] &&
      board[5] &&
      board[7] &&
      board[3]?.value === board[5]?.value &&
      board[3]?.value === board[7]?.value
    ) {
      setBoard(prev => ({ ...prev, [3]: { ...board[3], winMark: 'dl' } }));
      setBoard(prev => ({ ...prev, [5]: { ...board[5], winMark: 'dl' } }));
      setBoard(prev => ({ ...prev, [7]: { ...board[7], winMark: 'dl' } }));
      setIsGameEnd(true);
    } else if (moveCount > 9) {
      setIsGamerDraw(true);
      setIsGameEnd(true);
    }
  };

  const terminal = () => {
    if (!isGameDraw && isGameEnd) {
      if (moveCount % 2 === 0) {
        return true;
      }
      return false;
    }

    return isGameDraw;
  };

  const utility = () => {
    if (!isGameDraw && isGameEnd) {
      if (moveCount % 2 === 0) {
        return 1;
      }
      return -1;
    }

    if (isGameDraw) return 0;
  };

  const actions = board => {
    const marker = moveCount % 2 === 0 ? 'X' : 'O';
  };

  function bestSpot() {
    return miniMax({ ...board }, 'X').cellNo;
  }

  const emptyCells = newBoard => {
    const availSpots = [];

    for (let i = 1; i < 10; i++) {
      !newBoard[i] && availSpots.push(i);
    }
    console.log(availSpots, 'availSpots');
    return availSpots;
  };

  const checkWin = (board, player) => {
    let index;

    if (
      board[1] &&
      board[2] &&
      board[3] &&
      board[1]?.value === board[2]?.value &&
      board[1]?.value === board[3]?.value
    ) {
      index = 1;
    } else if (
      board[4] &&
      board[5] &&
      board[6] &&
      board[4]?.value === board[5]?.value &&
      board[4]?.value === board[6]?.value
    ) {
      index = 4;
    } else if (
      board[7] &&
      board[8] &&
      board[9] &&
      board[7]?.value === board[8]?.value &&
      board[7]?.value === board[9]?.value
    ) {
      index = 7;
    } else if (
      board[1] &&
      board[4] &&
      board[7] &&
      board[1]?.value === board[4]?.value &&
      board[1]?.value === board[7]?.value
    ) {
      index = 1;
    } else if (
      board[2] &&
      board[5] &&
      board[8] &&
      board[2]?.value === board[5]?.value &&
      board[2]?.value === board[8]?.value
    ) {
      index = 2;
    } else if (
      board[3] &&
      board[6] &&
      board[9] &&
      board[3]?.value === board[6]?.value &&
      board[3]?.value === board[9]?.value
    ) {
      index = 3;
    } else if (
      board[1] &&
      board[5] &&
      board[9] &&
      board[1]?.value === board[5]?.value &&
      board[1]?.value === board[9]?.value
    ) {
      index = 1;
    } else if (
      board[3] &&
      board[5] &&
      board[7] &&
      board[3]?.value === board[5]?.value &&
      board[3]?.value === board[7]?.value
    ) {
      index = 3;
    }

    if (board[index]?.value === player) return true;

    return false;
  };

  const miniMax = (newBoard, player) => {
    const availSpots = emptyCells(newBoard);

    if (checkWin(newBoard, 'O')) {
      console.log('O');

      return { score: -10 };
    } else if (checkWin(newBoard, 'X')) {
      console.log('AI');

      return { score: 10 };
    } else if (availSpots.length === 0) {
      console.log('DRAW');
      return { score: 0 };
    }

    const moves = [];
    for (let i = 0; i < availSpots.length; i++) {
      const move = {};
      move.cellNo = availSpots[i];
      newBoard[availSpots[i]] = player;

      if (player == 'X') {
        const result = miniMax(newBoard, 'O');
        move.score = result.score;
      } else {
        const result = miniMax(newBoard, 'X');
        move.score = result.score;
      }

      // newBoard[availSpots[i]] = move.cellNo;

      moves.push(move);
    }

    let bestMove;
    if (player === 'X') {
      let bestScore = -10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      let bestScore = 10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }
    console.log(moves, bestMove, 'moves');
    return moves[bestMove];
  };

  const reset = () => {
    setMoveCount(1);
    setBoard({});
    setIsGameEnd(false);
    setIsGamerDraw(false);
  };

  const { human, ai } = score;

  return (
    <div className="main">
      {isGameDraw ? <p>Game Draw</p> : isGameEnd ? <p>Game End</p> : ''}
      {<p>{`Score -> You (O): ${human} | AI (X): ${ai}`}</p>}
      <button onClick={reset}>Reset</button>
      <div className="grid-container">{renderGridItems().map(item => item)}</div>
    </div>
  );
};

export default Board;
