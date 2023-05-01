import React from 'react';
import './MainPage.css'
import LeftSide from './LeftSide/LeftSide';
import RightSide from './RightSide/RightSide';

function MainPage() {
  return (
    <div className='MainPage'>
      <LeftSide />
      <RightSide />
    </div>
  )
}

export default MainPage