import React from 'react'
import underConstion from '../../assets/underConstion.gif' 

export const UnderConst = () => {
    const constStyle = {display:'flex'}
    const imgStyle = {margin:'auto'}
  return (
    <div style={constStyle}>
      <img style={imgStyle} src={underConstion} alt="under construction" />
    </div>
  )
}
