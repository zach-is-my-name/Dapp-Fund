import React from 'react';
import ReactDOM  from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import {Provider} from 'react-redux';
import store from './store'
import About from './components/container/About';
import Apply from './components/container/Apply';
import MemberDapps from './components/container/MemberDapps';
import ActiveProposals from './components/container/ActiveProposals';
import SubmitProposal from './components/container/SubmitProposal';

import { Router, Route, browserHistory } from 'react-router';

document.addEventListener('DOMContentLoaded', () =>
    ReactDOM.render(
        <Provider store={store} >
            <Router history={browserHistory}>
                <Route exact path="/" component={About} ></Route>
                <Route exact path="/about" component={About} ></Route>
                <Route exact path="/apply" component={Apply} />
                <Route exact path="/memberdapps" component={MemberDapps} ></Route>
                <Route exact path="/activeproposals" component={ActiveProposals} ></Route>
                <Route exact path="/submitproposal" component={SubmitProposal} ></Route>
            </Router>
        </Provider>, document.getElementById('root')
    )
);


