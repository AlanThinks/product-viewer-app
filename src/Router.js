import React, { Component } from "react"
import logo from "./logo.svg"
import "./Main.css"

class Router extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
      </div>
    )
  }
}

export default Router
