import React from 'react'
import pagenotfound from '../src/assets/pnf1.avif'

export const PageNotFound = () => {
  const wrpStyle = {display:"flex"}
  const imgStyle = {margin:"auto",width:"45%"}
  return (
    <div style={wrpStyle}>
      <img style={imgStyle} src={pagenotfound} alt="404" />
    </div>
  )
}
