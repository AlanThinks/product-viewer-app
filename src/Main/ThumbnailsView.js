import React, { Component } from "react"
import { Consumer } from "../data/context"
import Thumbnail from "./Thumbnail"

export default class ThumbnailsView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showContactInfo: true,
      screenSize: { width: 0, height: 0 },
      viewModal: false,
      selectedItem: {}
    }

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    this.viewModal = this.viewModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
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
  viewModal(e, items) {
    if (!this.state.viewModal) {
      const selectedItem = items.filter(
        item => item.ProductID.toString() === e.target.name
      )
      this.setState({ viewModal: true, selectedItem: selectedItem[0] })
    }
  }
  closeModal() {
    this.setState({ viewModal: false, selectedItem: {} })
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
          const { ItemName, Description, BasePrice } = this.state.selectedItem
          const cropUnt = 300
          const cropAmount = "6,6,294,294"
          const itemPhotoUrl = `${
            this.state.selectedItem.PhotoName
          }?w=${imageWidth *
            1.5}&cropxunits=${cropUnt}&cropyunits=${cropUnt}&crop=${cropAmount}`
          return (
            <div>
              <div
                onClick={this.closeModal}
                className="modal"
                style={
                  this.state.viewModal
                    ? { opacity: 100, visibility: "visible" }
                    : null
                }
              >
                <div className="product-preview-modal">
                  <div className="preview-header">
                    {ItemName}
                    {BasePrice}
                  </div>
                  <div className="big-thumbnail">
                    <img src={itemPhotoUrl} alt={items[0].Description} />
                  </div>
                  <div className="preview-footer">{Description} </div>
                </div>
              </div>
              <div className="container">
                {items.map(item => (
                  <Thumbnail
                    onClick={e => this.viewModal(e, items)}
                    id={item.ProductID}
                    key={item.ProductID}
                    imageUrl={`${
                      item.PhotoName
                    }?w=${imageWidth}&cropxunits=300&cropyunits=300&crop=6,6,294,294`}
                    itemName={item.ItemName}
                  />
                ))}
              </div>
            </div>
          )
        }}
      </Consumer>
    )
  }
}
