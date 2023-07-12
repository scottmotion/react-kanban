import '../App.css'

export default function Sidebar(props) {

  let className = 'section sidebar'
  if (props.sidebarVisible) {
    className += ' animate-sidebarOpen'
  } else {
    console.log("Sidebar Hidden")
    className += ' animate-sidebarClose'
  }

  return (
    <section className={className}>
      <div>Sidebar</div>
      <button className="button hide-sidebar" onClick={props.hideSidebar}>Hide Sidebar</button>
    </section>
  )
}
