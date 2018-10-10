import React, { Component } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import "./css/styles.css"

import NotFound from "./Components/NotFound"
import { Provider } from "./data/context"
import ThumbnailsView from "./Components/ThumbnailsView"
import ProductDetailsView from "./Components/ProductDetailView"
import NavigationBar from "./Components/NavigationBar"

class Router extends Component {
  render() {
    return (
      <Provider>
        <BrowserRouter basename={`${process.env.PUBLIC_URL}/`}>
          {/* <BrowserRouter> */}
          <div className="App">
            <NavigationBar />
            <Switch>
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/`}
                component={ThumbnailsView}
              />
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/product-detail/:id`}
                component={ProductDetailsView}
              />
              <Route component={NotFound} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default Router
