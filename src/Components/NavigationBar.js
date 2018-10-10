import React, { Component } from "react"
import { Consumer } from "../data/context"

export default class NavigationBar extends Component {
  render() {
    return (
      <Consumer>
        {value => {
          const { ManufacturerID } = value.ManufacturerData
          return (
            <nav className="search-nav">
              <div className="nav-logo">
                <img
                  src={`http://images.repzio.com/productimages/${ManufacturerID}/logo${ManufacturerID}_lg.jpg?cropxunits=100&cropyunits=100&crop=0,5,0,-5`}
                  alt={ManufacturerID.CompanyName}
                />
              </div>
              <div className="btn-search">
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
