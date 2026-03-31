
// Voice toggle
let voiceEnabled = false;
const toggle = document.getElementById("voiceToggle");
toggle.onclick = () => { voiceEnabled = !voiceEnabled; toggle.classList.toggle("active"); };

// Quiz Data (simplified 5 MCQs per category for example; expand to 20)
const quizData = {
html:[
{q:"Largest heading?",o:["<h6>","<h1>","<header>"],a:1},
{q:"<!DOCTYPE html> defines?",o:["Document type","Header","None"],a:0},
{q:"Image path attribute?",o:["src","href","path"],a:0},
{q:"Semantic tag?",o:["<div>","<section>","<span>"],a:1},
{q:"HTML full form?",o:["Hyper Text Markup Language","High Text Machine","Hyperlinks Text Language"],a:0}
],
css:[
{q:"Flexbox used for?",o:["Layout","Color","Animation"],a:0},
{q:"Center text property?",o:["text-align","align","center"],a:0},
{q:"CSS full form?",o:["Cascading Style Sheets","Creative Style System","Computer Sheet Style"],a:0},
{q:"Property for text color?",o:["color","font-color","text-color"],a:0},
{q:"Relative unit?",o:["em","px","pt"],a:0}
],
js:[
{q:"Closure means?",o:["Function with memory","Loop","Object"],a:0},
{q:"Runs in browser?",o:["JavaScript","Java","C++"],a:0},
{q:"Async function keyword?",o:["async","await","function"],a:0},
{q:"Create array?",o:["[]","{}","()"],a:0},
{q:"Declare variable?",o:["let","var","both"],a:2}
],
mix:[
{q:"Best JS practice?",o:["Global vars","Modular code","Inline"],a:1},
{q:"Lazy loading improves?",o:["Performance","Design","Security"],a:0},
{q:"Semantic HTML helps?",o:["Accessibility","Performance","SEO"],a:0},
{q:"CSS property align flex?",o:["align-items","justify-content","flex"],a:0},
{q:"Parse JSON method?",o:["JSON.parse","JSON.stringify","eval"],a:0}
]
};

let currentQuiz = [], index = 0, score = 0;

// Start
function startQuiz(){
  const username = document.getElementById("name").value;
  document.getElementById("login").style.display = "none";
  document.getElementById("quiz").style.display = "block";
  document.getElementById("user").innerText = "Welcome " + username;
}

// Load Quiz
function loadQuiz(){
  const cat = document.getElementById("category").value;
  currentQuiz = quizData[cat];
  index = 0; score = 0;
  showQuestion();
}

// Show Question
function showQuestion(){
  const q = currentQuiz[index];
  document.getElementById("question").innerText = q.q;
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";
  let speechText = q.q + ". ";
  q.o.forEach((opt,i)=>{
    const btn = document.createElement("button");
    btn.className = "option";
    btn.innerText = opt;
    btn.onclick = ()=>checkAnswer(i);
    optionsDiv.appendChild(btn);
    speechText += `Option ${i+1}: ${opt}. `;
  });
  if(voiceEnabled) speak(speechText);
}

// Check Answer
function checkAnswer(selected){
  if(selected === currentQuiz[index].a){ score++; if(voiceEnabled) speak("Correct"); }
  else { if(voiceEnabled) speak("Wrong"); }
}

// Next Question
function nextQuestion(){
  index++;
  if(index<currentQuiz.length) showQuestion();
  else showCongrats();
}

// Speak
function speak(text){
  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = "en-US";
  speechSynthesis.speak(speech);
}

// Voice Input
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
function voiceAnswer(){
  if(!voiceEnabled) return;
  recognition.start();
  recognition.onresult = function(event){
    const t = event.results[0][0].transcript.toLowerCase();
    if(t.includes("one")) checkAnswer(0);
    else if(t.includes("two")) checkAnswer(1);
    else if(t.includes("three")) checkAnswer(2);
  };
}

// Show Congrats & Balloons
function showCongrats(){
  document.getElementById("quiz").style.display = "none";
  document.body.innerHTML = `<div style="text-align:center;color:#fff;font-size:30px;margin-top:50px;">🎉 Congratulations! 🎉<br>Your Score: ${score}</div>`;
  createBalloons();
}

function createBalloons(){
  for(let i=0;i<30;i++){
    const b=document.createElement('div');
    b.className='balloon';
    b.style.background=randomColor();
    b.style.left=Math.random()*100+'%';
    b.style.animation=`float${Math.floor(Math.random()*3)+1} ${5+Math.random()*5}s ease-in infinite`;
    document.body.appendChild(b);
  }
  const style=document.createElement('style');
  style.innerHTML=`@keyframes float1{0%{transform:translateY(100vh)}100%{transform:translateY(-100px)}}
  @keyframes float2{0%{transform:translateY(100vh)}100%{transform:translateY(-150px)}}
  @keyframes float3{0%{transform:translateY(100vh)}100%{transform:translateY(-200px)}}`;
  document.head.appendChild(style);
}

function randomColor(){
  const colors=['#ff4d4d','#ffcc00','#33cc33','#3399ff','#cc33ff','#ff66b2'];
  return colors[Math.floor(Math.random()*colors.length)];
}