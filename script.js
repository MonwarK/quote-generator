// Variables
const quoteContainer = document.getElementById("quote-container")
const quoteDOM = document.getElementById("quote");
const autherDOM = document.getElementById("author");
const newQuoteButton = document.getElementById("new-quote")
const twitterButton = document.getElementById("twitter")
const loader = document.getElementById("loader")

//Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function loaded() {

    if(!loader.hidden){
        loader.hidden = true;
        quoteContainer.hidden = false;
    }
}

// Get Quotes from Foresmatic API
async function getQuote() {

    loading()

    const proxyUrl = "https://whispering-tor-04671.herokuapp.com/"
    const apiUrl = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
    
    try{
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        console.log(data);

        // If quote is too long, reduce font size
        if(data.quoteText.length > 100){
            quoteDOM.classList.add("long-quote")
        } 
        else{
            quoteDOM.classList.remove("long-quote")
        }
        
        quoteDOM.innerHTML = "'"+data.quoteText+"'"


        // If author is null
        if(data.quoteAuthor == ""){
            autherDOM.innerHTML = "- Unknown"
        } else{
            autherDOM.innerHTML = "- "+data.quoteAuthor
        }

        loaded()
    } 
    catch (err){
        console.log("Whoops, no quote...", err)
    }
}

// Open new tab that will tweet the quote
function tweetQuote() {
    const quote = quoteDOM.innerHTML;
    const author = autherDOM.innerHTML;
    const twitter = `https://twitter.com/intent/tweet?text=${quote} ${author}`

    window.open(twitter, "_blank");
}

newQuoteButton.addEventListener("click", getQuote)
twitterButton.addEventListener("click", tweetQuote)

// On Load
getQuote();