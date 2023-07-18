import styles from "./Modal.module.css"

export default function NewBoardModal(props) {

    return (
        <>
        <div className={styles.darkBG} onClick={() => props.setNewBoardModalOpen(false)} />
        <div className={styles.centered}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h5 className={styles.heading}>New Board Modal</h5>
            </div>
            <button className={styles.closeBtn} onClick={() => props.setNewBoardModalOpen(false)}>
              X
            </button>
            <div className={styles.modalContent}>
                <form className="form">
                    <input
                        type="text"
                        placeholder="Board Name"
                        className="form__input"
                        name="boardName"
                    />
                    <button className="form__button" onClick={() => props.setNewBoardModalOpen(false)}>Create New Board</button>
                    <button className="form__button" onClick={() => props.setNewBoardModalOpen(false)}>Cancel</button>

                </form>
            </div>
            {/* <div className={styles.modalActions}>
              <div className={styles.actionsContainer}>
                <button className={styles.deleteBtn} onClick={() => props.setNewBoardModalOpen(false)}>
                  Delete
                </button>
                <button
                  className={styles.cancelBtn}
                  onClick={() => props.setNewBoardModalOpen(false)}
                //   onClick={(e) =>  {e.preventDefault(); props.setNewBoardModalOpen(false)}}
                >
                  Cancel
                </button>
              </div>
            </div> */}
          </div>
        </div>
      </>
    )
}