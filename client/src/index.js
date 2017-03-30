import React from 'react';
import ReactDOM  from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import {Provider} from 'react-redux';
import store from './store'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import About from './components/container/About';
import Apply from './components/container/Apply';
import MemberDapps from './components/container/MemberDapps';
import ActiveProposals from './components/container/ActiveProposals';
import SubmitProposal from './components/container/SubmitProposal';
import Heading from './components/presentation//Heading';
import NavBar from './components/presentation/NavBar';

import { Router, Route, browserHistory, IndexRoute } from 'react-router';

document.addEventListener('DOMContentLoaded', () =>
    ReactDOM.render(
        <Provider store={store} >
            <Router history={browserHistory}>
                <Route path="/" component={About} ></Route>
                <Route path="/about" component={About} ></Route>
                <Route path="/apply" component={Apply} />
                <Route path="/memberdapps" component={MemberDapps} ></Route>
                <Route path="/activeproposals" component={ActiveProposals} ></Route>
                <Route path="/submitproposal" component={SubmitProposal} ></Route>
            </Router>
        </Provider>, document.getElementById('root')
    )
);


