import React from 'react';
import {  Form, FormGroup, Label, Input } from 'reactstrap';
import {connect} from 'react-redux'
import * as actions from '../../Actions/actions'
import { Button } from 'reactstrap';

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
    this.state = {
      username: '',
      useretheraddress: '',
      entryfeetransaction: '',
      dappname: '',
      dappdescription: '',
      dappimagelink:'',
      dappetheraddress:'',
      memberstatus:'pending',
      }
    }

    handleChange(event) {
      this.setState({[event.target.name]: event.target.value})
    }

    submit(event) {

      let applyObj = {
          username:this.state.username ,
          useretheraddress:this.state.useretheraddress,
          entryfeetransaction:this.state.entryfeetransaction,
          dappname: this.state.dappname,
          dappdescription: this.state.dappdescription,
          dappimagelink: this.state.dappimagelink,
          dappetheraddress: this.state.dappetheraddress,
          memberstatus: this.state.memberstatus,
        }
        this.props.dispatch(actions.submitApply(applyObj));       
    }

    submitPayment () {
        let congress = this.props.congressContractAddress
        let fundingAmount = this.state.valueFunding;   // will come from input
        let investmentThesis = this.state.valueWhy;   // will come from input
        let currentUserAddress = web3.eth.defaultAccount; // 
        let defaultGas = 1000000 //put this in store???
        let defaultBytes = '' //put this in store???
        let fee = this.props.entryFee.toString()

        web3.eth.sendTransaction({from: currentUserAddress, to: congress, value: web3.toWei(fee, 'ether')}, function(error,result) {
            console.log('SENDING ENTRY FEE');
            if(!error) {
                console.log('result: ', result)

            } else {
                console.error('error: ', error);
        }})
    }

  render() {
    return (
      <div className="center">
        <p className="boldText proposedDapp" >Application</p>
        <br></br>
        <Form onSubmit={this.submit}>
          <FormGroup>
            {/*<Label className="boldText" for="dapp-creator-address"> Dapp Creator Public Key</Label>*/}
            <Input type="text"  className="input-width-skinny" value={this.state.useretheraddress} name="useretheraddress" id="dappCreatorAddress"onChange={this.handleChange} placeholder="Enter your ethereum public key"  required/>
          </FormGroup>
        <FormGroup>
            {/*<Label className="boldText" for="dapp-creator"> Dapp Creator Name</Label>*/}
            <Input type="text" className="input-width-skinny" value={this.state.username} name="username" id="dappCreator"onChange={this.handleChange} placeholder="Enter your name"  required/>
          </FormGroup>
          <FormGroup>
            {/*<Label className="boldText" for="dapp-name">Dapp Name</Label>*/}
            <Input type="text"  className="input-width-skinny" value={this.state.dappname} name="dappname"  id="enterDapp"onChange={this.handleChange} placeholder="Enter the name of your dapp"  required/>
          </FormGroup>
          <FormGroup>
            {/*<Label className="boldText" for="dapp-description">Dapp Description</Label>*/}
            <Input type="text"  className="input-width" value={this.state.dappdescription} name="dappdescription" id="dappDescription"onChange={this.handleChange} placeholder="Enter a description including a link to the source code"  required/>
          </FormGroup>
          <FormGroup>
            {/*<Label className="boldText" for="dapp-image-link"> Dapp Image Link</Label>*/}
            <Input type="text"  className="input-width-skinny" value={this.state.dappimagelink} name="dappimagelink" id="dappImage"onChange={this.handleChange} placeholder="Provide URL of dapp screenshot"  required/>
          </FormGroup>

  
          {/*<FormGroup>
            <Label for="dapp-link"> Dapp Link</Label>
            <Input type="text" value={this.state.dappetheraddress} name="dappetheraddress" id="dappLink"onChange={this.handleChange} placeholder="Enter Dapp Link"  required/>
          </FormGroup>*/}
          {/*<FormGroup>
            <Label for="membership-hash"> Membership Hash</Label>
            <Input type="text"value={this.state.entryfeetransaction} name="entryfeetransaction" id="membershipHash"onChange={this.handleChange} placeholder="Enter Membership Transaction ID"  required/>
          </FormGroup>*/}

          <Button  color="gray" className="cardButton lightShadow" onClick={this.submit()}> 
              Submit Application
          </Button>

        </Form>


        <br></br>
        <br></br>        
        <p className="boldText" >Click below to pay entry fee of {this.props.entryFee} ether</p>
        <br></br>
        <Button  color="gray" className="cardButton lightShadow"  onClick={() => this.submitPayment()}> 
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


  
