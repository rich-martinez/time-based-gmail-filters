###This script will trash all gmail emails with the labels specified, after the number of days defined (in the *listOfDays* array).###

Check out the tutorial and script.

<br />

##T U T O R I A L##

----------

Step 1. Create gmail filter(s) to apply label(s) to certain emails in the format "**NAMEOFLABEL**[**NUMBEROFDAYS** before trashing]" (e.g. "delete3").

Step 2. Add gmail-time-based-trash-filter.js to your Google Drive and open script, or go [here](https://script.google.com/d/1UUaas3vakCEHCclNkp3-RqixWsOTT-Rz6SOZpn0TqO5o_urPL8vtTU7u/edit?newcopy=true).

Step 3. Update the values of the following fields (and save the script after updating):

    var labelTemplate = "NAMEOFLABEL";
    //this field can have any amount of comma separated values
    var listOfDays = [NUMBEROFDAYS, NUMBEROFDAYS];

Step 4. Go to Run -> Initialize and authorize the script.

Step 5. Go to Run -> Install to install the script.

You can now exit (Google script editor) at any time, and any email messages in Gmail folder(s) will automatically get purged after 'n' days (in *listOfDays*). The script will run by itself every day.

Also, you may go to Run -> Uninstall to stop the purging script anytime.


For information about the original script go [here](http://labnol.org/?p=27605).
