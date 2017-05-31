import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Link, IndexLink } from "react-router";

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.setActive = this.setActive.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  setActive(e) {
    e.preventDefault();
    // console.log('event target', e.target);
    e.target.className = 'active';
  }

  render() {

    return (
      <div>

        <Navbar color="faded" light toggleable>
          <NavbarToggler right onClick={this.toggle} />
          <NavbarBrand href="/">DappFund</NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            <ul className="work">
              <li role='presentation' onClick={this.setActive}>
                <IndexLink to="/">About</IndexLink>
              </li>
              <li role='presentation' onClick={this.setActive}>
                <Link to="/apply">Apply</Link>
              </li>
              <li role='presentation' onClick={this.setActive}>
                <Link to="/memberdapps">Member Dapps</Link>
              </li>
              <li role='presentation' onClick={this.setActive}>
                <Link to="/activeproposals">Active Proposals</Link>
              </li>
              {/*<NavItem>
                <NavLink href="/submitproposal">Submit Proposal</NavLink>
              </NavItem>*/}

            </ul>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
