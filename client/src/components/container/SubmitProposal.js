import React from 'react';
import { Card, Button, CardImg, CardTitle, CardText, CardGroup, CardBlock, Jumbotron , FormGroup, Label, Input } from 'reactstrap';
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

export default class SubmitProposal extends React.Component {
	constructor(props) {
        super(props);
        // this.onSubmitProposal = this.onSubmitProposal.bind(this);
        this.state = {valueFunding: '', valueWhy: ''};
        this.handleChangeFunding = this.handleChangeFunding.bind(this);
        this.handleChangeWhy = this.handleChangeWhy.bind(this);
    }

    handleChangeFunding(event) {
        console.log(event.target.value)
        this.setState({valueFunding: event.target.value});
    }

    handleChangeWhy(event) {
        console.log(event.target.value)
        this.setState({valueWhy: event.target.value});
    }

    onSubmitProposal (XXX) {
        let congressContract = web3.eth.contract([{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"proposals","outputs":[{"name":"recipient","type":"address"},{"name":"amount","type":"uint256"},{"name":"description","type":"string"},{"name":"votingDeadline","type":"uint256"},{"name":"executed","type":"bool"},{"name":"proposalPassed","type":"bool"},{"name":"numberOfVotes","type":"uint256"},{"name":"currentResult","type":"int256"},{"name":"proposalHash","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"targetMember","type":"address"}],"name":"removeMember","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"proposalNumber","type":"uint256"},{"name":"transactionBytecode","type":"bytes"}],"name":"executeProposal","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"memberId","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"numProposals","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"members","outputs":[{"name":"member","type":"address"},{"name":"name","type":"string"},{"name":"memberSince","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"debatingPeriodInMinutes","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"minimumQuorum","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_value","type":"uint256"},{"name":"_token","type":"address"},{"name":"_extraData","type":"bytes"}],"name":"receiveApproval","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"majorityMargin","outputs":[{"name":"","type":"int256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"beneficiary","type":"address"},{"name":"etherAmount","type":"uint256"},{"name":"JobDescription","type":"string"},{"name":"transactionBytecode","type":"bytes"}],"name":"newProposal","outputs":[{"name":"proposalID","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"minimumQuorumForProposals","type":"uint256"},{"name":"minutesForDebate","type":"uint256"},{"name":"marginOfVotesForMajority","type":"int256"}],"name":"changeVotingRules","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"targetMember","type":"address"},{"name":"memberName","type":"string"}],"name":"addMember","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"proposalNumber","type":"uint256"},{"name":"supportsProposal","type":"bool"},{"name":"justificationText","type":"string"}],"name":"vote","outputs":[{"name":"voteID","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"proposalNumber","type":"uint256"},{"name":"beneficiary","type":"address"},{"name":"etherAmount","type":"uint256"},{"name":"transactionBytecode","type":"bytes"}],"name":"checkProposalCode","outputs":[{"name":"codeChecksOut","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"minimumQuorumForProposals","type":"uint256"},{"name":"minutesForDebate","type":"uint256"},{"name":"marginOfVotesForMajority","type":"int256"},{"name":"congressLeader","type":"address"}],"payable":true,"type":"constructor"},{"payable":true,"type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"proposalID","type":"uint256"},{"indexed":false,"name":"recipient","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"description","type":"string"}],"name":"ProposalAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"proposalID","type":"uint256"},{"indexed":false,"name":"position","type":"bool"},{"indexed":false,"name":"voter","type":"address"},{"indexed":false,"name":"justification","type":"string"}],"name":"Voted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"proposalID","type":"uint256"},{"indexed":false,"name":"result","type":"int256"},{"indexed":false,"name":"quorum","type":"uint256"},{"indexed":false,"name":"active","type":"bool"}],"name":"ProposalTallied","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"member","type":"address"},{"indexed":false,"name":"isMember","type":"bool"}],"name":"MembershipChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"minimumQuorum","type":"uint256"},{"indexed":false,"name":"debatingPeriodInMinutes","type":"uint256"},{"indexed":false,"name":"majorityMargin","type":"int256"}],"name":"ChangeOfRules","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"sender","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"receivedEther","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_from","type":"address"},{"indexed":false,"name":"_value","type":"uint256"},{"indexed":false,"name":"_token","type":"address"},{"indexed":false,"name":"_extraData","type":"bytes"}],"name":"receivedTokens","type":"event"}]).at("0xeab55b499b2a9e33e84a66dcf186b954eeb1ed4f");
        //  ^^^^ Put in store
        let proposalRecipientAddress = "0x2938f08c710790b62ab3c796135c7474a4e65e02" // will come from this.props.selectedDapp.userAddress
        let fundingAmount = this.state.valueFunding;   // will come from input
        let investmentThesis = this.state.valueWhy;   // will come from input
        let currentUserAddress = web3.eth.defaultAccount // 
        let defaultGas = 1000000 //put this in store???
        let defaultBytes = '' //put this in store???
        // SUBMIT PROPOSAL
        //      Checks to see if user is a member of the fund, if so, a proposal transaction is initiated using the user inputted data and data from "this.props.selectedDapp.userAddress"
        congressContract.memberId(currentUserAddress, function(error,result) {
            console.log('CHECKING FOR FUND MEMBERSHIP....');
            if(!error)
                if (result.c[0] !== 0) {
                    console.log('MEMBERSHIP CHECK PASSED, MEMBER ID: ', result.c[0])
                    congressContract.newProposal.sendTransaction(proposalRecipientAddress, fundingAmount, investmentThesis, defaultBytes, {from: currentUserAddress, gas: defaultGas}, function(error,result) {
                        console.log('CREATING NEW PROPOSAL');
                        if(!error) 
                            console.log('PROPOSAL CREATED! TRANSACTION: ', result)
                            // DISPATCH PROPOSAL POST ACTION HERE
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
    

        return (
            <div className="container">

                <div className="space-out" > </div>

                <div>
                    <div className="space-out" > </div>
                    <Jumbotron>
                        <h1 className="display-3">Selected Dapp</h1>
                        <img src={'http://vignette4.wikia.nocookie.net/naval-ops/images/6/61/Full_image_placeholder.jpg/revision/latest?cb=20130727194242'} width={200} height={80} mode='fit' />
                        <p className="lead">Description: A dapp that prints and manages the ThinkfulCoin cryptocurrency</p>
                        <hr className="my-2" />
                        <p>Source Code: https://github.com/johnfkneafsey/ethereum-capstone-project</p>
                        <p>Creator: Joe Turner</p>
                        <p className="lead">
                        <FormGroup>
                        <Label for="">Proposal</Label>
                        <Input type="text" value={this.state.valueFunding} onChange={this.handleChangeFunding} name="Funding" id="Funding" placeholder="Funding Amount" />
                        <Input type="text" value={this.state.valueWhy} onChange={this.handleChangeWhy} name="Why" id="Why" placeholder="Why?" />
                        </FormGroup>
                        <Button color="primary" onClick={() => this.onSubmitProposal()} >Submit</Button>
                        </p>
                    </Jumbotron>
                </div>

            </div>

        )

    }

}



    // ***NOTES as of 3.27***
        //  Congress Contract Address = 0xeab55b499b2a9e33e84a66dcf186b954eeb1ed4f
        //  John0 Address = 0x3bfa62ac5a79ba819aa2011a3acb55235b19c7f4
        //  John1 Address = 0xd98c016900dd37ec4beaf7b58152c7c63a499814
        //  John2 Address = 0x919bcad1b25bb48bef6cee752f834ce24dd580be

        // ***GENERAL COMMANDS***
            // SEND ETHER 
                // web3.eth.sendTransaction({from:"0x88bf6349f7947920789c12d38b87e4fe7c1590de", to:"0xeb7a9543c17bed74dcfe6a899853114c8e740b32", value: web3.toWei('10', 'ether')}, function(error,result) {
                //     console.log('SEND ETHER');
                //     if(!error)
                //         console.log('result: ', result)

                //     else
                //         console.error('error: ', error);
                // })

            // GET TRANSACTION
                // web3.eth.getTransaction("0x598ace1ecc9d2f36ac4672620c61981b96bd76a5a5b59df37a272b68d4b7ec70", function(error,result) {
                //     console.log('GET TRANSACTION');
                //     if(!error)
                //         console.log('result: ', result)
                //     else
                //         console.error('error: ', error);
                // })

            // GET BALANCE
                // web3.eth.getBalance("0x88bf6349f7947920789c12d38b87e4fe7c1590de", function(error,result) {
                //     console.log('GET BALANCE');
                //     if(!error)
                //         console.log('result: ', result.c[0]/1000)
                //     else
                //         console.error('error: ', error);
                // })

        // ***CONGRESS CONTRACT COMMANDS*** (Assumes contract has been deployed - https://ethereum.github.io/browser-solidity/#version=soljson-v0.4.7+commit.822622cf.js)

            // DEBATING PERIOD IN MINUTES (returns debate period integer)
                // congressContract.debatingPeriodInMinutes('', function(error,result) {
                //     console.log('DEBATING PERIOD IN MINUTES');
                //     if(!error)
                //         console.log('result: ', result.c[0])
                //     else
                //         console.error('error: ', error)
                // })

            // MAJORITY MARGIN (returns majority margin integer)
                // congressContract.majorityMargin('', function(error,result) {
                //     console.log('MAJORITY MARGIN');
                //     if(!error)
                //         console.log('result: ', result.c[0])
                //     else
                //         console.error('error: ', error)
                // })

            // MINIMUM QUORUM (returns minium quorum integer)
                // congressContract.minimumQuorum('', function(error,result) {
                //     console.log('MINIMUM QUORUM');
                //     if(!error)
                //         console.log('result: ', result.c[0])
                //     else
                //         console.error('error: ', error)
                // })

            // OWNER (returns address of contract owner)
                // congressContract.owner('', function(error,result) {
                //     console.log('OWNER');
                //     if(!error)
                //         console.log('result: ', result)
                //     else
                //         console.error('error: ', error)
                // })

            // NUMBER OF PROPOSALS (active or ever????)
                // congressContract.numProposals('', function(error,result) {
                //     console.log('NUMBER OF PROPOSALS');
                //     if(!error)
                //         console.log('result: ', result.c[0])
                //     else
                //         console.error('error: ', error)
                // })

            // MEMBER LIST (returns array with index 0 = memberAddress, index 1 = memberName)
                // Param(s): integer (member list index)
                // congressContract.members(2, function(error,result) {
                //     console.log('MEMBER LIST');
                //     if(!error)
                //         console.log('result: ', result)
                //     else
                //         console.error('error: ', error)
                // })

            // MEMBER ID (returns member Id associated with address)
                // Param(s): string (member address)
                // congressContract.memberId("0xadb61f4613a9c87b58d7ff2ebde82af2fb925e5c", function(error,result) {
                //     console.log('MEMBER ID');
                //     if(!error)
                //         console.log('result: ', result.c[0])
                //     else
                //         console.error('error: ', error)
                // })

            //  ~~~CORE CONGRESS COMMANDS~~~



            // VOTE (returns transaction hex code)
                // Param(s): string (dapp owner address), string (ether amount), string (reason for proposal), string (empty), object ({from: "accountAddress", gas:integer}) 
                // congressContract.vote(0, "true", "Love it!!!!", {from: "0x4d98323b81815ae169500dad373515adfadfe370", gas:1000000}, function(error,result) {
                //     console.log('VOTE');
                //     if(!error)
                //         console.log('result: ', result)
                //     else
                //         console.error('error: ', error)
                // })

            // EXECUTE CONTRACT (returns transaction hex code)
                // congressContract.executeProposal.sendTransaction(0, "", {from: "0xd081965ec84be43d923591896932bbe25cfe1a49", gas:1000000000000000}, function(error,result) {
                //     console.log('VOTE');
                //     if(!error)
                //         console.log('result: ', result)
                //     else
                //         console.error('error: ', error)
                // })
