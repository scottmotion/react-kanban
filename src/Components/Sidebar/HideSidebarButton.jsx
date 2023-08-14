import { ReactComponent as HideIcon } from "/src/assets/icons/icon-hide.svg"
import './HideSidebarButton.css'

export default function HideSidebarButton({ onClick }) {

    return (
        <button className="button sidebar-button sidebar-button--hide-sidebar" onClick={onClick}>
            <HideIcon className='sidebar-button__icon sidebar-button__icon--hide' />
            Hide Sidebar
        </button>
    )
}
