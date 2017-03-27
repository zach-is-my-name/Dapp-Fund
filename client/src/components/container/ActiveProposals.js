import React from 'react';
import { Card, Button, CardImg, CardTitle, CardText, CardGroup, CardBlock, Jumbotron , FormGroup, Label, Input } from 'reactstrap';
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

     onVote (proposal, bool) {
         let congressContract = web3.eth.contract([{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"proposals","outputs":[{"name":"recipient","type":"address"},{"name":"amount","type":"uint256"},{"name":"description","type":"string"},{"name":"votingDeadline","type":"uint256"},{"name":"executed","type":"bool"},{"name":"proposalPassed","type":"bool"},{"name":"numberOfVotes","type":"uint256"},{"name":"currentResult","type":"int256"},{"name":"proposalHash","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"targetMember","type":"address"}],"name":"removeMember","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"proposalNumber","type":"uint256"},{"name":"transactionBytecode","type":"bytes"}],"name":"executeProposal","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"memberId","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"numProposals","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"members","outputs":[{"name":"member","type":"address"},{"name":"name","type":"string"},{"name":"memberSince","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"debatingPeriodInMinutes","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"minimumQuorum","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_value","type":"uint256"},{"name":"_token","type":"address"},{"name":"_extraData","type":"bytes"}],"name":"receiveApproval","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"majorityMargin","outputs":[{"name":"","type":"int256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"beneficiary","type":"address"},{"name":"etherAmount","type":"uint256"},{"name":"JobDescription","type":"string"},{"name":"transactionBytecode","type":"bytes"}],"name":"newProposal","outputs":[{"name":"proposalID","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"minimumQuorumForProposals","type":"uint256"},{"name":"minutesForDebate","type":"uint256"},{"name":"marginOfVotesForMajority","type":"int256"}],"name":"changeVotingRules","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"targetMember","type":"address"},{"name":"memberName","type":"string"}],"name":"addMember","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"proposalNumber","type":"uint256"},{"name":"supportsProposal","type":"bool"},{"name":"justificationText","type":"string"}],"name":"vote","outputs":[{"name":"voteID","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"proposalNumber","type":"uint256"},{"name":"beneficiary","type":"address"},{"name":"etherAmount","type":"uint256"},{"name":"transactionBytecode","type":"bytes"}],"name":"checkProposalCode","outputs":[{"name":"codeChecksOut","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"minimumQuorumForProposals","type":"uint256"},{"name":"minutesForDebate","type":"uint256"},{"name":"marginOfVotesForMajority","type":"int256"},{"name":"congressLeader","type":"address"}],"payable":true,"type":"constructor"},{"payable":true,"type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"proposalID","type":"uint256"},{"indexed":false,"name":"recipient","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"description","type":"string"}],"name":"ProposalAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"proposalID","type":"uint256"},{"indexed":false,"name":"position","type":"bool"},{"indexed":false,"name":"voter","type":"address"},{"indexed":false,"name":"justification","type":"string"}],"name":"Voted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"proposalID","type":"uint256"},{"indexed":false,"name":"result","type":"int256"},{"indexed":false,"name":"quorum","type":"uint256"},{"indexed":false,"name":"active","type":"bool"}],"name":"ProposalTallied","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"member","type":"address"},{"indexed":false,"name":"isMember","type":"bool"}],"name":"MembershipChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"minimumQuorum","type":"uint256"},{"indexed":false,"name":"debatingPeriodInMinutes","type":"uint256"},{"indexed":false,"name":"majorityMargin","type":"int256"}],"name":"ChangeOfRules","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"sender","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"receivedEther","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_from","type":"address"},{"indexed":false,"name":"_value","type":"uint256"},{"indexed":false,"name":"_token","type":"address"},{"indexed":false,"name":"_extraData","type":"bytes"}],"name":"receivedTokens","type":"event"}]).at("0xeab55b499b2a9e33e84a66dcf186b954eeb1ed4f");
        //  ^^^^ Put in store
        let proposalId = 0; 
        console.log(bool);
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
        let congressContract = web3.eth.contract([{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"proposals","outputs":[{"name":"recipient","type":"address"},{"name":"amount","type":"uint256"},{"name":"description","type":"string"},{"name":"votingDeadline","type":"uint256"},{"name":"executed","type":"bool"},{"name":"proposalPassed","type":"bool"},{"name":"numberOfVotes","type":"uint256"},{"name":"currentResult","type":"int256"},{"name":"proposalHash","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"targetMember","type":"address"}],"name":"removeMember","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"proposalNumber","type":"uint256"},{"name":"transactionBytecode","type":"bytes"}],"name":"executeProposal","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"memberId","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"numProposals","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"members","outputs":[{"name":"member","type":"address"},{"name":"name","type":"string"},{"name":"memberSince","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"debatingPeriodInMinutes","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"minimumQuorum","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_value","type":"uint256"},{"name":"_token","type":"address"},{"name":"_extraData","type":"bytes"}],"name":"receiveApproval","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"majorityMargin","outputs":[{"name":"","type":"int256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"beneficiary","type":"address"},{"name":"etherAmount","type":"uint256"},{"name":"JobDescription","type":"string"},{"name":"transactionBytecode","type":"bytes"}],"name":"newProposal","outputs":[{"name":"proposalID","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"minimumQuorumForProposals","type":"uint256"},{"name":"minutesForDebate","type":"uint256"},{"name":"marginOfVotesForMajority","type":"int256"}],"name":"changeVotingRules","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"targetMember","type":"address"},{"name":"memberName","type":"string"}],"name":"addMember","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"proposalNumber","type":"uint256"},{"name":"supportsProposal","type":"bool"},{"name":"justificationText","type":"string"}],"name":"vote","outputs":[{"name":"voteID","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"proposalNumber","type":"uint256"},{"name":"beneficiary","type":"address"},{"name":"etherAmount","type":"uint256"},{"name":"transactionBytecode","type":"bytes"}],"name":"checkProposalCode","outputs":[{"name":"codeChecksOut","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"minimumQuorumForProposals","type":"uint256"},{"name":"minutesForDebate","type":"uint256"},{"name":"marginOfVotesForMajority","type":"int256"},{"name":"congressLeader","type":"address"}],"payable":true,"type":"constructor"},{"payable":true,"type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"proposalID","type":"uint256"},{"indexed":false,"name":"recipient","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"description","type":"string"}],"name":"ProposalAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"proposalID","type":"uint256"},{"indexed":false,"name":"position","type":"bool"},{"indexed":false,"name":"voter","type":"address"},{"indexed":false,"name":"justification","type":"string"}],"name":"Voted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"proposalID","type":"uint256"},{"indexed":false,"name":"result","type":"int256"},{"indexed":false,"name":"quorum","type":"uint256"},{"indexed":false,"name":"active","type":"bool"}],"name":"ProposalTallied","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"member","type":"address"},{"indexed":false,"name":"isMember","type":"bool"}],"name":"MembershipChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"minimumQuorum","type":"uint256"},{"indexed":false,"name":"debatingPeriodInMinutes","type":"uint256"},{"indexed":false,"name":"majorityMargin","type":"int256"}],"name":"ChangeOfRules","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"sender","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"receivedEther","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_from","type":"address"},{"indexed":false,"name":"_value","type":"uint256"},{"indexed":false,"name":"_token","type":"address"},{"indexed":false,"name":"_extraData","type":"bytes"}],"name":"receivedTokens","type":"event"}]).at("0xeab55b499b2a9e33e84a66dcf186b954eeb1ed4f");
        //  ^^^^ Put in store
        let proposalId = 0; 
        let currentUserAddress = web3.eth.defaultAccount // 
        let defaultGas = 3000000 //put this in store???
        let defaultBytes = "" //put this in store???
        let congressAddress = "0xeab55b499b2a9e33e84a66dcf186b954eeb1ed4f"

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
            <div className="container">

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
    dappDescriptionArr: state.DappDescription,
    isFetched: state.isFetched
});

export default connect(mapStateToProps)(ActiveProposals);

