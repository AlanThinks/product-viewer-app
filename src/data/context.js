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
      const updatedItems = state.items.map(function(item) {
        if (action.payload === item.ProductID) {
          return { ...item, OnHandQuantity: item.OnHandQuantity - 1 }
        }
        return item
      })
      return {
        ...state,
        items: updatedItems,
        cart: [newItem, ...state.cart]
      }

    case `REMOVE_FROM_CART`:
      const returnedItem = state.cart.filter(
        (item, i) => action.payload === i
      )[0]

      const updatedInventory = state.items.map(function(item) {
        if (item.ProductID === returnedItem.ProductID) {
          return { ...item, OnHandQuantity: item.OnHandQuantity + 1 }
        }
        return item
      })
      return {
        ...state,
        items: updatedInventory,
        cart: state.cart.filter((item, i) => action.payload !== i)
      }

    case `CHECKOUT_MODAL`:
      return {
        ...state,
        checkOutModal: action.payload
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
