import React, { Component } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import "./css/styles.css"

import NotFound from "./Components/NotFound"
import { Provider } from "./data/context"
import ThumbnailsView from "./Components/MainViews/ThumbnailsView"
import ProductDetailsView from "./Components/MainViews/ProductDetailView"
import NavigationBar from "./Components/NavigationBar"
import CheckOutModal from "./Components/CheckOutModal"

class Router extends Component {
  render() {
    return (
      <Provider>
        <BrowserRouter basename={`${process.env.PUBLIC_URL}`}>
          <div className="main">
            <CheckOutModal />
            <NavigationBar />
            <Switch>
              <Route exact path="/" component={ThumbnailsView} />
              <Route
                exact
                path="/product-detail/:id"
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
