import "./Board.css";

interface Props {
  value: string | null;
  i: number;
  onClick: (i: number) => void;
}

const Square = ({ value, i, onClick }: Props) => {

  return (
    <button className="square" onClick={() => onClick(i)}>
      {value}
    </button>
  )
}

export default Square