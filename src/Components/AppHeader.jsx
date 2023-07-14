import { ReactComponent as PlusIcon } from "/src/assets/icons/icon-plus.svg"
import { ReactComponent as VerticalEllipsisIcon } from "/src/assets/icons/icon-ellipsis-vertical.svg"

export default function AppHeader(props) {

  let headerClassName = "header"
  if (props.darkMode) {
    headerClassName += " dark-mode"
  } else {
    headerClassName += " light-mode"
  }

  return (
    <header className={headerClassName}>
      <div className="header__app-brand"><img className="header__app-logo" /></div>
      <div className="header__nav">
        <h1 className="header__board-title">Board Title</h1>
        <div className="header__button-wrapper">
          <button className="button header-button header-button--new-task">
            <PlusIcon className='header-button__icon header-button__icon--new'/>
            <div className="header-button__text--new-task">Add New Task</div>
          </button>
          <button className="button header-button header-button--edit-board">
            <VerticalEllipsisIcon className='header-button__icon header-button__icon--edit'/>
          </button>
        </div>
      </div>
    </header>
  )
}
