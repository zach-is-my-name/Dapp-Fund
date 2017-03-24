import React from 'react';
import * as Cookies from 'js-cookie';

import MemberDapps from './MemberDapps';


class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
      
    }

    render() {

        return <MemberDapps />;

    }
}

export default App;
