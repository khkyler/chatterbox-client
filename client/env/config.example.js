//YOU DO NOT NEED TO EDIT this code.
if (!/(&|\?)username=/.test(window.location.search)) {
  var newSearch = window.location.search;
  if (newSearch !== '' & newSearch !== '?') {
    newSearch += '&';
  }
  var user = prompt('What is your name?') || 'anonymous';
  window.currentUser = _.escape(user);
  newSearch += 'username=' + _.escape(user);
  window.location.search = newSearch;
}

// Put your parse application keys here!
$.ajaxPrefilter(function (settings, _, jqXHR) {
  jqXHR.setRequestHeader("X-Parse-Application-Id", "PARSE_APP_ID");
  jqXHR.setRequestHeader("X-Parse-REST-API-Key", "PARSE_API_KEY");
});
