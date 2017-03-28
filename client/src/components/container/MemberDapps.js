import React from 'react';
import { Card, CardImg, CardTitle, CardText, CardGroup, CardBlock, } from 'reactstrap';
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
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(actions.fetchMemberDapps())
    }

    onSubmit(index) {
        // let selectedDapp = {
        //         dappdescription: dappSelected.dappdescription,
        //         dappetheraddress: dappSelected.dappetheraddress,
        //         dappimagelink: dappSelected.dappimagelink,
        //         dappname: dappSelected.dappname,
        //         entryfeetransaction: dappSelected.entryfeetransaction,
        //         id: dappSelected.id,
        //         useretheraddress: dappSelected. useretheraddress,
        //         username: dappSelected.username
        // }
        console.log('index ', index)
        let dappSelected = this.props.dappList[index]
        console.log('dapp selected using index ', dappSelected)        
       this.props.dispatch(actions.userSelectedDapp(index))
        
    }
         
    render () {
    
        let dapps = this.props.dappList.map((dapp, index) => {
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
                        {/*<Button color="primary" onClick={() => this.onSubmit(dapp)} >Submit New Proposal</Button>*/}

                        <a href="http://localhost:3000/submitproposal" onClick={() => this.onSubmit(index)}>  
                        Submit New Proposal      
                        </a>


                        <CardText></CardText>
                    </CardBlock>
                </Card>
            );
        })

        if (this.props.isFetched)
            console.log(this.props.dappList);

                return (
                    <div className="container center">
                        <div className="space-out" > </div>
                        <Heading />
                        <br />
                        <NavBar />
                        <CardGroup>
                            {dapps}
                        </CardGroup>
                        <div className="space-out" > </div>
                    </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    dappList: state.dappList,
    isFetched: state.isFetched,
    congressContract: state.congressContract
});

export default connect(mapStateToProps)(MemberDapps);


