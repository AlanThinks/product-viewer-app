import React, { Component } from "react"
// import axios from "axios"
import data from "./test.json"
const { items, SalesRep, ...ManufacturerData } = data

const Context = React.createContext()

export class Provider extends Component {
  state = {
    items,
    SalesRep,
    ManufacturerData
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
