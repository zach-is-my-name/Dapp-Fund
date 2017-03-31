import React from 'react';
import { Link } from "react-router";
import { Button} from 'reactstrap';
 export default function About() {

return (
<div>
  <div className='about'>
    <h2>What is the Syndicate?</h2>


    <p className="about-blurb">The Syndicate is a decentralized investment fund located on the Ethereum Blockchain (https://www.ethereum.org/). At its heart, The Syndicate is meant to be a non-profit "dapp incubator" that leverages
      the insights of the Ethereum community to invest in innovative and creative dapps.</p>
    <p className="about-blurb">The Syndicate is a trustless, decentralized organization built by and for its members.</p>


    <h2>Why did we build it?</h2>
    <h4>The technology</h4>
    <p className="about-blurb">We cannot talk about the benefits of the Syndicate without referencing of the blockchain technology used by Ethereum. What you see on your browser is merely a styled graphical user interface of the data living in the Syndicate's contract on Ethereum's blockchain. Because the Syndicate's contract exists on Ethereum's blockchain it cannot be changed by any person and ensures that the Syndicate is governed by decentralized parameters. In other words, there is no owner, no manager, no 'trusted' third party who will skim off the top.</p>

    <h4>The benefit to users</h4>
    <p className="about-blurb">The Syndicate provides an accessible space for Ethereum develops to get honest feedback and trustless crowdfunding for their dapp ideas.</p>

    <h2>How to use</h2>
    <h4>Connect to the Ethereum's blockchain</h4>
    <p className="about-blurb">This application requires an active connection to the Ethereum blockchain. The simplest way to connect to the Syndicate is by installing the <a href="https://metamask.io/">MetaMask</a> browser extension for Google Chrome. Visit MetaMask's <a href="https://metamask.io/">Chrome Web Store</a> page to download the extension and learn more about it's role in running Ethereum applications. To learn about alternative ways to connect to the Syndicate visit <a href="https://github.com/johnfkneafsey/ethereum_Capstone">the official repo</a>.</p>

    <h4>Join the Syndicate</h4>
    <p className="about-blurb">To participate in the Syndicate, you must be a member. As part of your application to the Syndicate, you must submit a username,
      a description for your dapp, a link to your dapp, your personal Ethereum contact information, and submit a membership fee. The fee is deposited in its entirety into the pool of investable
      capital for the Syndicate. <strong>Not a single wei is taken by any principals or administrators.</strong></p>

    <h4>Member Privileges</h4>
      <p>As a member, you can raise an "investment proposal" for any members' dapp.
        Raising a proposal is simple. Users must input a proposed investment amount (in ether) and a reason for their suggestion. Upon submission, proposals become viewable by the entire Syndicate for a pre-determined "debate period".</p>

      <p>During this time, members can either vote "yes", to support the proposal, or "no", if they disagree with the proposal. At the end of the debate period, the Syndicate runs an internal process to 1) determine if a minimum quorum was reached 2) tally the votes and
      check for a majority 3) execute the proposal if the minimum quorum and "yes" vote majority conditions are met. The proposed funding amount is immediately debited from the Syndicate's aggregate investment pool and sent over the blockchain to the creator of the
      dapp.</p>
      <p> The Syndicate harnesses the two best features of the Ethereum blockchain: autonomy and decentralization, and exemplifies how they can be applied to the world of private investment.</p>
    <div className="buttonWrapper">
      <Link to="/apply"><Button  color="gray" className="buttonCenter cardButton lightShadow" >Apply Now</Button></Link>
    </div>
  </div>
</div>
  )
  }
