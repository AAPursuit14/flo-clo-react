import { useState } from 'react'
import { categories } from '../data'
import useDragToClose from '../hooks/useDragToClose'

export default function EditCategories({ className, hiddenCats, onToggleCat, onClose }) {
  const [suggested, setSuggested] = useState(true)
  const drag = useDragToClose(onClose)

  return (
    <div className={`editcats ${className}`} style={drag.dragStyle}>
      <div className="grabzone" {...drag.grabProps}>
        <div className="handle"></div>
      </div>
      <div className="echead">
        <span className="arrow" onClick={onClose}>‹</span>
        <h2>Edit categories</h2>
        <span></span>
      </div>
      <div className="ecbody" data-scrollable="">
        <div className="ecdesc">
          Add, remove and rearrange categories yourself, or let your app
          personalize things based on your cycle phases and logged symptoms.
        </div>
        <div className="ecsug">
          Suggested categories
          <span
            className={`sw ${suggested ? 'on' : ''}`}
            onClick={() => setSuggested(!suggested)}
          ></span>
        </div>
        <div className="eclist">
          {categories.map((c) => (
            <div className="ecrow" key={c.title}>
              {c.title}
              <span
                className={`sw ${hiddenCats.has(c.title) ? '' : 'on'}`}
                onClick={() => onToggleCat(c.title)}
              ></span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
