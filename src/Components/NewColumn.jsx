import './Column.css'

// setModalOpen={props.setModalOpen}
export default function NewColumn(props) {
    return (
        <div className="board__column-single--wrapper">
          <div className="board__column-title"> </div>
          <div className="board__column-single board__column-new">
            <button className="button button--new-column" onClick={() => props.setModalOpen("addColumn")}>+ New Column</button>
          </div>
        </div>
    )
}