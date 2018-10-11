import React, { Component } from "react"
import { Consumer } from "../../data/context"
import Thumbnail from "../Thumbnail"
import ThumbnailPreviewModal from "../ThumbnailPreviewModal"

export default class ThumbnailsView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showContactInfo: true,
      screenSize: { width: 0, height: 0 },
      viewModal: false,
      selectedItem: {
        ItemName: "",
        Description: "",
        BasePrice: "",
        PhotoName: "",
        OnHandQuantity: ""
      },
      cropUnt: 300,
      cropAmount: "6,6,294,294"
    }

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    this.modalAction = this.modalAction.bind(this)

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

  modalAction(e, dispatch, modelValue, items) {
    if (!modelValue) {
      const selectedItem = items.filter(
        item => item.ProductID.toString() === e.target.name
      )
      this.setState({
        selectedItem: selectedItem[0]
      })
    }
    dispatch({ type: "PRODUCT_MODAL", payload: !modelValue })
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
          const { items, dispatch, productModal } = value
          const { Description } = this.state.selectedItem
          let truncDescription
          if (Description.length > 74) {
            truncDescription = Description.substring(0, 75) + `...`
          } else {
            truncDescription = Description
          }
          const { cropUnt, cropAmount } = this.state
          const modalPhotoUrl = `${
            this.state.selectedItem.PhotoName
          }?w=${imageWidth *
            1.5}&cropxunits=${cropUnt}&cropyunits=${cropUnt}&crop=${cropAmount}`

          return (
            <div className="main">
              <ThumbnailPreviewModal
                item={this.state.selectedItem}
                modalPhotoUrl={modalPhotoUrl}
                truncDescription={truncDescription}
              />
              <div className="container">
                {items.map(item => (
                  <Thumbnail
                    key={item.ProductID}
                    onClick={e =>
                      this.modalAction(e, dispatch, productModal, items)
                    }
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
