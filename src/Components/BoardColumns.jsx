export default function BoardColumns(props) {

  let className = 'board__column-section'

  return (
    <>
      <section className={className}>
        <div className="board__column-single--wrapper">
          <div className="board__column-title"><span className="board__column-indicator"></span>Board Column 1</div>
          <div className="board__column-single">

            <div className="task-card">
              <div className="task-card__title">Task Card</div>
              <div className="task-card__subtasks">1 of 3 subtasks</div>
            </div>
            <div className="task-card">
              <div className="task-card__title">Task Card</div>
              <div className="task-card__subtasks">1 of 3 subtasks</div>
            </div>
            <div className="task-card">
              <div className="task-card__title">Task Card</div>
              <div className="task-card__subtasks">1 of 3 subtasks</div>
            </div>
            <div className="task-card">
              <div className="task-card__title">Task Card</div>
              <div className="task-card__subtasks">1 of 3 subtasks</div>
            </div>
            <div className="task-card">
              <div className="task-card__title">Task Card</div>
              <div className="task-card__subtasks">1 of 3 subtasks</div>
            </div>
            <div className="task-card">
              <div className="task-card__title">Task Card</div>
              <div className="task-card__subtasks">1 of 3 subtasks</div>
            </div>
            <div className="task-card">
              <div className="task-card__title">Task Card</div>
              <div className="task-card__subtasks">1 of 3 subtasks</div>
            </div>
            <div className="task-card">
              <div className="task-card__title">Task Card</div>
              <div className="task-card__subtasks">1 of 3 subtasks</div>
            </div>
            <div className="task-card">
              <div className="task-card__title">Task Card</div>
              <div className="task-card__subtasks">1 of 3 subtasks</div>
            </div>
            <div className="task-card">
              <div className="task-card__title">Task Card</div>
              <div className="task-card__subtasks">1 of 3 subtasks</div>
            </div>
            <div className="task-card">
              <div className="task-card__title">Task Card</div>
              <div className="task-card__subtasks">1 of 3 subtasks</div>
            </div>
            <div className="task-card">
              <div className="task-card__title">Task Card</div>
              <div className="task-card__subtasks">1 of 3 subtasks</div>
            </div>
            <div className="task-card">
              <div className="task-card__title">Task Card</div>
              <div className="task-card__subtasks">1 of 3 subtasks</div>
            </div>
            <div className="task-card">
              <div className="task-card__title">Task Card</div>
              <div className="task-card__subtasks">1 of 3 subtasks</div>
            </div>

          </div>
        </div>

        <div className="board__column-single--wrapper">
        <div className="board__column-title"><span className="board__column-indicator"></span>Board Column 2</div>
          <div className="board__column-single">

            <div className="task-card">
              <div className="task-card__title">Task Card</div>
              <div className="task-card__subtasks">1 of 3 subtasks</div>
            </div>
            <div className="task-card">
              <div className="task-card__title">Task Card</div>
              <div className="task-card__subtasks">1 of 3 subtasks</div>
            </div>
            <div className="task-card">
              <div className="task-card__title">Task Card</div>
              <div className="task-card__subtasks">1 of 3 subtasks</div>
            </div>
            <div className="task-card">
              <div className="task-card__title">Task Card</div>
              <div className="task-card__subtasks">1 of 3 subtasks</div>
            </div>
            <div className="task-card">
              <div className="task-card__title">Task Card</div>
              <div className="task-card__subtasks">1 of 3 subtasks</div>
            </div>
            <div className="task-card">
              <div className="task-card__title">Task Card</div>
              <div className="task-card__subtasks">1 of 3 subtasks</div>
            </div>

          </div>
        </div>

        <div className="board__column-single--wrapper">
        <div className="board__column-title"><span className="board__column-indicator"></span>Board Column 3</div>
          <div className="board__column-single">

            <div className="task-card">
              <div className="task-card__title">Task Card</div>
              <div className="task-card__subtasks">1 of 3 subtasks</div>
            </div>
            <div className="task-card">
              <div className="task-card__title">Task Card</div>
              <div className="task-card__subtasks">1 of 3 subtasks</div>
            </div>
            <div className="task-card">
              <div className="task-card__title">Task Card</div>
              <div className="task-card__subtasks">1 of 3 subtasks</div>
            </div>

          </div>
        </div>

        <div className="board__column-single--wrapper">
          <div className="board__column-title"> </div>
          <div className="board__column-single board__column-new">
            <button className="button button--new-column">+ New Column</button>
          </div>
        </div>

      </section>
    </>
  )
}
