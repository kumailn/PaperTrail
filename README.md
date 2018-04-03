# PaperTrail

## Inspiration
Scientific progress often occurrs slowly, but it is necessary for advanced technologies and improvements in human lives. We were inspired by the knowledge that there are several well-publicized issues with the current peer review system in academia. We recognized that blockchains and decentralized applications (DApps) are an emerging technology that could solve these problems, thereby removing unnecessary barriers in the progression of human knowledge.

## What it does
Our decentralized web application allows scientists from around the world to view, upload, and peer review scientific publications. As a DApp, it can address many of the growing concerns of the scientific community and public by: 
1. Ensuring trust and transparency
2. Incentivizing & speeding up the review process
3. Reducing costs for publishing
4. Disseminating scientific knowledge

## How we built it
Solidity, Truffle framework, IPFS, Javascript, HTML, CSS, jQuery, and bootstrap. 

## Challenges we ran into
It was our first time building a DApp. Many of the challenges revolved around consistently maintaing the test environment, and making the smart contracts and token communicate with each other properly.

## Accomplishments that we're proud of
We are very proud of all that we accomplished in such a short period of time. In particular, we are proud of three aspects of our application: the option to view all uploaded manuscripts on the blockchain, decentralizing the hosting of the website, and the revision feature and its ability to pay reviewers in redeemable tokens.

## What we learned
We learned a tremendous amount about decentralized applications, blockchain technology, and the Solidity programming language.

## What's next
We would like to incorporate some additional functionality into the app. Several tools, such as: a parser to extract key document sections, ranking for community impact, and filtering when viewing manuscripts, all fit with our broader vision for the application.

## Dependencies 
PaperTrail is officially supported on MacOSx, Linux and Windows, you will need these tools in order to run PaperTrail on your own setup:
* [node.js](https://nodejs.org/en/)
* [MetaMask](https://metamask.io/)
* [Truffle](http://truffleframework.com/)
* [Ganache](http://truffleframework.com/ganache/)
* [IPFS](https://ipfs.io/docs/install/)
* [Allow-Control-Origin](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en)

## Getting this setup
Firstly install IPFS, if you are on Windows download the binary and add it to your Path. Next execute the following commands:
- `$ ipfs` in your command line/ terminal and see if IPFS works 
- `$ ipfs init`
- `$ ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin "[\"*\"]"`
- `$ ipfs config --json Gateway.HTTPHeaders.Access-Control-Allow-Origin "[\"*\"]"`

Make sure you have NodeJS installed for the next steps:
- `$ npm install -g truffle` 
If you're on windows go to the truffle binary in your path, can be found by  - `$ where truffle`, and rename the two files called "truffle" to "truff". This is to avoid name errors later on when we execute commands. If you are using windows, use 'truff' where you see 'truffle' in the next steps.
- `$ npm install`
- Download and install [Ganache](http://truffleframework.com/ganache/) and [MetaMask](https://metamask.io/)
- In your terminal in the project folder run `$ tuffle compile`
- Then run `$ truffle migrate`
- You should see in Ganache after the migrate command has been completed that there are no longer 0 blocks on our chain. This means our smart contracts have been migrated to the chain
- Install [Allow-Control-Origin](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en) and make sure it's turned on. Please trun it off whenever you're not using PaperTrail because it can cause issues loading other websites.
- Then start the IPFS Daemon by `$ ipfs daemon`
- Then finally, in another command window in the same directory run `$ npm run dev`

## Buit By
* [Jaison Loodu](https://github.com/Jailoodu)
* [Pedrum Shemirani](https://github.com/pedrumstick)
* [Kajoban Kuhaparan](https://github.com/kajoban)
* [Kumail Naqvi](https://github.com/kumailn)

