import { ReactComponent as CrossIcon } from "/src/assets/icons/icon-cross.svg";
import { ReactComponent as BarSortIcon } from "/src/assets/icons/icon-reorder.svg";
import { forwardRef } from "react";
import styles from "../Modal.module.css";

export const SubtaskInput2 = forwardRef(({ ...props }, ref) => {
  return (
    <div
      className={styles.modalFormInputWrapper}
      ref={ref}
      {...props.attributes}
      {...props.listeners}
    >
      <div className={`${styles.sortIconDiv} ${styles.deleteBtnCircle}`}>
        <BarSortIcon className={`${styles.sortIcon}`} />
      </div>
      <label className={styles.modalFormLabel}>
        <input
          type="text"
          placeholder="Subtask Name"
          className={styles.modalFormInput}
          name="subtaskName"
          id={props.index}
          value={props.subtask?.name}
          onChange={(e) => props.handleChangeSubtask(e, props.index)}
        />
      </label>
      <button
        className={`${styles.btn} ${styles.deleteBtnCircle}`}
        onClick={(e) => {
          props.handleRemoveSubtask(e, props.index);
        }}
      >
        <CrossIcon className={`${styles.deleteBtnIcon}`} />
      </button>
    </div>
  );
});

// export default function SubtaskInput2({
//   subtask,
//   index,
//   handleChangeSubtask,
//   handleRemoveSubtask,
// }) {
//   return (
//     <div className={styles.modalFormInputWrapper}>
//       <div className={`${styles.sortIconDiv} ${styles.deleteBtnCircle}`}>
//         <BarSortIcon className={`${styles.sortIcon}`} />
//       </div>
//       <label className={styles.modalFormLabel}>
//         <input
//           type="text"
//           placeholder="Subtask Name"
//           className={styles.modalFormInput}
//           name="subtaskName"
//           id={index}
//           value={subtask.name}
//           onChange={(e) => handleChangeSubtask(e, index)}
//         />
//       </label>
//       <button
//         className={`${styles.btn} ${styles.deleteBtnCircle}`}
//         onClick={(e) => {
//           handleRemoveSubtask(e, index);
//         }}
//       >
//         <CrossIcon className={`${styles.deleteBtnIcon}`} />
//       </button>
//     </div>
//   );
// }
