import React from 'react';
import {Alert, Form, FormGroup, Label, Input} from 'reactstrap';
import {connect} from 'react-redux'
import * as actions from '../../Actions/actions'
import {Button} from 'reactstrap';

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

export class ApplyForm extends React.Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submitPayment = this.submitPayment.bind(this);
        this.successDismiss = this.successDismiss.bind(this);
        this.errorDismiss = this.errorDismiss.bind(this);
        this.state = {
            username: '',
            useretheraddress: '',
            entryfeetransaction: '',
            dappname: '',
            dappdescription: '',
            dappimagelink: '',
            dappetheraddress: '',
            memberstatus: 'pending',
            paid: false,
            successVisible: false,
            errorVisible: false
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submit() {
        let applyObj = {
            username: this.state.username,
            useretheraddress: this.state.useretheraddress,
            entryfeetransaction: this.state.entryfeetransaction,
            dappname: this.state.dappname,
            dappdescription: this.state.dappdescription,
            dappimagelink: this.state.dappimagelink,
            dappetheraddress: this.state.dappetheraddress,
            memberstatus: this.state.memberstatus
        }
        this.props.dispatch(actions.submitApply(applyObj));
    }

    submitPayment() {
        if (typeof web3 !== 'undefined') {
            console.log("congrats, you have MetaMask");
            let self = this;
            let congressContract = this.props.congressContract;
            let congress = this.props.congressContractAddress;
            let fundingAmount = this.state.valueFunding; // will come from input
            let investmentThesis = this.state.valueWhy; // will come from input
            let currentUserAddress = web3.eth.defaultAccount; //
            let defaultGas = 1000000 //put this in store???
            let defaultBytes = '' //put this in store???
            let fee = this.props.entryFee.toString()

            web3.eth.sendTransaction({
                from: currentUserAddress,
                to: congress,
                value: web3.toWei(fee, 'ether')
            }, function(error, result) {
                // console.log('SENDING ENTRY FEE');
                if (!error) {
                    // console.log('result: ', result)
                    web3.eth.getTransactionReceipt(result, function(error, result) {
                        if (!error) {
                            // console.log("Transaction Block #:", result.blockNumber)
                            // console.log(this);
                            result.blockNumber > 0
                                ? self.setState({paid: true, successVisible: true})
                                : null;
                            congressContract.addMember.sendTransaction(currentUserAddress, self.state.username, defaultBytes, {
                                from: currentUserAddress,
                                gas: defaultGas
                            }, function(error, result) {
                                //Add alert to tell user to 'confirm membership by clicking 'accept''
                                // console.log("ADDING MEMBER");
                                if (!error) {
                                    self.props.dispatch(actions.asyncConfirmUser(currentUserAddress));
                                    // Add alert to tell user they have been added to the fund
                                    // console.log("MEMBER ADDED!", result)
                                } else {
                                    console.error('error', error)
                                }

                            })
                        } else {
                            console.error(error)
                        }
                    })

                } else {
                    console.error('error: ', error);
                }
            })
        } else {
            console.log("sorry, you do not have MetaMask to send payment")
            this.setState({errorVisible: true});
        }
    }

    successDismiss() {
        this.setState({ successVisible: false });
    }

    errorDismiss() {
        this.setState({ errorVisible: false });
    }

    render() {
        return (
            <div className="center">
                <p className="boldText proposedDapp">Application</p>
                <br></br>
                {/* <div className="container center"> */}
                <Alert className= {this.state.successVisible === false ? "hidden" : "show"} color="danger" toggle={this.successDismiss}>
                    You have paid 2 Ether to the Fund.
                </Alert>
                <Alert className= {this.state.errorVisible === false ? "hidden" : "show"} color="danger" toggle={this.errorDismiss}>
                    Please install Chrome Extension MetaMask to submit payment to the DAS.
                </Alert>
                {/* </div> */}

                {/*<Label className="boldText" for="dapp-creator-address"> Dapp Creator Public Key</Label>*/}
                <Input type="text" className="input-width-skinny" value={this.state.useretheraddress} name="useretheraddress" id="dappCreatorAddress" onChange={this.handleChange} placeholder="Enter your ethereum public key" required/> {/*<Label className="boldText" for="dapp-creator"> Dapp Creator Name</Label>*/}
                <Input type="text" className="input-width-skinny" value={this.state.username} name="username" id="dappCreator" onChange={this.handleChange} placeholder="Enter your name" required/> {/*<Label className="boldText" for="dapp-name">Dapp Name</Label>*/}
                <Input type="text" className="input-width-skinny" value={this.state.dappname} name="dappname" id="enterDapp" onChange={this.handleChange} placeholder="Enter the name of your dapp" required/> {/*<Label className="boldText" for="dapp-description">Dapp Description</Label>*/}
                <Input type="text" className="input-width" value={this.state.dappdescription} name="dappdescription" id="dappDescription" onChange={this.handleChange} placeholder="Enter a description including a link to the source code" required/> {/*<Label className="boldText" for="dapp-image-link"> Dapp Image Link</Label>*/}
                <Input type="text" className="input-width-skinny" value={this.state.dappimagelink} name="dappimagelink" id="dappImage" onChange={this.handleChange} placeholder="Provide URL of dapp screenshot" required/> {/*<FormGroup>
                    <Label for="dapp-link"> Dapp Link</Label>
                    <Input type="text" value={this.state.dappetheraddress} name="dappetheraddress" id="dappLink"onChange={this.handleChange} placeholder="Enter Dapp Link"  required/>
                </FormGroup>*/}
                {/*<FormGroup>
                    <Label for="membership-hash"> Membership Hash</Label>
                    <Input type="text"value={this.state.entryfeetransaction} name="entryfeetransaction" id="membershipHash"onChange={this.handleChange} placeholder="Enter Membership Transaction ID"  required/>
                </FormGroup>*/}
                <br></br>
                <Button color="gray" className="cardButton lightShadow" onClick={() => this.submit()}>
                    Submit Application
                </Button>

                <br></br>
                <br></br>
                <p className="boldText">Click below to pay entry fee of {this.props.entryFee}
                    ether</p>
                <br></br>
                <Button color="gray" className="cardButton lightShadow" onClick={() => this.submitPayment()}>
                    Initiate Entry Fee Transaction
                </Button>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => ({
    dappList: state.dappList,
    isFetched: state.isFetched,
    congressContract: state.congressContract,
    dappSelected: state.dappSelected,
    activeProposals: state.activeProposals,
    congressContractAddress: state.congressContractAddress,
    entryFee: state.entryFee
});

export default connect(mapStateToProps)(ApplyForm);
