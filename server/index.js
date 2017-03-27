const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const app = express();


// Serve the built client
// app.use(express.static(path.resolve(__dirname, '../client/build')));

// // Unhandled requests which aren't for the API should serve index.html so
// // client-side routing using browserHistory can function
// app.get(/^(?!\/api(\/|$))/, (req, res) => {
//     const index = path.resolve(__dirname, '../client/build', 'index.html');
//     res.sendFile(index);
// });
const knex = require('knex')({
    client: 'pg',
    connection: {
        host:'stampy.db.elephantsql.com',
        port:5432,
        ssl:true,
        user: 'nyfibjdb',
        password:'rfdZ6HnpaOAP8bKSqzxgN33hx1Z4jP2O',
        database:'nyfibjdb',
        url: 'postgres://nyfibjdb:rfdZ6HnpaOAP8bKSqzxgN33hx1Z4jP2O@stampy.db.elephantsql.com:5432/nyfibjdb',
    },
});

//Source code

// User submitting application
app.post('/users', jsonParser, (req, res) => {
    let userName = req.body.userName;
    let etherAddress = req.body.etherAddress;
    let confirmedEtherFeeTransactionAddress = req.body.confirmedEtherFeeTransactionAddress;
    let dappName = req.body.dappName;
    let dappDescription = req.body.dappDescription;
    let dappImageLink = req.body.dappImageLink;
    let dappEtherAddress = req.body.dappEtherAddress;
    let status = "pending";
    // Now use create Knex function to create user in DB
    knex.insert({
        username: userName,
        useretheraddress: etherAddress,
        entryfeetransaction: confirmedEtherFeeTransactionAddress,
        dappname: dappName,
        dappdescription: dappDescription,
        dappimagelink: dappImageLink,
        dappetheraddress: dappEtherAddress,
        memberstatus: status
    }).into('users').then(user => {
        console.log("user created: ", user);
        res.status(201).json(user);
    })
    
})
// TO get list of Dapps for frontend and their details
app.get('/users', (req, res) => {
    knex.select('id', 'username', 'useretheraddress', 'entryfeetransaction', 'dappname', 'dappdescription', 'dappimagelink', 'dappetheraddress')
    .from('users')
    .where({memberstatus: 'confirmed'})
    .orderBy('id')
    .then(users => {
        res.status("200").json(users);
    })    
})
// Owner approving a user
app.put('/users/:userID', jsonParser, (req, res) => {
  let userID = parseInt(req.params.userID);
  console.log("userID", userID);
  knex('users')
    .update({ memberstatus: "confirmed" })
    .where({id: userID})
    .then(user => {
      console.log("updated user: ", user);
      res.status(201).json(user);
    })
})
// User submitting proposal
app.post('/proposals', jsonParser, (req, res) => {
    let userName = req.body.userName;
    let proposalDescription = req.body.proposalDescription;
    let proposedFunding = req.body.proposedFunding;
    let yesVotes = 0;
    let noVotes = 0;
    let dateCreated = new Date();
    knex.select('id')
      .from('users')
      .where({username: userName})
      .then(user => {
        console.log('is this correct user id?', user[0].id);
        let userID = user[0].id;
        knex.insert({
          user_id: userID,
          proposaldescription: proposalDescription,
          proposedfunding: proposedFunding,
          yesvotes: yesVotes,
          novotes: noVotes,
          datecreated: dateCreated
        })
        .into('proposals')
        .then(proposal => {
          console.log("new proposal", proposal);
          res.status(201).json(proposal);
        })
      })
})
// To list of proposed Dapps
app.get('/proposals', (req, res) => {
  function timeRemaining(inputDate) {
    console.log("inputDate", inputDate);
    let year = inputDate.slice(11,15);
    let month = (inputDate.slice(4,7));
    if (month === "Jan") {
      month = 0;
    } else if (month === "Feb") {
      month = 1;
    } else if (month === "Mar") {
      month = 2;
    } else if (month === "Apr") {
      month = 3;
    } else if (month === "May") {
      month = 4;
    } else if (month === "Jun") {
      month = 5;
    } else if (month === "Jul") {
      month = 6;
    } else if (month === "Aug") {
      month = 7;
    } else if (month === "Sep") {
      month = 8;
    } else if (month === "Oct") {
      month = 9;
    } else if (month === "Nov") {
      month = 10;
    } else if (month === "Dec") {
      month = 11;
    }
    let day = inputDate.slice(8,10);
    let hour = inputDate.slice(16,18);
    let minute = inputDate.slice(19,21);
    let d = new Date(year, month, day, hour, minute, 00);
    let currentDate = new Date();
    let diff = new Date(currentDate.getTime() - d.getTime());
    let years = diff.getUTCFullYear() - 1970; // Gives difference as year
    let months = diff.getUTCMonth(); // Gives month count of difference
    let days = diff.getUTCDate()-1; // Gives day count of difference
    let hours = diff.getUTCHours(); // Gives hour count of difference
    let minutes = diff.getUTCMinutes(); // Gives minute count of difference
    let remainingDays = 4 - days;
    let remainingHours = 23 - hours;
    let remainingMinutes = 60 - minutes;
  let remainingTime;
    if (remainingDays > 0 || remainingHours > 0 || remainingMinutes > 0) {
      remainingTime = [remainingDays, remainingHours, remainingMinutes];
    } else {
      remainingTime = 'Expired';
    }
    
    return remainingTime;
  }
    knex.select(['proposals.id', 'proposals.proposaldescription', 'proposals.proposedfunding', 'proposals.yesvotes', 'proposals.novotes', 'proposals.datecreated', 'proposals.executed', 'users.username', 'users.dappname', 'users.dappdescription', 'users.dappimagelink'])
    .from('users')
    .join('proposals', 'proposals.user_id', 'users.id')
    .then(proposals => {
      console.log("proposal list: ", proposals);
      let updatedProposals = proposals.map(proposal => {
        console.log("proposal.datecreated", proposal.datecreated);
        let o = Object.assign({}, proposal);
        let timeLeft = timeRemaining(String(proposal.datecreated));
        if (typeof(timeLeft) === 'object') {
          o.daysLeft = timeLeft[0];
          o.hoursLeft = timeLeft[1];
          o.minutesLeft = timeLeft[2];
          o.timeLeft = 'Active';
        } else {
          o.daysLeft = 0;
          o.hoursLeft = 0;
          o.minutesLeft = 0;

          o.timeLeft = 'Expired';
        }
        
        return o;
      })
      return updatedProposals;
    })
    .then(results => {
        console.log("proposal list: ", results);
        res.status(200).json(results);
      })
  })
