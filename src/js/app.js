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
    web3 = new Web3(App.web3Provider); 
    return App.initContract();
  },

  initContract: function() {
    $.getJSON('Adoption.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var AdoptionArtifact = data;
      
      App.contracts.Adoption = TruffleContract(AdoptionArtifact);

      // Set the provider for our contract
      App.contracts.Adoption.setProvider(App.web3Provider);
    
      // Use our contract to retrieve and mark the adopted pets
      return App.markAdopted();
    });
    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-adopt', App.handleAdopt);
    $(document).on('click', "#submit", App.handleWaste);
    $(document).on('click', "#aa", App.handleGet);
    //$(document).on('click', "#aa", App.testFun);

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
        return instance.save(window.ipfsHash, "123", "Kumail", {from: account});
        //return instance.save("Qmb4AVrYLiXeGa9uboncWrLZXaDgb6ycz98CZ8ua3JcQmB", "123", "Kumail", {from: account});
      }).then(function(result) {
        console.log("Successfully added to block");
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
        return instance.getFile({from: account});
        //return instance.getName({from: account});
      }).then(function(result) {
        console.log("Successfully retrived: " + result);
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
    
      // Use our contract to retrieve and mark the adopted pets
    });
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
