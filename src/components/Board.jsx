import Square from "./Square.jsx";

function Board(props) {
  const generateRow = (rowNum) => (
    <div className="row">
      {props.currentBoardPassed[rowNum].map((el, idx) => (
        <Square
          updateBoard={() => {
            props.handleClick(rowNum, idx);
          }}
          id={"r" + rowNum + "c" + idx}
          value={props.currentBoardPassed[rowNum][idx]}
        />
      ))}
    </div>
  );

  return <div className="board">{props.currentBoardPassed.map((el, idx) => generateRow(idx))}</div>;
}

export default Board;
