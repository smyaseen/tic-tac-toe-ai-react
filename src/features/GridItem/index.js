import './style.css';

const GridItem = ({ cellNo, setMarker, board }) => {
  const value = board[cellNo]?.value;
  const winMark = board[cellNo]?.winMark;

  return (
    <div className={`grid-item bb br`} onClick={() => setMarker(cellNo)}>
      <div className={`${winMark}`}>{value}</div>
    </div>
  );
};

export default GridItem;
