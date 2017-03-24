import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default class ApplyForm extends React.Component {
  render() {
    return (
      <Form>
        <FormGroup>
          <Label for="dapp-name">Dapp Name</Label>
          <Input type="" name="enterDapp" id="enterDapp" placeholder="Enter Dapp Name" />
        </FormGroup>
        <FormGroup>
          <Label for="dapp-description">Dapp Description</Label>
          <Input type="dappDescription" name="dappDescription" id="dappDescription" placeholder="Enter Dapp Description" />
        </FormGroup>
        <FormGroup>
          <Label for="dapp-image-link"> Dapp Image Link</Label>
          <Input type="dapp-image-link" name="dappImage" id="dappImage" placeholder="Enter Dapp Image Link" />
        </FormGroup>
        <FormGroup>
          <Label for="dapp-link"> Dapp Link</Label>
          <Input type="dapp-link" name="dappLink" id="dappLink" placeholder="Enter Dapp Link" />
        </FormGroup>
        <FormGroup>
          <Label for="dapp-creator"> Dapp Creator</Label>
          <Input type="dapp-creator" name="dappCreator" id="dappCreator" placeholder="Enter Dapp Creator Name" />
        </FormGroup>
        <FormGroup>
          <Label for="dapp-creator-address"> Dapp Creator Public Key</Label>
          <Input type="dapp-creator-address" name="dappCreatorAddress" id="dappCreatorAddress" placeholder="Enter Dapp Creator Public Key" />
        </FormGroup>
        <Input type="submit" name="submit" id="apply-submit" />
      </Form>
            );
            }
            }
