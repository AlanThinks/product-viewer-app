import React from "react"

const NavigationBar = () => {
  return (
    <nav className="search-nav">
      {/* <div className="nav-logo">
                <img
                  src={`http://images.repzio.com/productimages//logo{{ManufacturerID}}_lg.jpg`}
                  alt=""
                />
              </div> */}
      <div className="btn-search">
        <i className="fas fa-search" />
      </div>
    </nav>
  )
}

export default NavigationBar
