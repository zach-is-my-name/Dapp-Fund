import React from 'react';
import Heading from '../presentation//Heading';
import NavBar from '../presentation/NavBar';
import { Link } from "react-router";
import { Button} from 'reactstrap';
 export default function About() {

return (
<div>
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

</div>

  )
  }
