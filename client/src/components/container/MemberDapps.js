import React from 'react';
import { Card, Button, CardImg, CardTitle, CardText, CardGroup, CardBlock, Jumbotron , FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import * as actions from '../../Actions/actions';
import Heading from '../presentation//Heading';
import NavBar from '../presentation/NavBar';

var Web3 = require('web3');
let web3 = window.web3;

window.addEventListener('load', function() {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
        // Use Mist/MetaMask's provider
        console.log('using metamask')
        console.log(window.web3);
        window.web3 = new Web3(web3.currentProvider);
    } else {
        console.log('No web3? You should consider trying MetaMask!')
        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        }
})

export class MemberDapps extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.dispatch(actions.fetchMemberDapps())
    }

    onSubmit(dappSelected) {
        console.log('user selected dapp ', dappSelected)
        this.props.dispatch(actions.userSelectedDapp(dappSelected))
    }
         
    render () {
    
        let dapps = this.props.dappDescriptionArr.map((dapp, index) => {
            console.log("here is a dapp", dapp);
            return (

                <Card key={index} className="card-border" >
                    <CardImg top width="30%" src={dapp.dappimagelink} alt="Card image cap" />
                    <CardBlock>
                        <CardTitle><b>Submit Proposal Test</b></CardTitle>                        
                        <CardTitle><b>Title: {dapp.dappname}</b></CardTitle>
                        <CardText><b>Description:</b> {dapp.dappdescription}</CardText>
                        <CardText><b>Source Code:</b> <a>{index}</a> </CardText>
                        <CardText><b>Creator:</b> {dapp.username}</CardText>
                        <Button color="primary" onClick={() => this.onSubmit(dapp)} >Submit New Proposal</Button>
                        <CardText></CardText>
                    </CardBlock>
                </Card>
            );
        })

        if (this.props.isFetched)
            console.log(this.props.dappDescriptionArr);

                return (
                    <div className="container">
                        <div className="space-out" > </div>
                        <Heading />
                        <br />
                        <NavBar />
                        <CardGroup>
                            <h3>MEMBER DAPPS VIEW</h3>
                            {dapps}
                        </CardGroup>

                        <div className="space-out" > </div>
                    </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    dappDescriptionArr: state.DappDescription,
    isFetched: state.isFetched
});

export default connect(mapStateToProps)(MemberDapps);


