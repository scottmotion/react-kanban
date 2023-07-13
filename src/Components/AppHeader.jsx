export default function AppHeader() {
    return (
      <header className="header">
        <div className="header__app-brand"><img className="header__app-logo" /></div>
        <div className="header__nav">
          <h1 className="header__board-title">Board Title</h1>
          <button>+ Add New Task</button>
        </div>
      </header>
    )
}
