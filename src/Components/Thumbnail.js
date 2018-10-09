import React from "react"

const Thumbnail = ({ onClick, id, imageUrl, itemName }) => {
  return <img name={id} onClick={onClick} src={imageUrl} alt={itemName} />
}

export default Thumbnail
