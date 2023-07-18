import './Column.css'
// import './TaskCard.css'

export default function NewColumn(props) {
    return (
        <div className="board__column-single--wrapper">
          <div className="board__column-title"> </div>
          <div className="board__column-single board__column-new">
            <button className="button button--new-column">+ New Column</button>
          </div>
        </div>
    )
}