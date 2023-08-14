import { ReactComponent as LightModeIcon } from "/src/assets/icons/icon-light-mode.svg"
import { ReactComponent as DarkModeIcon } from "/src/assets/icons/icon-dark-mode.svg"
import './ThemeToggle.css'

export default function ThemeToggle({ darkMode, toggleDarkMode }) {

    let toggleIndicatorClass = "theme-switcher__toggle-indicator"
    if (darkMode) {
      toggleIndicatorClass += " dark-mode"
    } else {
      toggleIndicatorClass += " light-mode"
    }

    return (
        <div className="theme-switcher">
          <LightModeIcon className='theme-switcher__icon theme-switcher__icon--light'/>
          <button className="button theme-switcher__toggle" type="button" role="switch" onClick={toggleDarkMode}></button>
          <span className={toggleIndicatorClass} data-state="checked" onClick={toggleDarkMode}></span>
          <DarkModeIcon className='theme-switcher__icon theme-switcher__icon--dark'/>
        </div>
    )
}
