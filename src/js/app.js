App = {
  web3Provider: null,
  contracts: {},
  init: function() {
    // Load pets.
    $.getJSON('../pets.json', function(data) {
      var petsRow = $('#petsRow');
      var petTemplate = $('#petTemplate');
      // for (i = 0; i < data.length; i ++) {
      //   petTemplate.find('.panel-title').text(data[i].name);
      //   petTemplate.find('img').attr('src', data[i].picture);
      //   petTemplate.find('.pet-breed').text(data[i].breed);
      //   petTemplate.find('.pet-age').text(data[i].age);
      //   petTemplate.find('.pet-location').text(data[i].location);
      //   petTemplate.find('.btn-adopt').attr('data-id', data[i].id);

      //   petsRow.append(petTemplate.html());
      // }
    });

    return App.initWeb3();
  },

  initWeb3: function() {
    // Is there an injected web3 instance?
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
    } else {
      // If no injected web3 instance is detected, fall back to Ganache
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }

    web3.version.getNetwork((err, netId) => {
      console.log(netId);
      switch (netId) {
        case "1":
          console.log('This is mainnet')
          break
        case "2":
          console.log('This is the deprecated Morden test network.')
          break
        case "3":
          console.log('This is the ropsten test network.')
          break
        default:
          console.log('This is an unknown network.')
      }
    })

    web3 = new Web3(App.web3Provider); 
    window.web3.eth.getBalance(web3.eth.accounts[0], function(err, balance){
      $("#acc").text("Current Wallet: " + web3.eth.defaultAccount);
      $("#val").text("Account Value: " + parseFloat(window.web3.fromWei(balance, 'ether')));
      console.log(parseFloat(window.web3.fromWei(balance, 'ether')));
  });    return App.initContract();
  },

  initContract: function() {
    $.getJSON('Adoption.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var AdoptionArtifact = data;
      
      App.contracts.Adoption = TruffleContract(AdoptionArtifact);

      // Set the provider for our contract
      App.contracts.Adoption.setProvider(App.web3Provider);
    
      // Use our contract to retrieve and mark the adopted petnpm s
      return App.markAdopted();
    });
    return App.bindEvents();
  },

  bindEvents: function() {  
    $(document).on('click', '.btn-adopt', App.handleAdopt);
    $(document).on('click', "#submit", App.handleWaste);
    $(document).on('click', "#new", App.handleGet);
    $(document).on('click', "#chain", App.handleChain);
    $(document).on('click', "#collectmoney", App.handleTransferContract);
    $(document).on('click', "#gotocnfrmvalid", App.handleReview);
    $(document).on('click', "#view-go", App.handleReviewChain);


    //$(document).on('click', '#sbmt', App.submitPaper);

    //console.log($("#sbmt").text());

    return App.init2();
  },

  markAdopted: function(adopters, account) {
    var adoptionInstance;

    App.contracts.Adoption.deployed().then(function(instance) {
      adoptionInstance = instance;

      return adoptionInstance.getAdopters.call();
    }).then(function(adopters) {
      for (i = 0; i < adopters.length; i++) {
        if (adopters[i] !== '0x0000000000000000000000000000000000000000') {
          $('.panel-pet').eq(i).find('button').text('Success').attr('disabled', true);
        }
      }
    }).catch(function(err) {
      console.log(err.message);
    });
  },

  testFun: function(event) {
    console.log("tesstttt")
  },

  handleAdopt: function(event) {
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));

    var adoptionInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
    
      var account = accounts[0];
    
      App.contracts.Adoption.deployed().then(function(instance) {
        adoptionInstance = instance;
    
        // Execute adopt as a transaction by sending account
        return adoptionInstance.adopt(petId, {from: account});
      }).then(function(result) {
        return App.markAdopted();
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  },

  handleWaste: function(event) {
    console.log("starting metamask....");
    event.preventDefault();
    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
      var account = accounts[0];

      App.contracts.Store.deployed().then(function(instance) {
        //adoptionInstance = instance;
        // Execute adopt as a transaction by sending account

        return instance.save(window.ipfsHash, "123", $("#name1").val(), {from: account});
        //return instance.save("Qmb4AVrYLiXeGa9uboncWrLZXaDgb6ycz98CZ8ua3JcQmB", "123", "Kumail", {from: account});
      }).then(function(result) {
        console.log("Successfully added to block: " + result);
        document.getElementById('test').click();
        // console.log("Latest block: " + web3.eth.getBlockNumber());
        // web3.eth.getBlock(web3.eth.getBlockNumber(), function(data){
        //   console.log(data);
        // });
      
        return;
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  },

  handleGet: function(event) {
    event.preventDefault();
    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
      var account = accounts[0];
      App.contracts.Store.deployed().then(function(instance) {
        //adoptionInstance = instance;
        // Execute adopt as a transaction by sending account
        //return instance.getFile({from: account});
        console.log(instance.getName({from: account}));
        console.log("GET Accc: " + account);
        console.log("GET Accc2: " + accounts[1]);

        return instance.getFile({from: accounts[0]});
        //return instance.getName({from: account});
      }).then(function(result) {
          console.log("Successfully retrived: " + "http://localhost:8080/ipfs/" + result);
          window.open("http://localhost:8080/ipfs/" + result, '_blank');
          return;
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  },

  handleChain: function(event) {
    event.preventDefault();
    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
      var account = accounts[0];
      App.contracts.Store.deployed().then(function(instance) {
        //adoptionInstance = instance;
        // Execute adopt as a transaction by sending account
        //return instance.getFile({from: account});
        instance.getLen({from: account}).then(function(data){
          console.log(data.c[0]);
          for (i = 0; i < data.c[0]; i++) { 
            instance.getPaperAtIndex(i, {from: account}).then(function(addr){
              console.log(addr);
            });          }
        });
        //console.log(instance.getPaperAtIndex(0,{from: account}));
        //console.log(instance.getPaperAtIndex(1,{from: account}));

        //console.log("GET Accc: " + account);
        //console.log("GET Accc2: " + accounts[1]);

        //return instance.getFile({from: accounts[1]});
        //return instance.getName({from: account});
      }).then(function(result) {
          return;
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  },

  handleReviewChain: function(event) {
    event.preventDefault();
    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
      var account = accounts[0];
      var hashhh;
      App.contracts.Review.deployed().then(function(instance) {
        //adoptionInstance = instance;
        // Execute adopt as a transaction by sending account
        //return instance.getFile({from: account});
        window.open("http://localhost:8080/ipfs/" + $("#fhash").val(), '_blank');
        var found;
        instance.getLength({from: account}).then(function(data){
          console.log(data.c[0]);
          for (i = 0; i < data.c[0]; i++) { 
            instance.getHashAtIndex(i, {from: account}).then(function(rr){
              console.log(rr + "  " + $("#fhash").val())
              if(rr.replace(/ /g,'') == $("#fhash").val().replace(/ /g,'')){
                console.log("match found on the blockchain");
                window.open("http://localhost:8080/ipfs/" + rr.replace(/ /g,''), '_blank');
                console.log(rr);
                instance.getRatingAtIndex(i, {from: account}).then(function(rrr){
                  console.log(rrr)
                  instance.getCommentAtIndex(i, {from: account}).then(function(usr){
                    console.log(usr)
                    });
                  });              }
              });
            }



            
        });
        //console.log(instance.getPaperAtIndex(0,{from: account}));
        //console.log(instance.getPaperAtIndex(1,{from: account}));

        //console.log("GET Accc: " + account);
        //console.log("GET Accc2: " + accounts[1]);

        //return instance.getFile({from: accounts[1]});
        //return instance.getName({from: account});
      }).then(function(result) {
          return;
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  },

  //Initialize the token contract
  initToken: function(event) {
    $.getJSON('TrailToken.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract.
      var TutorialTokenArtifact = data;
      App.contracts.TutorialToken = TruffleContract(TutorialTokenArtifact);

      // Set the provider for our contract.
      App.contracts.TutorialToken.setProvider(App.web3Provider);

      // Use our contract to retieve and mark the adopted pets.
    });
    App.getBalances();
    //return App.bindEvents();
  },

  getBalances: function() {
    console.log('Getting balances...');

    var tutorialTokenInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.TutorialToken.deployed().then(function(instance) {
        tutorialTokenInstance = instance; //assign instance of the contract that was deployed to the blockchain to the variable tutorialTokenInstance; by default this is the first account in Ganache

        return tutorialTokenInstance.balanceOf(account); //return balance of account 1
      }).then(function(result) {
        balance = result.c[0]; //balance is the result of the previous then statement (which got the balance of the account)
        //console.log(balance);
        $("#ttval").text("TrailToken Value: " + balance);
        $('#TTBalance').text(balance); //I think this is putting the output/result in the location of the balance
      }).catch(function(err) {
        console.log(err.message + " TT Error");
      });
    });

  },  

  handleTransfer: function(event) {
    event.preventDefault(); //occurs on pressing of #transferButton as event above
    //var amount = parseInt($('#TTTransferAmount').val()); //find number input in transfer amount field
    var amount = 10;
    
    //var toAddress = $('#TTTransferAddress').val(); //find address in transfer address field
    var toAddress = web3.eth.defaultAccount;
    console.log('Transfer ' + amount + ' TT to ' + toAddress);

    var tutorialTokenInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.TutorialToken.deployed().then(function(instance) {
        tutorialTokenInstance = instance;

        return tutorialTokenInstance.transfer(toAddress, amount, {from: account}); //initiate transfer between accounts
      }).then(function(result) {
        alert('Transfer Successful!');
        return App.getBalances(); //after you successfully transfer, update the balance
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  },

  handleTransferContract: function(event) {
    console.log("Initializing faucet");
    event.preventDefault();
    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
      var account = accounts[0];
      App.contracts.TutorialToken.deployed().then(function(instance) {
        //adoptionInstance = instance;
        // Execute adopt as a transaction by sending account
        return instance.tokenTransfer(10, {from: account});
        //return instance.save("Qmb4AVrYLiXeGa9uboncWrLZXaDgb6ycz98CZ8ua3JcQmB", "123", "Kumail", {from: account});
      }).then(function(result) {
        console.log("Successfully transfered TrailToken");
        document.getElementById('test').click();
        return;
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  },


  submitPaper: function(event) {
    var url = $("#submit").text();
    window.ipfs.add(url, function(err, result) {
      if (err) {
          console.error('Error sending file: ', err);
          return null;
      } else if (result && result[0] && result[0].Hash) {
          var imageURL = window.ipfsDataHost + "/" + result[0].Hash;
          console.log('File: ', result[0].Hash);
          console.log(imageURL);
      } else {
          console.error('No file for you...');
          return null;
      }
  });
  },

  init2: function(event){
    $.getJSON('Store.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var storeArtifact = data;
      
      App.contracts.Store = TruffleContract(storeArtifact);

      // Set the provider for our contract
      App.contracts.Store.setProvider(App.web3Provider);
    
      // Use our contract to retrieve and mark the adopted petsinit
      return App.initReview();
    });
  },

  initReview: function(event){
    $.getJSON('Review.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var rev = data;

      App.contracts.Review = TruffleContract(rev);

      // Set the provider for our contract
      App.contracts.Review.setProvider(App.web3Provider);
      console.log("Reviews initialized..")
      // Use our contract to retrieve and mark the adopted petsinit
      return App.initToken();
    });
  },

  handleReview: function(event){
    console.log("Starting comment contract....");
    event.preventDefault();
    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
      var account = accounts[0];
      App.contracts.Review.deployed().then(function(instance) {
        //adoptionInstance = instance;
        // Execute adopt as a transaction by sending account
        var rating = 0;
        if($('#good').is(':checked')) { rating = 3 }
        if($('#needswork').is(':checked')) { rating = 1 }
        if($('#bad').is(':checked')) { rating = 0 }

        return instance.pushAll($("#comments").val(), rating, $("#validatehash").val(),  {from: account});
        //return instance.save("Qmb4AVrYLiXeGa9uboncWrLZXaDgb6ycz98CZ8ua3JcQmB", "123", "Kumail", {from: account});
      }).then(function(result) {
        console.log("Successfully added to block: " + result);
//      document.getElementById('test').click();
        // console.log("Latest block: " + web3.eth.getBlockNumber());
        // web3.eth.getBlock(web3.eth.getBlockNumber(), function(data){
        //   console.log(data);
        // });

        $("#collectmoney").toggleClass("diabled");
        //$("#collectmoney").prop("disabled", false);
      
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
