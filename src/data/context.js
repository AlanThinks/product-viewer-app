import React, { Component } from "react"
// import axios from "axios"
import data from "./test.json"
const { items, SalesRep, ...ManufacturerData } = data

const Context = React.createContext()

const reducer = (state, action) => {
  switch (action.type) {
    case `ADD_TO_CART`:
      const newItem = state.items.filter(
        item => action.payload === item.ProductID
      )[0]
      return {
        ...state,
        cart: [newItem, ...state.cart]
      }
    case `CHECKOUT_MODAL`:
      return {
        ...state,
        checkOutModal: action.payload
      }

    case `REMOVE_FROM_CART`:
      return {
        ...state,
        cart: state.cart.filter(item => item.payload !== item.ProductID)
      }

    // case `UPDATE_ITEM`:
    //   return {
    //     ...state,
    //     cart: state.cart.map(
    //       item => (action.payload === item.ProductID ? item : action.payload)
    //     )
    //   }
    default:
      return state
  }
}
export class Provider extends Component {
  state = {
    items,
    SalesRep,
    ManufacturerData,
    cart: [],
    checkOutModal: false,
    dispatch: action => this.setState(state => reducer(state, action))
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    )
  }
}

export const Consumer = Context.Consumer
