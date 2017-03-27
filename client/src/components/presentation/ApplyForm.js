import React from 'react';
import {  Form, FormGroup, Label, Input } from 'reactstrap';
import {connect} from 'react-redux'
import * as actions from '../../Actions/actions'

export class ApplyForm extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }


submit(event) {
let applyObj = {
    username:this.refs.dappCreator.value ,
    useretheraddress:this.refs.creatorAddress.value,
    entryfeetransaction:this.refs.membershipHash.value ,
    dappname: this.refs.dappName.value,
    dappdescription: this.refs.dappDescription.value,
    dappimagelink: this.refs.imageLink.value,
    dappetheraddress: this.refs.dappLink.value ,
    memberstatus: "pending"
  }
  console.log("APPLY OBJ", applyObj)
  console.log(event.target.name.enterDapp)
this.props.dispatch(actions.submitApply(applyObj));
  event.preventDefault();
}

  render() {
    return (
      <Form onSubmit={this.submit}>
        <FormGroup>
          <Label for="dapp-name">Dapp Name</Label>
          <Input type="text" name="enterDapp" id="enterDapp" placeholder="Enter Dapp Name"  required/>
        </FormGroup>
        <FormGroup>
          <Label for="dapp-description">Dapp Description</Label>
          <Input type="text" name="dappDescription" id="dappDescription" placeholder="Enter Dapp Description" ref="dappDescription" required/>
        </FormGroup>
        <FormGroup>
          <Label for="dapp-image-link"> Dapp Image Link</Label>
          <Input type="text" name="dappImage" id="dappImage" placeholder="Enter Dapp Image Link" ref="imageLink" required/>
        </FormGroup>
        <FormGroup>
          <Label for="dapp-link"> Dapp Link</Label>
          <Input type="text" name="dappLink" id="dappLink" placeholder="Enter Dapp Link" ref="dappLink" required/>
        </FormGroup>
        <FormGroup>
          <Label for="dapp-creator"> Dapp Creator</Label>
          <Input type="text" name="dappCreator" id="dappCreator" placeholder="Enter Dapp Creator Name" ref="dappCreator" required/>
        </FormGroup>
        <FormGroup>
          <Label for="dapp-creator-address"> Dapp Creator Public Key</Label>
          <Input type="text" name="dappCreatorAddress" id="dappCreatorAddress" placeholder="Enter Dapp Creator Public Key" ref="creatorAddress" required/>
        </FormGroup>
        <FormGroup>
          <Label for="membership-hash"> Membership Hash</Label>
          <Input type="text" name="membershipHash" id="membershipHash" placeholder="Enter Membership Transaction ID" ref="membershipHash" required/>
        </FormGroup>
        <Input type="submit" name="submit" id="apply-submit" value="Submit"/>
      </Form>
            );
            }
            }
  export default connect()(ApplyForm);
