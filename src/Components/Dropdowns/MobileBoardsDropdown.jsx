import { useEffect, useRef, useState } from 'react'
import { ReactComponent as ChevronDownIcon } from "/src/assets/icons/icon-chevron-down.svg"

import './MobileBoardsDropdown.css'

export default function MobileBoardsDropdown({ children, setModalOpen, boards, currentBoardId, setCurrentBoardId }) {

    const [showDropdown, setShowDropdown] = useState(false)

    const [currentBoard, setCurrentBoard] = useState(boards[0])

    let optionsClassName = "boards-dropdown-menu"
    if (showDropdown) {
        optionsClassName += " show"
    } else {
        optionsClassName += " hide"
    }

    function toggleDropdown() {
        // console.log("toggle dropdown")
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
    const dropdownWrapperRef = useRef(null);
    dropdownClickOutside(dropdownWrapperRef);


    useEffect(() => {
        setCurrentBoard(boards.find(board => board.id === currentBoardId) || boards[0])
    }, [currentBoardId])

    const boardsDropdownOptions = boards.map((board, index) => (
        <div className="button boards-dropdown__option" key={index} data-id={board.id} onClick={handleChangeBoard}>{board.name}</div>
    ))

    function handleChangeBoard(event) {
        const value = event.target.dataset.id
        // console.log("value: ", value)
        setCurrentBoardId(value)
        setShowDropdown(false)
    }

    function handleNewBoard() {
        setShowDropdown(false)
        setModalOpen("addBoard")
    }

    return (

        <div className="boards-dropdown--wrapper" ref={dropdownWrapperRef}>

            <button className="button button--select-board" onClick={toggleDropdown}>
                <div className="button__text--select-board">{currentBoard.name}</div>
                <ChevronDownIcon className='button__icon button__icon--chevron-down' />
            </button>
            <div className={optionsClassName}>
                {boardsDropdownOptions}
                <button className="button button--new-board">
                    <div className="button__text--new-board" onClick={handleNewBoard}>+ New Board</div>
                </button>
                {children}
            </div>
        </div>

    )
}
