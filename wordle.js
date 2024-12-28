var word = "";
var guesslist = [];
//import list of possible secret words
readRecords("Wordle", {}, function(records) {
  for (var i =0; i < records.length; i++) {
    appendItem(guesslist, records[i].guesses);
  }
  word = guesslist[randomNumber(0, 316)];
});
var x = 1;
var guesses = [];
//given a guess, the secret word, and the attempt #, updates correct boxes with color outputs
function updateboxes(word, guess, num) {
  for (var i = 1; i < 6; i++) {
    setText("letter"+i+num, guess[i-1].toUpperCase());
    if (word[i-1]==guess[i-1]) {
      setProperty("letter"+i+num, "background-color", "green");
    } else if (word.includes(guess[i-1])) {
      setProperty("letter"+i+num, "background-color", "yellow");
    } else {  
      setProperty("letter"+i+num, "background-color", "grey");
    }
  }
  if (word==guess){
    setTimeout(function() {
      setScreen("winScreen");
    }, 1000);
  }else if (num==6){
    setTimeout(function() {
      setScreen("lossScreen");
    }, 1000);
  }
}
//if the check is clicked, sees if guess is the correct character count, if not, does not accept guess
//if guess meets requirement, updates boxes using function above
onEvent("guessbutton", "click", function() {
  appendItem(guesses,getText("guessbox"));
  if ((guesses[guesses.length-1]).length == 5) {
    x++;
    setText("guessbox", "");
    updateboxes(word,guesses[guesses.length-1],x-1);
  } else{
    guesses.pop();
    setProperty("guessbutton", "icon-color", "red");
    setTimeout(function() {
      setProperty("guessbutton", "icon-color", "black");
    }, 500);
  }
});
//on the loss screen, only reveals the answer when the user chooses to reveal by clicking the text box
onEvent("lossScreen", "click", function( ) {
  setText("lossAnswer", word);
  setProperty("revealbox", "text-color", rgb(255,0,0,0));
  setProperty("revealbox", "background-color", rgb(255,0,0,0));
});

