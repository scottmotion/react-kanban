import { ReactComponent as CrossIcon } from "/src/assets/icons/icon-cross.svg"
import { ReactComponent as BarSortIcon } from "/src/assets/icons/icon-reorder.svg"

import styles from "../Modal.module.css"

export default function SubtaskInput({subtask, index, handleChangeSubtask}) {
    return (
        <div className={styles.modalFormInputWrapper}>
            <div className={`${styles.sortIconDiv} ${styles.deleteBtnCircle}`}>
                <BarSortIcon className={`${styles.sortIcon}`} />
            </div>
            <label className={styles.modalFormLabel}>
                <input
                    type="text"
                    placeholder="Subtask Name"
                    className={styles.modalFormInput}
                    name="subtaskName"
                    id={index}
                    value={subtask.name}
                    onChange={(e) => handleChangeSubtask(e, index)}
                />
            </label>
            <button className={`${styles.btn} ${styles.deleteBtnCircle}`} onClick={(e) => { handleRemoveSubtask(e, index) }}>
                <CrossIcon className={`${styles.deleteBtnIcon}`} />
            </button>
        </div>

    )
}