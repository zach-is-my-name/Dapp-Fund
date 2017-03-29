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
        this.props.dispatch(actions.fetchProposals())
    }

     onVote (proposal, bool) {
        let congressContract = this.props.congressContract;
        let proposalId = 0; 
        let currentUserAddress = web3.eth.defaultAccount // 
        let defaultGas = 1000000 //put this in store???
        let defaultBytes = '' //put this in store???
        let vote;
        if (bool === true) {
            vote = "yes"
        } else if (bool === false) {
            vote ="no"
        }

        congressContract.memberId(currentUserAddress, function(error,result) {
            console.log('CHECKING FOR FUND MEMBERSHIP....');
            if(!error) {
                if (result.c[0] !== 0) {
                    console.log('MEMBERSHIP CHECK PASSED, MEMBER ID: ', result.c[0])
                    congressContract.vote(proposalId, bool, defaultBytes, {from: currentUserAddress, gas: defaultGas}, function(error,result) {
                        console.log('SUBMITTING YES VOTE');
                        if(!error) {
                            console.log('YES VOTE SUBMITTED! TRANSACTION: ', result)
                            this.props.dispatch(actions.asyncTallyVote(proposal, bool))
                        } else {
                            console.error('error: ', error)
                    }})
                } else {
                    console.log('YOU ARE NOT A MEMBER. GET OUT!!!!')
                }
            } else {
                console.error('error: ', error)
        }})
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
        console.log('PROPOSAL LIST', this.props.activeProposals)

        let proposals;

        if (this.props.activeProposals) {
            proposals = this.props.activeProposals.map((proposal, index) => {
                return (
                    <Card key={index} className="card-border" >
                        <CardImg top width="30%" src={proposal.dappimagelink} alt="Card image cap" />
                        <CardBlock>
                            <CardTitle>{proposal.dappname}</CardTitle>
                            <CardTitle><b>{proposal.dappdescription}</b></CardTitle>     
                            <CardTitle>Proposal</CardTitle>                   
                            <CardText><b>Why:</b> {proposal.proposaldescription}</CardText>
                            <CardText><b>Amount:</b> {proposal.proposedfunding}</CardText>  
                            <CardText><b>Source Code:</b> <a>https://github.com/johnfkneafsey/ethereum-capstone-project</a> </CardText>
                            <CardText><b>Creator:</b> {proposal.username}</CardText>
                            <Button color="primary" onClick={() => this.onVote(proposal, true)}>Yes</Button>  
                            <Button color="primary" onClick={() => this.onVote(proposal, false)}>No</Button>  
                            <Button color="primary" onClick={() => this.onExecuteProposal()} >Execute Proposal</Button>
                            <CardText>Current Vote Results:</CardText>
                            <CardText>Yes: {proposal.yesvotes} No: {proposal.novotes}</CardText>
                            <CardText>Time Remaining: {proposal.timeLeft}</CardText>
                            <CardText>Created: {proposal.datecreated}</CardText>
                            <CardText>Executed?: {proposal.executed}</CardText>
                            <CardText>ID: {proposal.id}</CardText>                                
                        </CardBlock>
                    </Card>
                );
            })
    }

        return (
            <div className="container center">
                <div className="space-out" > </div>
                <Heading />
                <br />
                <NavBar />
                <CardGroup>
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
    dappSelected: state.dappSelected,
    activeProposals: state.activeProposals
});

export default connect(mapStateToProps)(ActiveProposals);

