import React from 'react';
import { Alert, Card, Button, CardImg, CardTitle, CardText, CardGroup, CardBlock} from 'reactstrap';
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
        this.state = {
            valueFunding: '',
            valueWhy: '',
            visible: false
        };

        this.onDismiss = this.onDismiss.bind(this);

    }

    componentWillMount() {
        this.props.dispatch(actions.fetchMemberDapps())
        this.props.dispatch(actions.fetchProposals())
    }

    // componentDidMount() {
    //     let congressContract = this.props.congressContract;
    //     let currentUserAddress = web3.eth.defaultAccount // 
    //     let self = this;
    //     congressContract.memberId(currentUserAddress, function(error,result) {
    //         console.log('CHECKING FOR FUND MEMBERSHIP....');
    //         if(!error) {
    //             if (result.c[0] !== 0) {
    //                 alert('YOU ARE A MEMBER')
    //                 console.log('MEMBERSHIP CHECK PASSED, MEMBER ID: ', result.c[0])
    //             } else {
    //                 alert('YOU ARE NOT A MEMBER')
    //                 console.log('YOU ARE NOT A MEMBER. GET OUT!!!!')
    //             }
    //         } else {
    //             console.error('error: ', error)
    //     }})
    // }

    // componentDidMount() {
    //     let congressContractAddress = this.props.congressContractAddress
    //     congressContract.checkBalance(congressContractAddress, function(error,result) {
    //     console.log('check balance');
    //         if(!error) {
    //             console.log('result: ', result)
    //             console.log('updating proposal status on back end')
    //             //replace
    //             let balance = 1;
    //             this.props.dispatch(actions.updateFundBalance(balance))
    //         } else {
    //             console.error('error: ', error)
    //     }})
    // }

     onVote (proposal, bool) {
        let congressContract = this.props.congressContract;
        let proposalId = proposal.id - 3; 
        let currentUserAddress = web3.eth.defaultAccount // 
        let defaultGas = 1000000 //put this in store???
        let defaultBytes = '' //put this in store???
        let vote;
        if (bool === true) {
            vote = "yes"
        } else if (bool === false) {
            vote ="no"
        }
        let self = this;

        console.log('proposal id vote', proposalId);

        congressContract.memberId(currentUserAddress, function(error,result) {
            console.log('CHECKING FOR FUND MEMBERSHIP....');
            if(!error) {
                if (result.c[0] !== 0) {
                    console.log('MEMBERSHIP CHECK PASSED, MEMBER ID: ', result.c[0])
                    congressContract.vote(proposalId, bool, defaultBytes, {from: currentUserAddress, gas: defaultGas}, function(error,result) {
                        console.log('SUBMITTING YES VOTE');
                        if(!error) {
                            console.log('YES VOTE SUBMITTED! TRANSACTION: ', result)
                            self.props.dispatch(actions.asyncTallyVote(proposal, vote))
                        } else {
                            console.error('error: ', error)
                    }})
                } else {
                    console.log('Only organization members are permitted to submit proposals. Please see the About page for details.');
                    self.setState({visible: true})
                }
            } else {
                console.error('error: ', error)
        }})
    }

    onExecuteProposal(proposal) {
        let congressContract = this.props.congressContract
        let congressContractAddress = this.props.congressContractAddress
        let proposalId = proposal.id - 3; 
        let currentUserAddress = web3.eth.defaultAccount // 
        let defaultGas = 3000000 //put this in store???
        let defaultBytes = "" //put this in store???
        let self = this;

        console.log('proposal id execute', proposalId);

        congressContract.memberId(currentUserAddress, function(error,result) {
            console.log('CHECKING FOR FUND MEMBERSHIP....');
            if(!error) {
                if (result.c[0] !== 0) {
                    console.log('MEMBERSHIP CHECK PASSED, MEMBER ID: ', result.c[0])
                    congressContract.executeProposal(proposalId, defaultBytes, {from: currentUserAddress, gas: defaultGas}, function(error,result) {
                        console.log('execute proposal');
                        if(!error) {
                            console.log('result: ', result)
                            console.log('updating proposal status on back end')
                            let backEndProposalId = proposal.id;
                            self.props.dispatch(actions.asyncExecuteProposal(backEndProposalId));
                        } else {
                            console.error('error: ', error)
                }})
                } else {
                    console.log('Only organization members are permitted to submit proposals. Please see the About page for details.');
                }
             } else {
                console.error('error: ', error)
        }})
    }

    onDismiss() {
        this.setState({ visible: false });  
    }

    render () {



        let proposals;
        if (this.props.activeProposals) {
            proposals = this.props.activeProposals.map((proposal, index) => {
                return (
                    <div className="activeProposalsCard" >
                        <Card key={index} className="activeProposalsCard" >     
                            <br></br>                                          
                            <CardImg top width="85%" src={proposal.dappimagelink} alt="Card image cap" />
                            <CardBlock className="fitContainer" >
                                <CardTitle><b> {proposal.dappname}</b></CardTitle>
                                <CardText className="scroll"><b><u>Description:</u></b> {proposal.dappdescription}</CardText>    
                                <CardText><b><u>Creator:</u></b> {proposal.username}</CardText> 
                                <hr className="my-2" /> 
                                <CardText ><p className="boldText">Proposal</p></CardText>                
                                <CardText className="scroll"><b><u>Reason:</u></b> {proposal.proposaldescription}</CardText>
                                <CardText><b><u>Amount:</u></b> {proposal.proposedfunding} ether</CardText>
                                <hr className="my-2" />                                   
                                <CardText ><p className="boldText">Current Results</p></CardText>  
                                <CardText><b>Yes</b>: {proposal.yesvotes} <b>No:</b> {proposal.novotes}</CardText>
                                <CardText>{proposal.timeLeft}</CardText>   
                                <hr className="my-2" />                                     
                                <CardText ><p className="boldText">Vote </p></CardText> 
                                <Button color="success" size="lg" className="voteButton" onClick={() => this.onVote(proposal, true)}>Yes</Button>  
                                <Button color="danger" size="lg" className="voteButton" onClick={() => this.onVote(proposal, false)}>No</Button>    
                            </CardBlock>                                            

                        </Card>
                    </div>
                );
            })
    }

        return (
            <div>
                <Alert className = {this.state.visible === false ? "hidden" : "show"} color="danger" toggle={this.onDismiss}>
                    Only organization members are permitted to vote on active proposals. Please see the About page for details.
                </Alert>


                <div className="container center">
                    <div className="space-out" > </div>
                    <div className="">
                        <h2 className="componentHeader">Active Proposals </h2>
                        <p className="componentHeader">Browse and vote for investment proposals raised by fund investors!</p>
                        <br></br>
                        <div className="bold">
                            <h5 className="componentHeader">Current Fund Balance:</h5>
                            <p className="componentHeader">{this.props.fundBalance} Ether</p>
                        </div>
                    </div>
                    <CardGroup>
                        {proposals}
                    </CardGroup>
                    <div className="space-out" > </div>
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
    activeProposals: state.activeProposals,
    congressContractAddress: state.congressContractAddress,
    fundBalance: state.fundBalance
});

export default connect(mapStateToProps)(ActiveProposals);

