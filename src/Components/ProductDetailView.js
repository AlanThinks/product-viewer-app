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
            PhotoName
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
            <div className="container">
              <div className="product-header">
                <h2>{ItemName}</h2>
              </div>
              <div className="product-image">
                <img
                  src={`${PhotoName}?w=${imageWidth}&h=${imageWidth}&cropxunits=${cropUnt}&cropyunits=${cropUnt}&crop=${cropAmount}`}
                  alt={Description}
                />
              </div>
            </div>
          )
        }}
      </Consumer>
    )
  }
}
