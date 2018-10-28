import React, { Component } from "react"
import { Consumer } from "../data/context"
import { Link } from "react-router-dom"

export default class NavigationBar extends Component {
  constructor(props) {
    // Receiving props, initialiazing this components state,
    // and binding the function(s).
    super(props)
    this.state = { viewModal: false }
    this.modalAction = this.modalAction.bind(this)
  }
  modalAction(dispatch, currentValue) {
    // Using React's Context API to dispatch this action which
    // track if the modal should be opened/closed in the Provider
    dispatch({ type: "CHECKOUT_MODAL", payload: !currentValue })
  }

  render() {
    return (
      <Consumer>
        {value => {
          // ManufacturerID (used for the Logo) comes directly from
          // the Provider state which comes directly from test.josn
          const { dispatch, checkOutModal } = value
          // const { ManufacturerID } = value.ManufacturerData
          return (
            <nav className="top-nav">
              <Link to="/">
                <div className="nav-logo">
                  {/* <img
                    src={`http://images.repzio.com/productimages/${ManufacturerID}/logo${ManufacturerID}_lg.jpg?cropxunits=100&cropyunits=100&crop=0,5,0,-5`}
                    alt={ManufacturerID.CompanyName}
                  /> */}
                  <img
                    src="http://alanthinks.com/projects/product-viewer-app/box-buy-logo.png"
                    alt=""
                  />
                </div>
              </Link>
              <div
                className="btn-cart"
                onClick={e => this.modalAction(dispatch, checkOutModal)}
              >
                <i className="fas fa-shopping-cart">
                  <span
                    className={`car-items-num${
                      value.cart.length > 9 ? " dub-digits" : ""
                    }`}
                  >
                    {value.cart < 1 ? "" : value.cart.length}
                  </span>
                </i>
              </div>
            </nav>
          )
        }}
      </Consumer>
    )
  }
}
