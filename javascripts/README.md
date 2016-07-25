###  Documentation of stuff.js and search.js

stuff.js

$.getJSON is an special Jquery http GET request to read a JSON file over HTTP. 
Here it is accessing /javascripts/emojilib/emojis.json from the directory.  
It returns an function with result JSON object. Here it is shown as argument “emojis”. 
The object “emojis” which contains all the emoji data is iterated over forEach loop. 
Before showing into browser it is necessary to check that browser actually supports the emoticons or not. 
If it supports the emoticons than directly show by accessing the object emojis[‘char’] but if it is not supported in browser simply show the name/text/title of that emoticon. 
And then append the other information about this emoticon which will be used during search. 
As JSON object shows that each emoji has multiple keywords these keywords are then appended into the SPAN tag.


search.js

Search function called upon any activity done in input field as it is being listened. 
This function is called by trimmed string and again further it is checked if it is of unknown type. 
If it is of unknown type it is re-assigned to empty for making function non-breakable. 
If there is no matching keyword for any emoticons then result area is made hidden.
