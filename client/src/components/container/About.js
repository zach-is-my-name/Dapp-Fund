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
  <h3>What is DappFund?</h3>


  <p className="about-blurb">DappFund is a decentralized investment fund located on the Ethereum Blockchain (https://www.ethereum.org/). At its heart, DappFund is meant to be a non-profit "dapp incubator" that leverages
    the insights of the ethereum community to invest in innovative and creative dapps. Therefore, one must already be a dapp developer in order to participate in the fund. As part of the fund application, one must submit a name, 
    a description, and a link to their dapp along with their personal ethereum contact information and a membership fee. The fee is deposited in its entirety into the pool of investable
    capital for the fund. Not a single wei is taken by any principals or administrators.</p>
    <p> Upon acceptance into the fund, users have the ability to browse a catalogue of dapps created by their fellow fund investors. If a dapp catches their eye, they can raise an "investment proposal" for other members to review.  
      Raising a proposal is simple. Users must input a proposed investment amount (in ether) and a reason for their suggestion. Upon submission, proposals become viewable by the entire fund for a pre-determined "debate period".</p>

    <p>During this period,  members can either vote "yes", to support the proposal, or "no", if they disagree with the proposal. At the end of the debate period, the fund runs an internal process to 1) determine if a minimum quorum was reached 2) tally the votes and
    check for a majority 3) execute the proposal if the minimum quorum and "yes" vote majority conditions are met. The proposed funding amount is immediately debited from the fund's aggregate investment pool and sent over the blockchain to the creator of the
    dapp.</p>
    <p> DappFund harnesses the two best features of the ethereum blockchain: autonomy and decentralization, and exemplifies how they can be applied to the world of private investment.</p>

    <p>How does it work?</p>ßß
  <ul>
    <li>1. Apply for membership</li>
    <li>2. Send membership fee</li>
    <li>3. Browse dapps and make investment proposals</li>
    <li>4. Vote on active proposals</li>
  </ul>
  <Button  color="success" > 
        <Link to="/apply">Apply Now</Link>
  </Button>


</div>
  )
  }
