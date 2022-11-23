import React from "react";
import { Link } from "react-router-dom";

class SubMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light col-sm-7">
          <div className="flex-fill">
            <ul className="nav navbar-nav d-flex justify-content-between mx-lg-auto">
              <li>
                <Link className="nav-link" to="/transorder">
                  Trans Order
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/approve">
                  Approved list
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/user">
                  MapUser
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/product">
                  Product Item
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/addbonus">
                  Add Bonus Point
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/block">
                  Trans Blocks
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </>
    );
  }
}

export default SubMenu;
