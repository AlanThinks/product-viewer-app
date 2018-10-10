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
    this.formatPhoneNumber = this.formatPhoneNumber.bind(this)
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
  formatPhoneNumber(phoneNumberString) {
    const cleaned = ("" + phoneNumberString).replace(/\D/g, "")
    const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      const intlCode = match[1] ? "+1 " : ""
      return [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join("")
    }
    return null
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
            ItemID,
            ItemName,
            Description,
            Dimensions,
            BasePrice,
            PhotoName,
            OnHandQuantity
          } = item
          const { SalesRep } = value

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
              <div className="btn-block">
                <button className="btn btn-add-to-cart btn-block">
                  Add To Shopping Cart
                </button>
              </div>
              <div className="sales-rep">
                <h3>Sales Representative:</h3>

                <div className="sales-rep-table">
                  <table>
                    <tbody>
                      <tr>
                        <td>Company:</td>
                        <td>{SalesRep.CompanyName}</td>
                      </tr>
                      <tr>
                        <td>Name:</td>
                        <td>{SalesRep.FirstName + " " + SalesRep.LastName}</td>
                      </tr>
                      <tr>
                        <td>E-Mail:</td>
                        <td>{SalesRep.EmailAddress}</td>
                      </tr>
                      <tr>
                        <td>Cell Phone:</td>
                        <td>{this.formatPhoneNumber(SalesRep.CellPhone)}</td>
                      </tr>
                      <tr>
                        <td>Office Phone:</td>
                        <td>{this.formatPhoneNumber(SalesRep.Phone)}</td>
                      </tr>
                      <tr>
                        <td>Location: </td>
                        <td>
                          {SalesRep.City +
                            ", " +
                            SalesRep.State +
                            " " +
                            SalesRep.PostalCode}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/* <img
                  className="sales-rep-img"
                  src={`http://images.repzio.com/productimages/${ManufacturerID}/logo${ManufacturerID}_lg.jpg?cropxunits=100&cropyunits=100&crop=0,5,0,-5`}
                  alt={SalesRep.CompanyName}
                /> */}
              </div>
            </div>
          )
        }}
      </Consumer>
    )
  }
}
