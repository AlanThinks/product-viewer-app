import React, { Component } from "react"
import { Consumer } from "../data/context"
import { Link } from "react-router-dom"

export default class NavigationBar extends Component {
  constructor(props) {
    super(props)
    this.state = { viewModal: false }
    this.modalAction = this.modalAction.bind(this)
  }
  modalAction(dispatch, currentValue) {
    dispatch({ type: "CHECKOUT_MODAL", payload: !currentValue })
  }

  render() {
    return (
      <Consumer>
        {value => {
          const { dispatch, checkOutModal } = value
          const { ManufacturerID } = value.ManufacturerData
          return (
            <nav className="search-nav">
              <Link to="/">
                <div className="nav-logo">
                  <img
                    src={`http://images.repzio.com/productimages/${ManufacturerID}/logo${ManufacturerID}_lg.jpg?cropxunits=100&cropyunits=100&crop=0,5,0,-5`}
                    alt={ManufacturerID.CompanyName}
                  />
                </div>
              </Link>
              <div
                className="btn-search"
                onClick={e => this.modalAction(dispatch, checkOutModal)}
              >
                <i className="fas fa-shopping-cart">
                  <span className="car-items-num">
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
