import React from "react"

const Thumbnail = ({ id, imageUrl, description }) => {
  return <img src={imageUrl} alt={description} />
}

export default Thumbnail
