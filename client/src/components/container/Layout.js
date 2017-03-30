import React from 'react';

import About from './About';
import ActiveProposals from './ActiveProposals';
import Apply from './Apply';
import Heading from '../presentation//Heading'
import MemberDapps from './MemberDapps';
import SubmitProposal from './SubmitProposal';

import { connect } from 'react-redux';
import * as actions from '../../Actions/actions';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Link, IndexLink } from "react-router";

export class Layout extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

	componentWillMount() {
	    this.props.dispatch(actions.fetchMemberDapps());
	    this.props.dispatch(actions.fetchProposals());
	}


  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }


  render() {

  	let pathName = this.props.location.pathname;

    return (
      <div>
      	<div className="heading">
      		<h1>The DAO</h1>
      		<h2>A Dapp Advancement Organization</h2>
      	</div>

            <ul className="work">
              <li role='presentation' className={pathName === "/" ? "active" : ""}>
                <IndexLink to="/">About</IndexLink>
              </li>
              <li role='presentation' className={pathName === "/apply" ? "active" : ""}>
                <Link to="/apply">Apply</Link>
              </li>              
              <li role='presentation' className={pathName === "/memberdapps" ? "active" : ""}>
                <Link to="/memberdapps">Member Dapps</Link>
              </li>
              <li role='presentation' className={pathName === "/activeproposals" ? "active" : ""}>
                <Link to="/activeproposals">Active Proposals</Link>
              </li>
              {/*<NavItem>
                <NavLink href="/submitproposal">Submit Proposal</NavLink>
              </NavItem>*/}

            </ul>

            <hr />

            {this.props.children}

      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
    dappList: state.dappList,
    isFetched: state.isFetched,
    congressContract: state.congressContract,
    dappSelected: state.dappSelected,
    activeProposals: state.activeProposals
});

export default connect(mapStateToProps)(Layout);

