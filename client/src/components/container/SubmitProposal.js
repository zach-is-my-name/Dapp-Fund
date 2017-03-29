import React from 'react';
import { Button, Jumbotron , FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import * as actions from '../../Actions/actions';
import Heading from '../presentation//Heading';
import NavBar from '../presentation/NavBar';
import { Link } from "react-router";
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

export class SubmitProposal extends React.Component {
	constructor(props) {
        super(props);
        this.state = {valueFunding: '', valueWhy: ''};
        this.handleChangeFunding = this.handleChangeFunding.bind(this);
        this.handleChangeWhy = this.handleChangeWhy.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(actions.fetchMemberDapps())
    }

    // componentDidMount() {
    //     let congressContract = this.props.congressContract;
    //     let currentUserAddress = web3.eth.defaultAccount // 
    //     congressContract.memberId(currentUserAddress, function(error,result) {
    //         console.log('CHECKING FOR FUND MEMBERSHIP....');
    //         if(!error) {
    //             if (result.c[0] !== 0) {
    //                 console.log('MEMBERSHIP CHECK PASSED, MEMBER ID: ', result.c[0])
    //                 this.props.dispatch(actions.asyncConfirmUser(currentUserAddress));
    //             } else {
    //                 console.log('YOU ARE NOT A MEMBER. GET OUT!!!!')
    //             }
    //         } else {
    //             console.error('error: ', error)
    //     }})
    // }

    handleChangeFunding(event) {
        this.setState({valueFunding: event.target.value});
    }

    handleChangeWhy(event) {
        this.setState({valueWhy: event.target.value});
    }

    onSubmitProposal () {
        let index = this.props.dappSelected;
        let currentDapp = this.props.dappList[index];
        // web3 
        let congressContract = this.props.congressContract
        let proposalRecipientAddress = currentDapp.useretheraddress // will come from this.props.selectedDapp.userAddress
        let fundingAmount = this.state.valueFunding;   // will come from input
        let investmentThesis = this.state.valueWhy;   // will come from input
        let currentUserAddress = web3.eth.defaultAccount // 
        let defaultGas = 1000000 //put this in store???
        let defaultBytes = '' //put this in store???


        let proposalObj = {
            amount: fundingAmount,
            thesis: investmentThesis,
            to: proposalRecipientAddress
        }

        let self = this;
        congressContract.memberId(currentUserAddress, function(error,result) {
            console.log('CHECKING FOR FUND MEMBERSHIP....');
            if(!error) {
                if (result.c[0] !== 0) {
                    console.log('MEMBERSHIP CHECK PASSED, MEMBER ID: ', result.c[0])
                    congressContract.newProposal.sendTransaction(proposalRecipientAddress, fundingAmount, investmentThesis, defaultBytes, {from: currentUserAddress, gas: defaultGas}, function(error,result) {
                        console.log('CREATING NEW PROPOSAL');
                        if(!error) {
                           console.log('PROPOSAL CREATED! TRANSACTION: ', result)
                           console.log('POSTING PROPOSAL TO BACKEND')
                            self.props.dispatch(actions.asyncPostProposal(proposalObj))
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

    render () {
        
        let index = this.props.dappSelected;
        let currentDapp = this.props.dappList[index];

        return (
            <div className="container center">
                <Heading />
                <br />
                <NavBar />
                <div className="space-out" > </div>
                <div>
                    <div className="space-out" > </div>
                    <Jumbotron>
                        <h1 className="display-3">{currentDapp.dappname}</h1>
                        <img src={currentDapp.dappimagelink} width={200} height={80} mode='fit' alt="dapp pic" />
                        <p className="lead">{currentDapp.dappdescription}</p>
                        <hr className="my-2" />
                        <p>Source Code: https://github.com/johnfkneafsey/ethereum-capstone-project</p>
                        <p>Creator: {currentDapp.username}</p>
                        <FormGroup>
                        <Label for="">Proposal</Label>
                        <Input type="text" value={this.state.valueFunding} onChange={this.handleChangeFunding} name="Funding" id="Funding" placeholder="Funding Amount" />
                        <Input type="text" value={this.state.valueWhy} onChange={this.handleChangeWhy} name="Why" id="Why" placeholder="Why?" />
                        </FormGroup>
                        <Button  color="primary" onClick={() => this.onSubmitProposal()}> 
                             <Link to="/activeproposals">Submit</Link>
                        </Button>
                    </Jumbotron>
                </div>
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

export default connect(mapStateToProps)(SubmitProposal);





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
