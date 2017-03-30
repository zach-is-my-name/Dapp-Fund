
import React from 'react';
import { Button, Card, CardImg, CardTitle, CardText, CardGroup, CardBlock, } from 'reactstrap';
import { connect } from 'react-redux';
import * as actions from '../../Actions/actions';
import { Link } from "react-router";

var Web3 = require('web3');
let web3 = window.web3;

window.addEventListener('load', function() {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
        // Use Mist/MetaMask's provider
        console.log('using metamask')
        console.log(window.web3);
        window.web3 = new Web3(web3.currentProvider);
    } else {
        console.log('No web3? You should consider trying MetaMask!')
        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        }
})

export class MemberDapps extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(actions.fetchMemberDapps())
    }

    // componentDidMount() {
    //     let congressContract = this.props.congressContract;
    //     let currentUserAddress = web3.eth.defaultAccount // 
    //     let self = this;
    //     congressContract.memberId(currentUserAddress, function(error,result) {
    //         console.log('CHECKING FOR FUND MEMBERSHIP....');
    //         if(!error) {
    //             if (result.c[0] !== 0) {
    //                 console.log('MEMBERSHIP CHECK PASSED, MEMBER ID: ', result.c[0])
    //                 self.props.dispatch(actions.asyncConfirmUser(currentUserAddress));
    //             } else {
    //                 console.log('YOU ARE NOT A MEMBER. GET OUT!!!!')
    //             }
    //         } else {
    //             console.error('error: ', error)
    //     }})
    // }

    onSubmit(index) {
        console.log('index ', index)
        let dappSelected = this.props.dappList[index]
        console.log('dapp selected using index ', dappSelected)        
        this.props.dispatch(actions.userSelectedDapp(index))
        
    }
         
    render () {
    
        let dapps = this.props.dappList.map((dapp, index) => {
            console.log("here is a dapp", dapp);
            return (

            <div className="memberDappsCard">
                <Card key={index}  >
                    <br></br>
                    <CardImg top width="85%" src={dapp.dappimagelink} alt="Card image cap" />
                    <CardBlock>                        
                        <CardTitle><b>{dapp.dappname}</b></CardTitle>
                        <br></br>
                        <CardText > <p className="boldText">Description:</p></CardText>
                        <CardText >{dapp.dappdescription}</CardText>
                        <CardText ><p className="boldText">Creator: </p></CardText>         
                        <CardText>{dapp.username}</CardText>                         
                        <Button  color="gray" className="cardButton lightShadow"  onClick={() => this.onSubmit(index)}>  
                             <Link className="cardButton"  to="/submitproposal">Submit New Proposal</Link>
                        </Button>
                        <CardText></CardText>
                    </CardBlock>
                </Card>
            </div>
            );
        })

        if (this.props.isFetched)
            console.log(this.props.dappList);

                return (
                    <div className="container center">
                        <div className="space-out" > </div>
                        <div className="">
                            <h2 className="">Member Dapps </h2>
                            <p className="">Browse through dapps created by fund investors.  If you like what you see, submit an investment proposal!</p>
                        </div>
                        <CardGroup>
                            {dapps}
                        </CardGroup>
                        <div className="space-out" > </div>
                    </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    dappList: state.dappList,
    isFetched: state.isFetched,
    congressContract: state.congressContract,
    activeProposals: state.activeProposals
});

export default connect(mapStateToProps)(MemberDapps);



