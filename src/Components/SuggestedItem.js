import React, { Component } from "react"
import { Link } from "react-router-dom"

export default class SuggestedItem extends Component {
  render() {
    const { cropAmount, cropUnt, imageWidth } = this.props.state
    const { item } = this.props

    return (
      <Link to={`/product-detail/${item.ProductID}`}>
        <div className="suggested-item">
          <img
            src={`${
              item.PhotoName
            }?w=${imageWidth}&h=${imageWidth}&cropxunits=${cropUnt}&cropyunits=${cropUnt}&crop=${cropAmount}`}
            alt=""
          />
        </div>
      </Link>
    )
  }
}
