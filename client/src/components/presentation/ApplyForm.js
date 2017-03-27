import React from 'react';
import {  Form, FormGroup, Label, Input } from 'reactstrap';
import {connect} from 'react-redux'
import * as actions from '../../Actions/actions'

export class ApplyForm extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      username: '',
      useretheraddress: '',
      entryfeetransaction: '',
      dappname: '',
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
  console.log("APPLY OBJ", applyObj)
this.props.dispatch(actions.submitApply(applyObj));
  event.preventDefault();
}

  render() {
    return (
      <Form onSubmit={this.submit}>
        <FormGroup>
          <Label for="dapp-name">Dapp Name</Label>
          <Input type="text" value={this.state.dappname} name="dappname"  id="enterDapp"onChange={this.handleChange} placeholder="Enter Dapp Name"  required/>
        </FormGroup>
        <FormGroup>
          <Label for="dapp-description">Dapp Description</Label>
          <Input type="text" value={this.state.dappdescription} name="dappdescription" id="dappDescription"onChange={this.handleChange} placeholder="Enter Dapp Description"  required/>
        </FormGroup>
        <FormGroup>
          <Label for="dapp-image-link"> Dapp Image Link</Label>
          <Input type="text" value={this.state.dappimagelink} name="dappimagelink" id="dappImage"onChange={this.handleChange} placeholder="Enter Dapp Image Link"  required/>
        </FormGroup>
        <FormGroup>
          <Label for="dapp-link"> Dapp Link</Label>
          <Input type="text" value={this.state.dappetheraddress} name="dappetheraddress" id="dappLink"onChange={this.handleChange} placeholder="Enter Dapp Link"  required/>
        </FormGroup>
        <FormGroup>
          <Label for="dapp-creator"> Dapp Creator</Label>
          <Input type="text" value={this.state.username} name="username" id="dappCreator"onChange={this.handleChange} placeholder="Enter Dapp Creator Name"  required/>
        </FormGroup>
        <FormGroup>
          <Label for="dapp-creator-address"> Dapp Creator Public Key</Label>
          <Input type="text" value={this.state.useretheraddress} name="useretheraddress" id="dappCreatorAddress"onChange={this.handleChange} placeholder="Enter Dapp Creator Public Key"  required/>
        </FormGroup>
        <FormGroup>
          <Label for="membership-hash"> Membership Hash</Label>
          <Input type="text"value={this.state.entryfeetransaction} name="entryfeetransaction" id="membershipHash"onChange={this.handleChange} placeholder="Enter Membership Transaction ID"  required/>
        </FormGroup>
        <Input type="submit" name="submit" id="apply-submit" value="Submit"/>
      </Form>
            );
            }
            }
  export default connect()(ApplyForm);
