/*
* Get the latest authentication tokens and return the data in the success function
*/
function authenticate(force) {
  var auth = new Appworks.Auth(
    function(response) {
      var string = "Auth Data: <br/>";
      var data = response.authData;
      for (var key in data) {
        if (data.hasOwnProperty(key)) {

          if(typeof(data[key]) == "object") {
            var subdata = data[key];
                for (var subkey in subdata) {
                  if (subdata.hasOwnProperty(subkey)) {
                    string += key + " -> " + subkey + " -> " + subdata[subkey] + "<br/>";
                  }
                }
          } else {
            string += key + " -> " + data[key] + "<br/>";
          }
        }
      }

      out(string);
    },
    function(error){
        out(error);
    }
  );

  // set force to false to allow appworks to test whether the tokens are still valid
  // set it to true to force appworks to refresh the authentication tokens
  auth.authenticate(force);
}

/*
* If OTDS Ticket is needed when in an OAuth2 environment, use this to obtain one
*/
function getOtdsSsoTicket() {
  var auth = new Appworks.Auth(
    function(data) { },
    function(error){ }
  );

  auth.otdsssoticket(function(ticket) {
    out("OTDS Ticket: " +ticket);
  }, function(error) {
    out("Error: " + error);
  });
}

/*
* Check if there is app can see the gateway, required for API calls
*/
function isOnline() {
  var auth = new Appworks.Auth(
    function(data) { },
    function(error){ }
  );

  auth.online(
    function(success){
      if(success) {
        out("You're online");
      } else {
        out("You're offline");
      }
    },
    function(error){
      out("Online check error");
    }
  );
}

/*
* Obtain the gateway for prefixing API calls
* Also returned in auth.authenticate
*/
function getGateway() {
  var auth = new Appworks.Auth({
    function(data) {},
    function(error) {}
  });

  auth.gateway(
    function(gateway){out("Gateway: " + gateway);},
    function(error){out("Error: " + error);}
  );
}

function out(message) {
  console.log(message);
  if(typeof(message) == "object") {
    getObject("result").innerHTML = JSON.stringify(message);
  } else {
    getObject("result").innerHTML = message;
  }
}

function getObject(name) {
  return document.getElementById(name);
}
