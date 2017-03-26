import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import * as actions from '../../Actions/actions'
export default class ApplyForm extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }


sumbit(event) {
let applyObj = {
    username:this.refs.dappCreator.value ,
    useretheraddress:this.refs.creatorAddress.value,
    entryfeetransaction:this.membershipHash.value ,
    dappname: this.refs.dappName.value,
    dappdescription: this.refs.dappDescription.value,
    dappimagelink: this.refs.imageLink.value,
    dappetheraddress: this.refs.dappLink.value ,
    memberstatus: "pending"
  }
this.props.dispatch(actions.submitApply(applyObj));
  event.preventDefault();
}

  render() {
    return (
      <Form onSubmit={this.submit}>
        <FormGroup>
          <Label for="dapp-name">Dapp Name</Label>
          <Input type="" name="enterDapp" id="enterDapp" placeholder="Enter Dapp Name" ref="dappName" required/>
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
        <Button type="submit" name="submit" id="apply-submit" />
      </Form>
            );
            }
            }
