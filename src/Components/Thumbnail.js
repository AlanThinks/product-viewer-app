import React from "react"

const Thumbnail = ({ onClick, id, imageUrl, itemName }) => {
  return (
    <div className="feed-thumbnail-wrap">
      <img
        className="feed-thumbnail"
        name={id}
        onClick={onClick}
        src={imageUrl}
        alt={itemName}
      />
    </div>
  )
}

export default Thumbnail
