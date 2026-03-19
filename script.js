document.getElementById("btc").innerHTML = "$86,500";
document.getElementById("eth").innerHTML = "$3,200";
document.getElementById("bnb").innerHTML = "$710";
document.getElementById("xrp").innerHTML = "$2.55";
document.getElementById("doge").innerHTML = "$0.58";



let score = 0;

function makeGuess(choice) {
  let result = Math.random() > 0.5 ? "up" : "down";

  if (choice === result) {
    document.getElementById("gameResult").innerHTML =
      "✅ Correct! Bitcoin went " + result.toUpperCase();
    score++;
  } else {
    document.getElementById("gameResult").innerHTML =
      "❌ Wrong! Bitcoin went " + result.toUpperCase();
    score = 0;
  }

  document.getElementById("score").innerHTML = score;
  updateBestScore(score);
}



// Əgər best score əvvəldən varsa götür
let best = localStorage.getItem("bestScore");

if (best === null) {
  best = 0;
}

// səhifədə göstər
if (document.getElementById("bestScore")) {
  document.getElementById("bestScore").innerHTML =
    "Best Score: " + best;
}

// hər dəfə score artanda best də yenilə
function updateBestScore(currentScore) {
  if (currentScore > best) {
    best = currentScore;
    localStorage.setItem("bestScore", best);

    document.getElementById("bestScore").innerHTML =
      "Best Score: " + best;
	 
  }
}




function checkAnswer(answer) {
  let result = document.getElementById("quizResult");

  if (answer === "correct") {
    result.innerHTML = "✅ Correct! Blockchain is the answer.";
  } else {
    result.innerHTML = "❌ Wrong answer. Try again!";
  }
}

function copyAddress() {
  let address = document.getElementById("btcAddress").innerText;

  navigator.clipboard.writeText(address);

  document.getElementById("copyMsg").innerHTML =
    "✅ Address copied to clipboard!";
}

async function getPrices() {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin,ripple,dogecoin&vs_currencies=usd"
      
    );

    const data = await response.json();

    document.getElementById("btc").innerText = "$" + data.bitcoin.usd;
    document.getElementById("eth").innerText = "$" + data.ethereum.usd;
    document.getElementById("bnb").innerText = "$" + data.binancecoin.usd;
    document.getElementById("xrp").innerText = "$" + data.ripple.usd;
    document.getElementById("doge").innerText = "$" + data.dogecoin.usd;

  } catch (error) {
    console.log("API Error:", error);
  }
}

getPrices();
setInterval(getPrices, 30000);

let quizData = [
  {
    q: "What does BTC stand for?",
    options: ["Big Token Coin", "Bitcoin", "Binary Transfer Coin", "Bit Trade Cash"],
    correct: 1
  },
  {
    q: "Which blockchain is used for smart contracts?",
    options: ["Ethereum", "Dogecoin", "Litecoin", "Ripple"],
    correct: 0
  },
  {
    q: "What is blockchain?",
    options: ["A video game", "A bank account", "A digital ledger", "A wallet"],
    correct: 2
  },
  {
    q: "Which coin is known as a meme coin?",
    options: ["BNB", "ETH", "DOGE", "XRP"],
    correct: 2
  },
  {
    q: "Crypto is mainly stored in a...",
    options: ["Wallet", "Notebook", "Car", "Email"],
    correct: 0
  }
];

let currentQ = 0;
let quizScore = 0;

function loadQuestion() {
  if (!document.getElementById("question")) return;

  let q = quizData[currentQ];
  document.getElementById("question").innerHTML = q.q;

  for (let i = 0; i < 4; i++) {
    document.getElementById("btn" + i).innerHTML = q.options[i];
  }

  document.getElementById("quizScore").innerHTML =
    "Score: " + quizScore;
}

function selectAnswer(choice) {
  let q = quizData[currentQ];

  if (choice === q.correct) {
    quizScore++;
    alert("✅ Correct!");
  } else {
    alert("❌ Wrong!");
  }

  currentQ++;

  if (currentQ < quizData.length) {
    loadQuestion();
  } else {
    document.getElementById("question").innerHTML =
      "🎉 Quiz Finished! Final Score: " + quizScore + "/5";

    document.querySelector(".answers").style.display = "none";
  }
}

loadQuestion();



function setTheme(mode) {
  if (mode === "gold") {
    document.documentElement.style.setProperty("--bg", "#0b0b0b");
    document.documentElement.style.setProperty("--card", "#151515");
    document.documentElement.style.setProperty("--main", "#d4af37");
    document.documentElement.style.setProperty("--text", "white");
  }

  if (mode === "neon") {
    document.documentElement.style.setProperty("--bg", "#000014");
    document.documentElement.style.setProperty("--card", "#001a2e");
    document.documentElement.style.setProperty("--main", "#00ffcc");
    document.documentElement.style.setProperty("--text", "white");
  }

  if (mode === "purple") {
    document.documentElement.style.setProperty("--bg", "#12001f");
    document.documentElement.style.setProperty("--card", "#240033");
    document.documentElement.style.setProperty("--main", "#bb66ff");
    document.documentElement.style.setProperty("--text", "white");
  }

  
  localStorage.setItem("theme", mode);
}


let savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  setTheme(savedTheme);
}

//gündəlik kripto önəriləri

let tips = [
  "Never share your seed phrase with anyone.",
  "Always use two-factor authentication (2FA).",
  "Invest only what you can afford to lose.",
  "Bitcoin is the first cryptocurrency ever created.",
  "Diversify your crypto portfolio."
];

function loadTip() {
  if (!document.getElementById("dailyTip")) return;

  let randomTip = tips[Math.floor(Math.random() * tips.length)];
  document.getElementById("dailyTip").innerHTML = randomTip;
}

loadTip();



const wallets = {
btc: "bc1qjsempy9dn6tjw7kkpsndw2kvr68ud93zkj5w55",
eth: "0xEE0b0eF6dA268D34Ab3a9365e1BF31aD6A875f93",
trx: "TLFzModS25wE6TawwzB4TnCdpG3K4W1jCo",
bnb: "0xEE0b0eF6dA268D34Ab3a9365e1BF31aD6A875f93"
}

const coinSelect = document.getElementById("coinSelect")
const walletAddress = document.getElementById("walletAddress")

function updateWallet() {
walletAddress.value = wallets[coinSelect.value]
}

coinSelect.addEventListener("change", updateWallet)

updateWallet()

function copyAddress(){
navigator.clipboard.writeText(walletAddress.value)
alert("Address copied!")
}




// 1️⃣ PRICE GUESS
function checkPrice(){
let real = 60000;
let guess = document.getElementById("priceGuess").value;

if(Math.abs(guess - real) < 5000){
document.getElementById("priceResult").innerText = "🔥 Very Close!";
}
else{
document.getElementById("priceResult").innerText = "❌ Wrong!";
}
}

// 2️⃣ QUIZ
function answer(ans){
if(ans === "coin"){
document.getElementById("quizResult").innerText = "✅ Correct!";
}else{
document.getElementById("quizResult").innerText = "❌ Wrong!";
}
}

// 3️⃣ RANDOM COIN
function randomCoin(){
let coins = ["BTC","ETH","BNB","SOL","DOGE","ADA"];
let random = coins[Math.floor(Math.random()*coins.length)];
document.getElementById("coinResult").innerText = random;
}

// 4️⃣ MINING
let count = 0;
function mine(){
count++;
document.getElementById("coins").innerText = count;
}