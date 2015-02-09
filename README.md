	This script will trash all gmail emails with the labels specified, after the number of days defined in the listOfDays array.

	Check out the tutorial and script.

  For more details, refer to http://labnol.org/?p=27605


  T U T O R I A L
  - - - - - - - - 
  
  Step 1. Create gmail filter(s) to apply label(s) to certain emails in the format "NAMEOFLABEL[#OFDAYS before trashing]" (e.g. "delete3").

  Step 2. Add gmail-time-based-trash-filter.js to your Google Drive, or go to: https://script.google.com/d/1UUaas3vakCEHCclNkp3-RqixWsOTT-Rz6SOZpn0TqO5o_urPL8vtTU7u/edit?newcopy=true

  Step 3. Update the values of fields labelTemplate and listOfDays with NAMEOFLABEL and #OFDAYS respectively.
  
  Step 4. Go to Run -> Initialize and authorize the script.
  
  Step 5. Go to Run -> Install to install the script.
  
  You can now exit this window and any email messages in Gmail folder(s) will automatically 
  get purged after 'n' days (in listOfDays). The script will run by itself every day at 01:00 hours.
  
  Also, you may go to Run -> Uninstall to stop the purging script anytime.