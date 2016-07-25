###  Documentation of stuff.js and search.js

All data related to emoticons are stored in /javascripts/emojilib/emojis.json

each emoticon has data as follows - 

"joy": {
    "keywords": ["face", "cry", "tears", "weep", "happy", "haha"],
    "char": "😂",
    "category": "people"
  }

stuff.js

1. $.getJSON is an special Jquery http GET request to read a JSON file over HTTP. 
2. Here it is accessing /javascripts/emojilib/emojis.json from the directory.  
3. It returns an function with result JSON object. Here it is shown as argument “emojis”. 
4. The object “emojis” which contains all the emoji data is iterated over forEach loop. 
5. Before showing into browser it is necessary to check that browser actually supports the emoticons or not. 
6. If it supports the emoticons than directly show by accessing the object emojis[‘char’] but if it is not supported in browser simply show the name/text/title of that emoticon. 
7. And then append the other information about this emoticon which will be used during search. 
8. As JSON object shows that each emoji has multiple keywords these keywords are then appended into the SPAN tag.


search.js

1. Search function called upon any activity done in input field as it is being listened. 
2. This function is called by trimmed string and again further it is checked if it is of unknown type. 
3. If it is of unknown type it is re-assigned to empty for making function non-breakable. 
4. If there is no matching keyword for any emoticons then result area is made hidden. 
5. Keywords are fetched from keywords field from joy object from JSON file. 

