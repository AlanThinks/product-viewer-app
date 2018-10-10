import { Link } from "react-router-dom"
import React, { Component } from "react"

export default class NotFound extends Component {
  render() {
    return (
      <div style={{ marginTop: 100, marginLeft: 50 }}>
        <h1>Oops!</h1>
        <p>404: Sorry! Can't Find That Page</p>
        <Link to="/">Click Here To Go Home</Link>
      </div>
    )
  }
}
