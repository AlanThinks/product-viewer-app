import React, { Component } from "react"
import { Consumer } from "../../data/context"
import { Link } from "react-router-dom"
export default class ProductDetailView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      screenSize: { width: 0, height: 0 },
      currentProductId: "",
      cropUnt: 300,
      cropAmount: "6,6,294,294",
      indexes: [
        Math.floor(Math.random() * 9),
        Math.floor(Math.random() * 9),
        Math.floor(Math.random() * 9)
      ]
    }
    window.scrollTo(0, 0)

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    this.formatPhoneNumber = this.formatPhoneNumber.bind(this)
    this.addToCart = this.addToCart.bind(this)
    this.getSuggestedItems = this.getSuggestedItems.bind(this)
    this.doTransition = this.doTransition.bind(this)
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

  addToCart(dispatch, productId) {
    if (productId) {
      dispatch({ type: "ADD_TO_CART", payload: productId })
    }
  }
  getSuggestedItems(allItems, numOfItems) {
    const { currentProductId } = this.state

    let allOtherItems = allItems.filter(
      item => currentProductId !== item.ProductID.toString()
    )

    let suggestedItems = []
    let lastRandom = undefined
    let random

    for (var i = 0; i < numOfItems; i++) {
      if (lastRandom === undefined) {
        random = Math.floor(Math.random() * (allOtherItems.length + 1))
      } else {
        random = Math.floor(Math.random() * (allOtherItems.length - 1))
        if (random >= lastRandom) random += 1
      }
      if (random > 8) random = 0

      suggestedItems.push(allOtherItems[random])
      lastRandom = random
    }

    return suggestedItems
  }

  doTransition() {
    this.setState({
      ...this.state,
      indexes: [
        Math.floor(Math.random() * 9),
        Math.floor(Math.random() * 9),
        Math.floor(Math.random() * 9)
      ]
    })

    window.scrollTo(0, 0)
  }
  render() {
    const { width } = this.state.screenSize
    let imageWidth = 550
    if (width > 600) {
      imageWidth = 650
    }

    return (
      <Consumer>
        {value => {
          const { cropUnt, cropAmount } = this.state
          let currentId
          !this.state.currentProductId
            ? (currentId = this.props.match.params.id)
            : (currentId = this.state.currentProductId)
          const item = value.items.filter(
            item => item.ProductID.toString() === currentId
          )[0]
          const {
            ItemID,
            ItemName,
            Description,
            Dimensions,
            BasePrice,
            PhotoName,
            OnHandQuantity,
            ProductID
          } = item
          const { SalesRep } = value

          return (
            <div className="container">
              <div className="breadcrumbs">
                <Link to="/">
                  <span>All Products</span>
                </Link>{" "}
                > {ItemName}
              </div>
              <div className="product-detail-container">
                <div className="product-image">
                  <img
                    src={`${PhotoName}?w=${imageWidth}&h=${imageWidth}&cropxunits=${cropUnt}&cropyunits=${cropUnt}&crop=${cropAmount}`}
                    alt={ItemName}
                  />
                </div>
                <div className="product-info">
                  <div className="product-name">
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
                      ${parseFloat(BasePrice).toFixed(2)}
                      {/* <i className="far fa-caret-square-down" /> */}
                    </button>
                  </div>
                  <div
                    className={
                      "product-description" +
                      (!Description ? " product-description-empty" : "")
                    }
                  >
                    <p>{Description}</p>
                    <em>Dimensions: {Dimensions}</em>
                  </div>
                  <div className="btn-block">
                    <button
                      disabled={OnHandQuantity < 1 ? true : false}
                      onClick={e => this.addToCart(value.dispatch, ProductID)}
                      className="btn btn-add-to-cart btn-block"
                    >
                      {OnHandQuantity < 1 ? "Out Of Stock" : "Add To Cart"}
                    </button>
                  </div>
                  <div className="suggested-items">
                    {
                      <React.Fragment>
                        {[
                          value.items[this.state.indexes[0]],
                          value.items[this.state.indexes[1]],
                          value.items[this.state.indexes[2]]
                        ].map((item, i) => (
                          <div
                            key={"suggestedItem" + i}
                            className="suggested-item"
                          >
                            <Link
                              to={{
                                pathname: `/product-detail/${item.ProductID}`,
                                state: { currentProductId: item.ProductID }
                              }}
                              onClick={this.doTransition}
                            >
                              <img
                                src={`${
                                  item.PhotoName
                                }?w=${imageWidth}&h=${imageWidth}&cropxunits=${cropUnt}&cropyunits=${cropUnt}&crop=${cropAmount}`}
                                alt=""
                              />
                            </Link>
                          </div>
                        ))}
                      </React.Fragment>
                    }
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
                            <td>
                              {SalesRep.FirstName + " " + SalesRep.LastName}
                            </td>
                          </tr>
                          <tr>
                            <td>E-Mail:</td>
                            <td>{SalesRep.EmailAddress}</td>
                          </tr>
                          <tr>
                            <td>Cell Phone:</td>
                            <td>
                              {this.formatPhoneNumber(SalesRep.CellPhone)}
                            </td>
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
                  </div>
                </div>
              </div>
            </div>
          )
        }}
      </Consumer>
    )
  }
}
