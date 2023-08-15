import './Column.css'

export default function ColumnNew({setModalOpen}) {
    return (
        <div className="board__column-single--wrapper">
          <div className="board__column-title"> </div>
          <div className="board__column-single board__column-new">
            <button className="button button--new-column" onClick={() => setModalOpen("updateBoard")}>+ New Column</button>
          </div>
        </div>
    )
}