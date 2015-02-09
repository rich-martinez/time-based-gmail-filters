/* Edited by Richard Martinez - http://richardmartinez.github.io/ */

//Change the value of labelTemplate to whichever label you choose.
var labelTemplate = "DELETE/ThisAfterDay";

//change list to match all of your labels day values
var listOfDays = [1, 5, 7, 14, 30, 60];


var queryObjectConstructor = function(listOfDays){
  var arrayOfLabelInfo = [];
  for(var i = 0, l = listOfDays.length; i < l; i++){
    arrayOfLabelInfo.push({
      "GMAIL_LABEL": labelTemplate + listOfDays[i],
      "PURGE_AFTER": listOfDays[i]
    });
  }
  return arrayOfLabelInfo;
};


function Intialize() {
  return;
}

function Install() {

  ScriptApp.newTrigger("purgeEachLabel")
  .timeBased()
  .at(new Date((new Date()).getTime() + 1000*60*2))
  .create();

  ScriptApp.newTrigger("purgeEachLabel")
  .timeBased().everyDays(1).create();

}

function Uninstall() {
  var triggers = ScriptApp.getProjectTriggers();
  for (var i=0; i<triggers.length; i++) {
    ScriptApp.deleteTrigger(triggers[i]);
  }

}

function purgeEachLabel(){
  var currentLabel, currentDay, arrayOfLabelInfo = queryObjectConstructor(listOfDays);
  for(var i = 0; i < arrayOfLabelInfo.length; i++){
    currentLabel = arrayOfLabelInfo[i]["GMAIL_LABEL"];
    currentDay = arrayOfLabelInfo[i]["PURGE_AFTER"];
    purgeGmail(currentLabel, currentDay);
  }
}

var purgeGmail =  function(currentLabel, currentDay) {

  var age = new Date();  
  age.setDate(age.getDate() - currentDay);    
  var purge  = Utilities.formatDate(age, Session.getScriptTimeZone(), "yyyy-MM-dd");
  var query = "label:" + currentLabel + " before:" + purge;

  try {

    var threads = GmailApp.search(query, 0, 100);

    if (threads.length == 100) {
      ScriptApp.newTrigger("purgeEachLabel")
      .timeBased()
      .at(new Date((new Date()).getTime() + 1000*60*10))
      .create();
    }

    for (var i=0; i<threads.length; i++) {
      var messages = GmailApp.getMessagesForThread(threads[i]);
      for (var j=0; j<messages.length; j++) {
        var email = messages[j];
        if (email.getDate() < age) {
          email.moveToTrash();
        }
      }
    }

  } catch (e) {}

};