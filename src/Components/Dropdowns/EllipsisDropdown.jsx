import { ReactComponent as VerticalEllipsisIcon } from "/src/assets/icons/icon-ellipsis-vertical.svg"
import { useState, useRef, useEffect } from "react"

import '../AppHeader/AppHeader.css'

export default function EllipsisDropdown(props) {

    const [showDropdown, setShowDropdown] = useState(false)

    let optionsClassName = "edit-board-menu"
    if (showDropdown) {
      optionsClassName += " show"
    } else {
      optionsClassName += " hide"
    }
    function toggleDropdown() {
      setShowDropdown(!showDropdown)
    }
  
    /**
     * Hook that fires on clicks outside of the passed ref
     */
    function dropdownClickOutside(ref) {
        useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
            setShowDropdown(false)
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
        }, [ref]);
    }
    const ellipsisWrapperRef = useRef(null);
    dropdownClickOutside(ellipsisWrapperRef);

    // button handlers
    function handleClickEdit() {
        if (props.itemType === "board") {
            setShowDropdown(false)
            props.setModalOpen("updateBoard")
        } else if (props.itemType ==="task") {
            setShowDropdown(false)
            props.setModalOpen("updateTask")
            console.log("Update Task: ", props.currentItem.id)
        }
        setShowDropdown(false)
    }

    function handleClickDelete() {
        console.log("Delete Item: ", props.currentItem)
        if (props.currentItem) {
            setShowDropdown(false)
            props.confirmDelete(props.currentItem.id)
        }
    }

    return (
        <div className="edit-board-menu--wrapper" ref={ellipsisWrapperRef}>
            <button className="button header-button header-button--edit-board" onClick={toggleDropdown}>
                <VerticalEllipsisIcon className='header-button__icon header-button__icon--edit'/>
            </button>
            <div className={optionsClassName}>
                <div className="button edit-board-menu--edit" onClick={handleClickEdit}>Edit {props.itemType}</div>
                <div className="button edit-board-menu--delete" onClick={handleClickDelete}>Delete {props.itemType}</div>
            </div>
        </div>
    )
}