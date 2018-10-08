import React, { Component } from "react"
import { Consumer } from "../data/context"
import Thumbnail from "./Thumbnail"

export default class ThumbnailsView extends Component {
  constructor(props) {
    super(props)
    this.state = { showContactInfo: true, screenSize: { width: 0, height: 0 } }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }

  componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener("resize", this.updateWindowDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions)
  }

  updateWindowDimensions() {
    this.setState({
      screenSize: { width: window.innerWidth, height: window.innerHeight }
    })
  }

  render() {
    const { width } = this.state.screenSize
    let imageWidth = 350
    if (width > 600) {
      imageWidth = 600
    }

    return (
      <Consumer>
        {value => {
          const { items } = value
          console.log(value)

          return (
            <div className="container">
              {items.map(item => (
                <Thumbnail
                  key={item.ProductID}
                  imageUrl={`${
                    item.PhotoName
                  }?w=${imageWidth}&cropxunits=200&cropyunits=200&crop=4,4,196,196`}
                  description={item.Description}
                />
              ))}
            </div>
          )
        }}
      </Consumer>
    )
  }
}
