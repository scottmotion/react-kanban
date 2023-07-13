export default function AppHeader() {

  const verticalEllipsis = (
    <svg className='header-button__icon header-button__icon--edit' stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
    </svg>
  )

  return (
    <header className="header">
      <div className="header__app-brand"><img className="header__app-logo" /></div>
      <div className="header__nav">
        <h1 className="header__board-title">Board Title</h1>
        <div className="header__button-wrapper">
          <button className="button header-button header-button--new-task">+ Add New Task</button>
          <button className="button header-button header-button--edit-board">{verticalEllipsis}</button>
        </div>
      </div>
    </header>
  )
}
