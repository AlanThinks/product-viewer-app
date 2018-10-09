import React, { Component } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import "./css/styles.css"

// import NotFound from "./NotFound"
import { Provider } from "./data/context"
import ThumbnailsView from "./Main/ThumbnailsView"

class Router extends Component {
  render() {
    return (
      <Provider>
        <BrowserRouter>
          <div className="App">
            <nav className="search-nav">
              <i className="fas fa-search" />
            </nav>
            <div className="container">
              <Switch>
                <Route exact path="/" component={ThumbnailsView} />
                {/* <Route exact path="/new-contact" component={AddContact} />
                <Route exact path="/edit-contact" component={EditContact} />
                <Route exact path="/about/" component={AboutMe} />
                <Route exact path="/about/:id" component={AboutMe} />
                <Route component={NotFound} /> */}
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default Router
