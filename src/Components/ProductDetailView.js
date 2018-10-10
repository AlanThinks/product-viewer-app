import React, { Component } from "react"
import { Consumer } from "../data/context"

export default class ProductDetailView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      screenSize: { width: 0, height: 0 },
      currentProductId: this.props.match.params.id
    }

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
    let imageWidth = 550
    if (width > 600) {
      imageWidth = 650
    }
    const cropUnt = 300
    const cropAmount = "6,6,294,294"

    return (
      <Consumer>
        {value => {
          const item = value.items.filter(
            item => item.ProductID.toString() === this.state.currentProductId
          )[0]
          const {
            ProductID,
            ManufacturerID,
            ItemID,
            ItemName,
            Description,
            Dimensions,
            BasePrice,
            PhotoName,
            OnHandQuantity
          } = item
          const { SalesRep } = value
          const { ManufacturerData } = value

          // let truncDescription
          // if (Description.length > 74) {
          //   truncDescription = Description.substring(0, 75) + ` ...Read More`
          // } else {
          //   truncDescription = Description
          // }

          // const modalPhotoUrl = `${
          //   this.state.selectedItem.PhotoName
          // }?w=${imageWidth *
          //   1.5}&cropxunits=${cropUnt}&cropyunits=${cropUnt}&crop=${cropAmount}`
          return (
            <div className="container product-detail-container">
              <div className="product-image">
                <img
                  src={`${PhotoName}?w=${imageWidth}&h=${imageWidth}&cropxunits=${cropUnt}&cropyunits=${cropUnt}&crop=${cropAmount}`}
                  alt={ItemName}
                />
              </div>
              <div className="product-header">
                <h2>{ItemName}</h2>
              </div>
              <div className="info-bar">
                <div className="item-id">Item ID: {ItemID}</div>
                <div className="divider">|</div>
                <div className="stock-info">
                  {OnHandQuantity < 1 ? (
                    <span style={{ color: "rgb(225, 0, 0)" }}>
                      Out Of Stock
                    </span>
                  ) : (
                    `Stock:
                  ${OnHandQuantity} Units`
                  )}
                </div>
                <div className="divider">|</div>
                <button className="price">
                  ${parseFloat(BasePrice).toFixed(2)}{" "}
                  <i className="far fa-caret-square-down" />
                </button>
              </div>
              <div
                className={
                  "product-description" +
                  (!Description ? " product-description-empty" : "")
                }
              >
                <p> {Description}</p>
                <em>Dimensions: {Dimensions}</em>
              </div>
              <div className="sales-rep" />
            </div>
          )
        }}
      </Consumer>
    )
  }
}
