import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Consumer } from "../data/context"

export default class SuggestedItems extends Component {
  render() {
    return (
      <Consumer>
        {value => {
          const { cropUnt, cropAmount, items } = value
          const { randomIndexes, imageWidth, doTransition } = this.props

          return (
            <div className="suggested-items">
              {
                <React.Fragment>
                  {/* Here I map through the array with 3 random items
                   in order to render each one with its proper HTML */}
                  {[
                    items[randomIndexes[0]],
                    items[randomIndexes[1]],
                    items[randomIndexes[2]]
                  ].map((item, i) => (
                    <div key={"suggestedItem" + i} className="suggested-item">
                      <Link
                        to={`/product-detail/${item.ProductID}`}
                        onClick={doTransition}
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
          )
        }}
      </Consumer>
    )
  }
}
