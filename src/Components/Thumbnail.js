import React, { Component } from "react"

export default class Thumbnail extends Component {
  constructor(props) {
    super(props)
    this.imgRef = React.createRef()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.imgRef.current.click()
  }

  render() {
    const { onClick, id, imageUrl, itemName } = this.props
    return (
      <div className="feed-thumbnail-wrap">
        <span className="thumbnail-name" onClick={this.handleClick}>
          {itemName}
        </span>
        <img
          className="feed-thumbnail"
          name={id}
          src={imageUrl}
          alt={itemName}
          ref={this.imgRef}
          onClick={onClick}
        />
      </div>
    )
  }
}
