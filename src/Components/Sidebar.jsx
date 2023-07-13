export default function Sidebar(props) {

  let className = 'section sidebar'
  if (props.sidebarVisible) {
    className += ' animate-sidebarOpen'
  } else {
    className += ' animate-sidebarClose'
  }

  return (
    <nav className={className}>
      <div className="sidebar__heading">All Boards</div>
      <button className="button hide-sidebar" onClick={props.hideSidebar}>Hide Sidebar</button>
    </nav>
  )
}
