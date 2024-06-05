import React, { useState } from 'react'
import './styles.scss'

export const SwitchTabs = ({data, onTabChange}) => {
  const [tabActive, setTabActive] = useState(0);
  const [left, setLeft] = useState(0);

  const activeTab = (value, index) => {
    setLeft(index * 110)
    setTabActive(index)
    onTabChange(value, index)
  }

  return (
    <div className='switchingTabs'>
      <div className="items">
        {data.map((value, index) => (
          <span key={index} 
          class = {(tabActive === index ? "actived" : "")}
          onClick={() => activeTab(value, index)}>
            {value}
          </span>
        ))}
        <div className="movingBg" style={{ left: left }} />
      </div>
    </div>
  )
}
