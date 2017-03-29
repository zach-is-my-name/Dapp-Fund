import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Link, IndexLink } from "react-router";

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>

        <Navbar color="faded" light toggleable>
          <NavbarToggler right onClick={this.toggle} />
          <NavbarBrand href="/">DappFund</NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink><IndexLink to="/">About</IndexLink></NavLink>
              </NavItem>
              <NavItem>
                <NavLink><Link to="/apply">Apply</Link></NavLink>
              </NavItem>              
              <NavItem>
                <NavLink><Link to="/memberdapps">Member Dapps</Link></NavLink>
              </NavItem>
              <NavItem>
                <NavLink><Link to="/activeproposals">Active Proposals</Link></NavLink>
              </NavItem>
              {/*<NavItem>
                <NavLink href="/submitproposal">Submit Proposal</NavLink>
              </NavItem>*/}

            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
