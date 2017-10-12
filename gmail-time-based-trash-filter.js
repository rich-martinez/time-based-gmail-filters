function config() {
  return {
    //Change the value of labelTemplate to whichever label you choose.
    labelTemplate: "DELETE/ThisAfterDay",
    //change list to match all of your labels day values
    listOfDays: [1, 5, 7, 14, 30, 60],
    //optionally change timezone
    timeZone: "America/Detroit",
    useTimeZone: timeZone || Session.getScriptTimeZone(),
    gmailLabelKey: 'gmailLabel',
    purgeAfterKey: 'purgeAfter'
  }
}

function createQueryObjects(listOfDays, labelTemplate, gmailLabelKey, purgeAfterKey) {
  var queryObjects = listOfDays.map(function (day) {
    return {
      "GMAIL_LABEL": labelTemplate + day,
      "PURGE_AFTER": day
    };
  });

  return queryObjects;
}

function intialize() {
  return;
}

function install() {
  ScriptApp.newTrigger("purgeEachLabel")
    .timeBased()
    .everyDays(1)
    .inTimezone(useTimeZone)
    .create();
}

function uninstall() {
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    ScriptApp.deleteTrigger(triggers[i]);
  }
}

function purgeGmail(currentLabel, purgeAfterDayNumber) {
  /**
   * TODO: optimize age to be easier to read and more self documenting
   */
  var age = new Date();
  age.setDate(age.getDate() - purgeAfterDayNumber);
  var query = "label:" + currentLabel + " older_than:" + purgeAfterDayNumber + "d";

  try {
    var threads = GmailApp.search(query, 0, 100);
    if (threads.length == 100) {
      purgeGmail(currentLabel, purgeAfterDayNumber);
    }

    /**
     * Attempt to replace for loops with array functions based on what is returned from the Gmail methods
     */
    for (var i = 0; i < threads.length; i++) {
      var messages = GmailApp.getMessagesForThread(threads[i]);
      for (var j = 0; j < messages.length; j++) {
        var email = messages[j];
        if (email.getDate() < age) {
          email.moveToTrash();
        }
      }
    }
  } catch (e) {
    /**
     * TODO: Figure out how send emails if an error happens.
     */
  }
}

function purgeEachLabel() {
  var config = config();
  var currentLabel;
  var currentDay;
  var queryObjects = queryObjectConstructor(
    config.listOfDays,
    config.labelTemplate,
    config.gmailLabelKey,
    config.purgeAfterKey
  );

  queryObjects.forEach(function(queryObject) {
    currentLabel = queryObject[config.gmailLabelKey];
    purgeAfterDayNumber = queryObject[config.purgeAfterKey];
    purgeGmail(currentLabel, purgeAfterDayNumber);
  });
}