//To vote on proposal
app.put('/proposals/:id/:value', (req, res) => {
  let proposalID = req.params.id;
  let vote = req.params.value;
  if (vote === "yes") {
  
    knex.select('yesvotes').from('proposals')
      .where({ id: proposalID })
      .then(result => {
        let voteCount = result[0].yesvotes;
        return voteCount;
      })
      .then(_res => {
        console.log('still see proposalID?', proposalID);
        let newCount = _res + 1;
        console.log('new count', newCount);
        knex('proposals')
          .update({ yesvotes: newCount })
          .where({id: proposalID })
          .then(voted => {
            res.status(200).send("voted!")
          })
      })
  } else if (vote === "no") {
      knex.select('novotes').from('proposals')
      .where({ id: proposalID })
      .then(result => {
        let voteCount = result[0].novotes;
        return voteCount;
      })
      .then(_res => {
        console.log('still see proposalID?', proposalID);
        let newCount = _res + 1;
        console.log('new count', newCount);
        knex('proposals')
          .update({ novotes: newCount })
          .where({id: proposalID })
          .then(voted => {
            res.status(200).send("voted!")
          })
      })
    } else {
      res.status(400)
    }
    
})
//To execute proposal
app.put('/execute/:id', (req, res) => {
function timeRemaining(inputDate) {
    console.log("inputDate", inputDate);
    let year = inputDate.slice(11,15);
    let month = (inputDate.slice(4,7));
    if (month === "Jan") {
      month = 0;
    } else if (month === "Feb") {
      month = 1;
    } else if (month === "Mar") {
      month = 2;
    } else if (month === "Apr") {
      month = 3;
    } else if (month === "May") {
      month = 4;
    } else if (month === "Jun") {
      month = 5;
    } else if (month === "Jul") {
      month = 6;
    } else if (month === "Aug") {
      month = 7;
    } else if (month === "Sep") {
      month = 8;
    } else if (month === "Oct") {
      month = 9;
    } else if (month === "Nov") {
      month = 10;
    } else if (month === "Dec") {
      month = 11;
    }
    let day = inputDate.slice(8,10);
    let hour = inputDate.slice(16,18);
    let minute = inputDate.slice(19,21);
    let d = new Date(year, month, day, hour, minute, 00);
    let currentDate = new Date();
    let diff = new Date(currentDate.getTime() - d.getTime());
    let years = diff.getUTCFullYear() - 1970; // Gives difference as year
    let months = diff.getUTCMonth(); // Gives month count of difference
    let days = diff.getUTCDate()-1; // Gives day count of difference
    let hours = diff.getUTCHours(); // Gives hour count of difference
    let minutes = diff.getUTCMinutes(); // Gives minute count of difference
    let remainingDays = 4 - days;
    let remainingHours = 23 - hours;
    let remainingMinutes = 60 - minutes;
  let remainingTime;
    if (remainingDays > 0 || remainingHours > 0 || remainingMinutes > 0) {
      remainingTime = `${remainingDays} days, ${remainingHours} hours, ${remainingMinutes} minutes before voting deadline.`;
    } else {
      remainingTime = 'Expired';
    }
    
    return remainingTime;
  }
  let proposalID = req.params.id;
  knex.select('yesvotes', 'novotes', 'datecreated', 'executed')
    .from('proposals')
    .where({id: proposalID})
    .then(result => {
      let proposal = result[0];
      let proposaleDate = proposal.datecreated
      console.log("proposaleDate?", proposaleDate);
      console.log("date to string", String(proposaleDate));
      console.log(timeRemaining(String(proposaleDate)));
      
      if(proposal.executed === 'false' && timeRemaining(String(proposaleDate)) === 'Expired' && proposal.yesvotes > proposal.novotes) {
        knex('proposals')
          .update({executed: 'true'})
          .where({id: proposalID})
          .then(_res => {
            // console.log("_res", _res);
            res.status(200).send("propsoal executed.")
          })
      } else {
        res.status(406).send("Could not execute");
      }
    })
})

let server;
function runServer(port=3001) {
    return new Promise((resolve, reject) => {
        server = app.listen(port, () => {
            resolve();
        }).on('error', reject);
    });
}

function closeServer() {
    return new Promise((resolve, reject) => {
        server.close(err => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
}

// if (require.main === module) {
//     runServer();
// }

runServer();

module.exports = {
    app, runServer, closeServer
};
