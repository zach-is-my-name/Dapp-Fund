import React from 'react';
import Heading from '../presentation//Heading'
import NavBar from '../presentation/NavBar.js'
import ApplyForm from '../presentation/ApplyForm'

export default function Apply() {


return (
<div>
  <Heading />
  <br />
  <NavBar />
  <br />
  <div className="apply-description">
    <h2 className="apply-h2">Post Your Dapp </h2>
    <p className="apply-text-description">Post your Dapp's info to the Board,
    where members can view it and propose it as a candidate for funding!  </p>
  </div>
  <br/>
  <ApplyForm />
</div>




)



}
