import React, { Component } from "react"
import { Consumer } from "../data/context"
import Thumbnail from "./Thumbnail"

export default class ProductDetailView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showContactInfo: true,
      screenSize: { width: 0, height: 0 },
      viewModal: false,
      selectedItem: { ItemName: "", Description: "", BasePrice: "" }
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
      this.setState({
        viewModal: true,
        selectedItem: selectedItem[0]
      })
    }
  }
  closeModal() {
    this.setState({
      viewModal: false
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
          const { ItemName, BasePrice, Description } = this.state.selectedItem
          let truncDescription
          if (Description.length > 74) {
            truncDescription = Description.substring(0, 75) + ` ...Read More`
          } else {
            truncDescription = Description
          }
          const cropUnt = 300
          const cropAmount = "6,6,294,294"
          const modalPhotoUrl = `${
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
                    ? {
                        opacity: 100,
                        visibility: "visible",
                        transition: "all 0.2s"
                      }
                    : {
                        opacity: 0,
                        visibility: "hidden",
                        transition: "all 0.2s"
                      }
                }
              >
                <div className="product-preview-modal">
                  <i
                    style={{ float: "right", color: "grey" }}
                    className="fas fa-times"
                  />

                  <div className="preview-header">
                    <h2>{ItemName}</h2>
                  </div>
                  <div className="big-thumbnail">
                    <img src={modalPhotoUrl} alt={ItemName} />
                  </div>
                  <div className="preview-desc">
                    <p>{truncDescription}</p>
                  </div>
                  <div className="preview-footer">
                    <button className="btn btn-learn-more">Learn More</button>
                    <button className="btn modal-price">
                      ${parseFloat(BasePrice).toFixed(2)}
                    </button>
                  </div>
                </div>
              </div>
              <div className="container">
                {items.map(item => (
                  <Thumbnail
                    key={item.ProductID}
                    onClick={e => this.viewModal(e, items)}
                    id={item.ProductID}
                    imageUrl={`${
                      item.PhotoName
                    }?w=${imageWidth}&h=${imageWidth}&cropxunits=${cropUnt}&cropyunits=${cropUnt}&crop=${cropAmount}`}
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
