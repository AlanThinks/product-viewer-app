import React, { Component } from "react"
import { Consumer } from "../data/context"

export default class CheckOutModal extends Component {
  closeModal(dispatch) {
    // Using React's Context API to dispatch this action which
    // track if the modal should be open/closes in the Provider
    dispatch({ type: "CHECKOUT_MODAL", payload: false })
  }

  removeItem(dispatch, index) {
    // Sending index of the item in the state.cart which should
    // be removed.
    dispatch({ type: "REMOVE_FROM_CART", payload: index })
  }
  checkOut(dispatch) {
    // Clearing cart in the Provider
    dispatch({ type: "CLEAR_CART", payload: "" })
    this.closeModal(dispatch)
  }
  render() {
    return (
      <Consumer>
        {value => {
          // Data coming from 'vale' comes from the Provider in
          // ./data/context.js
          const { dispatch, cart, checkOutModal } = value
          return (
            <div
              className="checkout-modal"
              style={
                checkOutModal
                  ? {
                      opacity: 100,
                      visibility: "visible",
                      transition: "all 0.2s",
                      width: 500
                    }
                  : {
                      opacity: 0,
                      visibility: "hidden",
                      transition: "all 0.2s",
                      width: 0,
                      display: "none"
                    }
              }
            >
              <div className="checkout-body">
                <i
                  onClick={e => this.closeModal(dispatch)}
                  style={{
                    float: "right",
                    color: "grey",
                    fontSize: "1.2rem"
                  }}
                  className="fas fa-times"
                />
                <div className="header">
                  <h2>Check-Out</h2>
                </div>

                <div className="items-table">
                  <table>
                    <thead>
                      <tr>
                        <th>{cart.length > 0 ? "Item" : ""}</th>
                        <th>{cart.length > 0 ? "Price" : ""}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.length > 0 ? (
                        cart.map((item, i) => (
                          <tr key={`checkout item ${i}`}>
                            <td>
                              {item.ItemName}
                              <i
                                onClick={e => this.removeItem(dispatch, i)}
                                className="far fa-trash-alt"
                              />
                            </td>
                            <td>${parseFloat(item.BasePrice).toFixed(2)}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td style={{ textAlign: "center" }}>
                            Your Shopping Cart Is Empty
                          </td>
                        </tr>
                      )}
                      <tr style={cart.length > 0 ? {} : { display: "none" }}>
                        <td style={{ float: "right", borderBottom: "none" }}>
                          TOTAL:{" "}
                        </td>
                        <td style={{ fontWeight: 400 }}>
                          $
                          {parseFloat(
                            cart
                              ? cart.reduce(
                                  (acc, cur) => acc + cur.BasePrice,
                                  0
                                )
                              : "0"
                          ).toFixed(2)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <button
                    onClick={e => this.checkOut(dispatch)}
                    style={
                      cart.length < 1
                        ? { display: "none" }
                        : { display: "block" }
                    }
                    className="btn btn-block btn-add-to-cart btn-checkout"
                  >
                    Check-Out
                  </button>
                </div>
              </div>
            </div>
          )
        }}
      </Consumer>
    )
  }
}
