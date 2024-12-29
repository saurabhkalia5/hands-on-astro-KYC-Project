import React from 'react'
import './headtingTile.styles.css'

interface HeadingTileProps{
  title:string;
}

export default function HeadingTile(props:HeadingTileProps) {
  return (
    <div className='heading-tile-container'>{props.title}</div>
  )
}
