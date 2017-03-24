import React from 'react';
import Heading from '../presentation//Heading';
import NavBar from '../presentation/NavBar';


 export default function About() {

return (
<div>
  <Heading />
  <NavBar />
  <br/>
  <p className="about-blurb">DappFund is a decentralized application (or Dapp) for viewing, proposing, and voting on Dapp ideas among collective members of
    of the Fund. Proposals include a name, idea description, amount of funding requested, and a link to a code respository.
    Proposals that pass an up or down vote recieve the requested funds amount denominated in Ether (virtual currency) to their associated
  member's public Ethereum wallet address.</p>
</div>
  )
  }
