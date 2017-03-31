import React from 'react';
import { Link } from "react-router";
import { Button} from 'reactstrap';
 export default function About() {

return (
<div>
<<<<<<< HEAD
  <Heading />
  <NavBar />
  <br/>
  <div>
    <h3> Application </h3>
    <p className="about-blurb">DappFund is a decentralized application (or Dapp) for viewing, proposing, and voting on Dapp ideas among collective members of of the Fund. Proposals include a name, idea description, amount of funding requested, and a link to a code respository. Proposals that pass an up or down vote recieve the requested funds amount denominated in Ether (virtual currency) to their associated member's public Ethereum wallet address.</p>
  </div>
  <br />
  <h4>Concept</h4>


  <p className="about-blurb">The Fund's primary mission is to serve as an incubator for new and exciting dapp ideas. It seeks to leverage the
  the Ethereum community's instrinsic knowledge as a means of targeting indivdual projects for investment.</p>
  <br />
  <br />


  <h4>Operation</h4>
  {/* <ol>
    <a href ='#download'><li>Connect to Blockchain</li></a>
    <a href="#browse'>"<li> Browse dapps and make investment proposals</li></a>
    <a href='#join'> <li> Send membership fee</li></a>
    <li> Apply for membership</li></a>
    <li>Vote on active proposals</li>
  </ol> */}
=======
    <h2>What is the Syndicate?</h2>
>>>>>>> 01fa6a9d8a36324b6cb77a1687fd1176e5701566

  <h5> <a name="download">Connect to the Blockchain</a> </h5>
  <p>This application requires an active connection to the Ethereum blockchain.</p>
  <p>The simplest way to connect to an active Fund is by installing the <a href="http://www.metamask.io">MetaMask</a> browser extension for Google Chrome</p>
  <p>Visit MetaMask's <a href="https://chrome.google.com/webstore/detail/nkbihfbeogaeaoehlefnkodbefgpgknn">Chrome Web Store page</a> to download the extension and learn more about it's role in running Ethereum applications</p>
  <p>To learn about alternative ways to connect to the Fund visit <a href="https://github.com/johnfkneafsey"> the official repo </a> </p>

<h5><a name="browse">Browse Member Dapps</a></h5>
<p>Take a moment to browse the collection of Dapps that members have already shared with the Fund.</p>
  <p>Each represents a potential funding candidate which any member can propose for funding by clicking 'Submit New Proposal'. </p>
<p>When submitting a proposal to fund the selected Dapp, you will be asked to enter the amout of Ether to be sent to the owner of the Dapp from the Fund's collective account balance if your proposal passes a vote by other members. (Note that rules governing the vote, such as minimum quorum needed, vote margin needed to pass, and time allowed for debate before proposal expires, are controlled by the Fund's Administrator. </p>

  <h5><a name="join">Join the Fund</a></h5>
  <p>Are you feeling inspired to join the Fund?  If so, great! Start by clicking the 'Apply' button below! Don't forget to obtain some Ether first... If you need Ether, you can click the MetaMask icon in your Chrome toolbar and follow the 'Buy' link which will convieniently and automatically route you to the Coinbase currency exchange site if you are using the main Ethereum Blockchain or an 'Ether Faucet' if you are currently using the Ropsten test network. </p>
    <p>Your fee will be  deposited in its entirety into the pool of investable
    capital for the fund. Not a single 'wei' (1/1,000,000,000,000,000,000 of an Ether) is taken by any principals or administrators.</p>

  <p> DappFund harnesses the two best features of the ethereum blockchain: autonomy and decentralization, and exemplifies how they can be applied to the world of private investment.</p>
  <Button  color="success" >
    <Link to="/apply">Apply Now</Link>
  </Button>

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

    <Button  color="gray" className="cardButton lightShadow" > 
          <Link className="cardButton"  to="/apply">Apply Now</Link>
    </Button>
</div>

  )
  }
