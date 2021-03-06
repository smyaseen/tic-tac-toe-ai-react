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
    if (!isGameDraw && isGameEnd) {
      const player = moveCount % 2 === 0 ? 'human' : 'ai';
      setScore(prev => {
        return { ...prev, [player]: prev[player] + 1 };
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGameEnd]);

  useEffect(() => {
    if (moveCount % 2 === 0 && (!isGameDraw || !isGameEnd)) {
      const { cellNo } = minimax({ ...board }, moveCount, false, 0);
      // setBoard(prev => ({ ...prev, [cellNo]: { value: 'X' } }));
      setMarker(cellNo);
      // setMoveCount(prev => prev + 1);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board]);

  const renderGridItems = () => {
    const items = [];

    for (let i = 1; i < 10; i++) {
      items.push(<GridItem board={board} cellNo={i} key={i} setMarker={setMarker} />);
    }

    return items;
  };

  const setMarker = cellNo => {
    if (board[cellNo] || isGameEnd) return;

    moveCount % 2 === 0
      ? setBoard(prev => ({ ...prev, [cellNo]: { value: 'X' } }))
      : setBoard(prev => ({ ...prev, [cellNo]: { value: 'O' } }));
    setMoveCount(prev => prev + 1);
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

  const utility = board => {
    const player = moveCount % 2 === 0 ? 'ai' : 'human';
    let isGameWon = false;

    if (
      board[1] &&
      board[2] &&
      board[3] &&
      board[1]?.value === board[2]?.value &&
      board[1]?.value === board[3]?.value
    ) {
      isGameWon = true;
    } else if (
      board[4] &&
      board[5] &&
      board[6] &&
      board[4]?.value === board[5]?.value &&
      board[4]?.value === board[6]?.value
    ) {
      isGameWon = true;
    } else if (
      board[7] &&
      board[8] &&
      board[9] &&
      board[7]?.value === board[8]?.value &&
      board[7]?.value === board[9]?.value
    ) {
      isGameWon = true;
    } else if (
      board[1] &&
      board[4] &&
      board[7] &&
      board[1]?.value === board[4]?.value &&
      board[1]?.value === board[7]?.value
    ) {
      isGameWon = true;
    } else if (
      board[2] &&
      board[5] &&
      board[8] &&
      board[2]?.value === board[5]?.value &&
      board[2]?.value === board[8]?.value
    ) {
      isGameWon = true;
    } else if (
      board[3] &&
      board[6] &&
      board[9] &&
      board[3]?.value === board[6]?.value &&
      board[3]?.value === board[9]?.value
    ) {
      isGameWon = true;
    } else if (
      board[1] &&
      board[5] &&
      board[9] &&
      board[1]?.value === board[5]?.value &&
      board[1]?.value === board[9]?.value
    ) {
      isGameWon = true;
    } else if (
      board[3] &&
      board[5] &&
      board[7] &&
      board[3]?.value === board[5]?.value &&
      board[3]?.value === board[7]?.value
    ) {
      isGameWon = true;
    }

    if (isGameWon) {
      if (player === 'ai') return 1;
      return -1;
    }
    return 0;
  };

  const terminal = (board, moveCount) => {
    const state = utility(board);

    if (state === 0) {
      if (moveCount === 9) return { state, condition: true };
      return { state, condition: false };
    }

    return { state, condition: true };
  };

  const result = (board, position) => {
    const playerMark = moveCount % 2 === 0 ? 'X' : 'O';

    board[position] = { value: playerMark };

    return board;
  };

  const actions = newBoard => {
    const availSpots = [];

    for (let i = 1; i < 10; i++) {
      !newBoard[i] && availSpots.push(i);
    }

    return availSpots;
  };

  const minimax = (state, moveCount, isMaximizing, depth) => {
    const { state: terminalState, condition } = terminal(state, moveCount);

    if (condition) {
      return { score: terminalState };
    }

    const scores = [];
    if (isMaximizing) {
      let v = -Infinity;

      for (const action of actions(state)) {
        const { score } = minimax(result(state, action), moveCount + 1, false, 1 - depth);
        v = Math.max(score, v);
        console.log(v, 'v max', depth, moveCount);

        scores.push({ score: v - depth + moveCount, cellNo: action });
      }
    } else {
      let v = Infinity;

      for (const action of actions(state)) {
        const { score } = minimax(result(state, action), moveCount + 1, true, 1 + depth);

        v = Math.min(score, v);
        console.log(v, 'v min', depth, moveCount);
        scores.push({ score: v + depth - moveCount, cellNo: action });
      }
    }

    let bestMove;

    const player = moveCount % 2 === 0 ? 'X' : 'O';

    if (player === 'X') {
      let bestScore = -10000;
      for (let i = 0; i < scores.length; i++) {
        if (scores[i].score > bestScore) {
          bestScore = scores[i].score;
          bestMove = i;
        }
      }

      console.log(scores, 'scores');
    } else {
      let bestScore = 10000;
      for (let i = 0; i < scores.length; i++) {
        if (scores[i].score < bestScore) {
          bestScore = scores[i].score;
          bestMove = i;
        }
      }
    }

    return scores[bestMove];
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
