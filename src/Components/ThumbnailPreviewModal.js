// import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Consumer } from "../data/context"

export default class ThumbnailPreviewModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewModal: this.props.viewModal,
      selectedItem: {
        ItemName: "",
        Description: "",
        BasePrice: "",
        PhotoName: "",
        OnHandQuantity: ""
      }
    }
    this.modalSwitch = this.modalSwitch.bind(this)
  }
  modalSwitch(e, items) {
    // if (!this.state.viewModal) {
    //   const selectedItem = items.filter(
    //     item => item.ProductID.toString() === e.target.name
    //   )
    this.setState({
      viewModal: !this.props.viewModal
      // selectedItem: selectedItem[0]
    })
  }
  render() {
    const { ItemName, ProductID, BasePrice, OnHandQuantity } = this.props.item
    const { modalPhotoUrl, truncDescription, viewModal } = this.props
    return (
      <Consumer>
        {value => {
          const { dispatch } = value
          return (
            <div
              className="modal"
              style={
                viewModal
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
                  onClick={this.modalSwitch}
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
          )
        }}
      </Consumer>
    )
  }
}
