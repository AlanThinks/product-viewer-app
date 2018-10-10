import React, { Component } from "react"
import { Consumer } from "../data/context"
import Thumbnail from "./Thumbnail"
import { Link } from "react-router-dom"

export default class ThumbnailsView extends Component {
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
    this.addToCart = this.addToCart.bind(this)
    console.log(
      '%c "Product Viewer App" by Alan Guevara 👉alanthinks.com',
      "font-family:sans-serif; color:rgb(216, 0, 90); font-size:1.5rem; text-align:center; text-shadow:1px 1px 1px darkgrey;"
    )
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

  addToCart(dispatch, productId) {
    if (productId) {
      dispatch({ type: "ADD_TO_CART", payload: productId })
    }
    this.closeModal()
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
          const { items, dispatch } = value
          const {
            ProductID,
            ItemName,
            BasePrice,
            Description,
            OnHandQuantity
          } = this.state.selectedItem
          let truncDescription
          if (Description.length > 74) {
            truncDescription = Description.substring(0, 75) + `...`
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
            <div className="main">
              <div
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
                    onClick={this.closeModal}
                    style={{ float: "right", color: "grey" }}
                    className="fas fa-times"
                  />
                  <div className="preview-header">
                    <h2>{ItemName}</h2>
                  </div>
                  <div className="big-thumbnail">
                    <Link to={`./product-detail/${ProductID}`}>
                      <img src={modalPhotoUrl} alt={ItemName} />
                    </Link>
                  </div>
                  <div className="preview-desc">
                    <p>{truncDescription}</p>
                  </div>

                  <div className="preview-footer">
                    <Link to={`./product-detail/${ProductID}`}>
                      <button className="btn btn-price">
                        ${parseFloat(BasePrice).toFixed(2)}
                      </button>
                      <button className="btn btn-details">Details</button>
                    </Link>

                    <button
                      disabled={OnHandQuantity < 1 ? true : false}
                      onClick={e => this.addToCart(dispatch, ProductID)}
                      className="btn btn-add-to-cart"
                    >
                      {OnHandQuantity < 1 ? "Out Of Stock" : "Add To Cart"}{" "}
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
