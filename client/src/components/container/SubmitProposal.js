import React from 'react';
import { Alert, Button, Jumbotron , FormGroup, Label, Input, Card, CardImg, CardTitle, CardText, CardGroup, CardBlock} from 'reactstrap';
import { connect } from 'react-redux';
import * as actions from '../../Actions/actions';
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
        this.state = {
            valueFunding: '',
            valueWhy: '',
        };

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
        let currentUserAddress = web3.eth.defaultAccount  
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
                    console.log('Only organization members are permitted to submit proposals. Please see the About page for details.')
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
                <div className="space-out" > </div>
                <div>
                    <div className="space-out" > </div>
                        <h2 className="componentHeader">Submit New Proposal </h2>
                        <p className="componentHeader">Initiate an investment proposal by providing a funding amount and your rationale for investment!</p>                
                        <Card className="submitProposalContainer" >
                        <br></br>
                        <CardImg top width="60%" src={currentDapp.dappimagelink} alt="Card image cap" />
                        <CardBlock>  
                        <CardTitle><p className="boldText proposedDapp">{currentDapp.dappname}</p></CardTitle>    
                        <CardText > <p className="boldText ">Description</p></CardText>
                        <CardText >{currentDapp.dappdescription}</CardText>
                        <CardText ><p className="boldText">Creator </p></CardText>         
                        <CardText>{currentDapp.username}</CardText>   
                        <hr className="my-2" />    
                        <FormGroup>
                            <CardText ><p className="boldText">Enter Proposal </p></CardText>  
                            <Input className="input-width" type="text" value={this.state.valueFunding} onChange={this.handleChangeFunding} name="Funding" id="Funding" placeholder="Enter proposed funding amount" />
                            <Input className="input-width" type="text" value={this.state.valueWhy} onChange={this.handleChangeWhy} name="Why" id="Why" placeholder="Why should the fund invest in this dapp?" />                        
                        </FormGroup>
                        <Button color="gray" className="cardButton lightShadow" onClick={() => this.onSubmitProposal()}> 
                             <Link className="cardButton" to="/activeproposals">Submit</Link>
                        </Button>
                    </CardBlock>  
                    </Card>
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
