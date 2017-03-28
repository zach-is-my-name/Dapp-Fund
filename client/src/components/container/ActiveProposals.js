import React from 'react';
import { Card, Button, CardImg, CardTitle, CardText, CardGroup, CardBlock} from 'reactstrap';
import Heading from '../presentation//Heading'
import NavBar from '../presentation/NavBar.js'
import { connect } from 'react-redux';
import * as actions from '../../Actions/actions';

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

export class ActiveProposals extends React.Component {
	constructor(props) {
        super(props);
        this.state = {valueFunding: '', valueWhy: ''};
    }

    componentWillMount() {
        this.props.dispatch(actions.fetchMemberDapps())
    }

     onVote (proposal, bool) {
        let congressContract = this.props.congressContract;
        let proposalId = 0; 
        let currentUserAddress = web3.eth.defaultAccount // 
        let defaultGas = 1000000 //put this in store???
        let defaultBytes = '' //put this in store???

        congressContract.memberId(currentUserAddress, function(error,result) {
            console.log('CHECKING FOR FUND MEMBERSHIP....');
            if(!error)
                if (result.c[0] !== 0) {
                    console.log('MEMBERSHIP CHECK PASSED, MEMBER ID: ', result.c[0])
                    congressContract.vote(proposalId, bool, defaultBytes, {from: currentUserAddress, gas: defaultGas}, function(error,result) {
                        console.log('SUBMITTING YES VOTE');
                        if(!error)
                            console.log('YES VOTE SUBMITTED! TRANSACTION: ', result)
                            // DISPATCH INCREMENT YES VOTE ACTION HERE
                        else
                            console.error('error: ', error)
                    })
                } else {
                    console.log('YOU ARE NOT A MEMBER. GET OUT!!!!')
                }
            else
                console.error('error: ', error)
        })
    }

    onExecuteProposal() {
        let congressContract = this.props.congressContract
        let proposalId = 0; 
        let currentUserAddress = web3.eth.defaultAccount // 
        let defaultGas = 3000000 //put this in store???
        let defaultBytes = "" //put this in store???

        congressContract.memberId(currentUserAddress, function(error,result) {
            console.log('CHECKING FOR FUND MEMBERSHIP....');
            if(!error)
                if (result.c[0] !== 0) {
                    console.log('MEMBERSHIP CHECK PASSED, MEMBER ID: ', result.c[0])
                    congressContract.executeProposal.sendTransaction(proposalId, defaultBytes, {from: currentUserAddress, gas: defaultGas}, function(error,result) {
                    console.log('execute proposal');
                        if(!error)
                        console.log('result: ', result)
                        else 
                        console.error('error: ', error)
                })
                } else {
                    console.log('YOU ARE NOT A MEMBER. GET OUT!!!!')
                }
            else
                console.error('error: ', error)
        })
    }

    render () {
    
        console.log('MEMBER DAPPS ', this.props.dappList);
        console.log('DAPP SELECTED ', this.props.dappSelected);


        let proposalObjTEST =         
            [
                {
                id: 0,
                username: "UserName0",
                useretheraddress: "x000001",
                entryfeetransaction: "x000001d",
                dappname: "dank Dapp 1",
                dappdescription: "description 1",
                dappimagelink: "link 1",
                dappetheraddress: "addy 1",
                },
                {
                id: 1,
                username: "UserName1",
                useretheraddress: "x000001",
                entryfeetransaction: "x000001d",
                dappname: "dank Dapp 1",
                dappdescription: "description 1",
                dappimagelink: "link 1",
                dappetheraddress: "addy 1",
                },
                {
                id: 2,
                username: "UserName2",
                useretheraddress: "x000001",
                entryfeetransaction: "x000001d",
                dappname: "dank Dapp 1",
                dappdescription: "description 1",
                dappimagelink: "link 1",
                dappetheraddress: "addy 1",
                },
                {
                id: 3,
                username: "UserName3",
                useretheraddress: "x000001",
                entryfeetransaction: "x000001d",
                dappname: "dank Dapp 1",
                dappdescription: "description 1",
                dappimagelink: "link 1",
                dappetheraddress: "addy 1",
                }
            ]



        let proposals = proposalObjTEST.map((proposal, index) => {
			return (
                    <Card key={index} className="card-border" >
                        <CardImg top width="30%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=256%C3%97180&w=256&h=180" alt="Card image cap" />
                        <CardBlock>
                            <CardTitle>Active Proposals Vote TEST</CardTitle>
                            <CardTitle><b>ThinkfulCoin Central Bank</b></CardTitle>                        
                            <CardText><b>Description:</b> A dapp that prints and manages the ThinkfulCoin cryptocurrency</CardText>
                            <CardText><b>Source Code:</b> <a>https://github.com/johnfkneafsey/ethereum-capstone-project</a> </CardText>
                            <CardText><b>Creator:</b> Joe Turner</CardText>
                            <Button color="primary" onClick={() => this.onVote({proposalObjTEST}, true)}>Yes</Button>  
                            <Button color="primary" onClick={() => this.onVote({proposalObjTEST}, false)}>No</Button>  
                            <Button color="primary" onClick={() => this.onExecuteProposal()} >Execute Proposal</Button>
                            <CardText>Current Vote Results: XYZ</CardText>
                            <CardText>Time Remaining: XYZ</CardText>
                        </CardBlock>
                    </Card>
			);
		})


        return (
            <div className="container center">

                <div className="space-out" > </div>
                <Heading />
                <br />
                <NavBar />
                <CardGroup>
                    <h3>ACTIVE PROPOSALS VIEW</h3>
                    {proposals}
                </CardGroup>

                <div className="space-out" > </div>

            </div>
        )
    }
}


const mapStateToProps = (state, props) => ({
    dappList: state.dappList,
    isFetched: state.isFetched,
    congressContract: state.congressContract,
    dappSelected: state.dappSelected
});

export default connect(mapStateToProps)(ActiveProposals);

