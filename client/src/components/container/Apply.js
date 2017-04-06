import React from 'react';
import ApplyForm from '../presentation/ApplyForm'

export default function Apply() {


return (
<div className="center">
  <br />
  <div className="apply-description">
    <h2 className="apply-h2 componentHeader">Apply to DappFund </h2>
    <p className="apply-text-description componentHeader">Provide information about your dapp. Users will review this information in order to make investment proposals!</p>
  </div>
  <br/>
  <ApplyForm />
</div>




)



}
