import { Link } from "react-router-dom"
import React, { Component } from "react"

export default class NotFound extends Component {
  render() {
    return (
      <div className="container">
        <div style={{ fontSize: "2rem", marginLeft: "15%", marginTop: 100 }}>
          <h1 style={{ fontSize: "4rem", margin: 0 }}>Oops!</h1>
          <p style={{ width: 450 }}>404: Sorry! Can't Find That Page</p>
          <Link style={{ width: 450, fontWeight: 400, color: "orange" }} to="/">
            Click Here To Go Home
          </Link>
        </div>
      </div>
    )
  }
}
