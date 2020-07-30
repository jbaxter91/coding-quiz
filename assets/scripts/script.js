
// ----------- Panels Section -------------
// Panel is an object that has all required data for the current question
var panel1 = 
{
    question: "What does CDN stand for?",
    answers: ["Cached Data Now","Content Distribution Network","Content Delivery Network","Content Delivered Now"],
    correctIndex: 2,
    penaltyValue: 10
}
var panel2 = 
{
    question: "Inside which HTML element do we put the JavaScript?",
    answers: ["<script>","<scripting>","<js>","<javascript>"],
    correctIndex: 0,
    penaltyValue: 15
}
var panel3 = 
{
    question: "What is the correct syntax for referring to an external script called xxx.js?",
    answers: ["<script name=xxx.js>","<script href=xxx.js>","<script src=xxx.js>"],
    correctIndex: 2,
    penaltyValue: 7
}
var panel4 = 
{
    question: "The external JavaScript file must contain the script tag.",
    answers: ["True","False"],
    correctIndex: 0,
    penaltyValue: 5
}
var panel5 = 
{
    question: "How do you write Hello World in an alert box?",
    answers: ["alertbox(Hello World);","msg(Hello World);","alert(Hello World);","msgbox(Hello World);"],
    correctIndex:2,
    penaltyValue: 20
}
var panel6 = 
{
    question: "How do you create a function in JavaScript?",
    answers: ["function myFunction()","function = myFunction()","function:myFunction()","function myFunction"],
    correctIndex: 0,
    penaltyValue: 10
}
var panel7 = 
{
    question: "How do you call a function named myFunction?",
    answers: ["myFunction","call myFunction()","myFunction()","my.Function()"],
    correctIndex: 2,
    penaltyValue: 10
}

// ----------- End Panels Section -------------

var questions = [panel1,panel2,panel3,panel4,panel5,panel6,panel7];
var currentQuestion = 0;
var currentTime = 60;
var highScores = [];
var name = "";
var timer;

var bottomContainer = document.querySelector("#bottomContainer");
var questionDisplay = document.querySelector("#questionDisplay");
var timeDisplay = document.querySelector("#timeDisplay");
var highScoreLink = document.querySelector("#highScoreLink");
highScoreLink.addEventListener("click", function(){
    currentQuestion = questions.length;
    console.log("Clicked high score");
    renderHighScore();
});


init();



function init()
{
    var inputField = document.createElement("input");
    inputField.setAttribute("class","col-12 text-center");
    var startButton = document.createElement("button");
    startButton.setAttribute("class","col-12 text-center");
    startButton.textContent = "Start";
    questionDisplay.innerHTML = "Enter your name to start the javascript Code Quiz! <hr>" ;

    loadHighScores();
    

    // Clear All buttons inside the answers container
    // If using jquery, do $(element).clear()
    while (bottomContainer.firstChild) {
        bottomContainer.removeChild(bottomContainer.firstChild);
    }

    bottomContainer.appendChild(inputField);
    bottomContainer.appendChild(startButton);

    startButton.addEventListener("click",function (){
        if(inputField.value)
        {
            name = inputField.value;
            // Start the game
            renderPanel();
            timer = setInterval(timerTick,1000);
        }
    });
}


// This function clears all buttons off the answers container then repopulates them with the current questions.
// **Note** You must incriment the current question prior to calling renderPanal
function renderPanel()
{
    if(currentQuestion >= questions.length)
    {
        clearInterval(timer);
        console.log("Score" + currentTime);
        highScores.push( "Name: " + name + "  Score: " +  currentTime);
        saveHighScores();
        renderHighScore();
        return;
    }

    // Display Question
    questionDisplay.innerHTML = questions[currentQuestion].question + "<hr>";

    // Clear All buttons inside the answers container
    // If using jquery, do $(element).clear()
    while (bottomContainer.firstChild) {
        bottomContainer.removeChild(bottomContainer.firstChild);
    }

    // Build and display answers
    for(var i = 0; i < questions[currentQuestion].answers.length; i++)
    {
        var newH2 = document.createElement("h2");
        var newBtn = document.createElement("button");
        newH2.setAttribute("class","col-12 text-center");
        newBtn.setAttribute("class","btn btn-warning");
        newBtn.value = i
        newBtn.addEventListener("click", submitAnswer);
        newBtn.textContent = questions[currentQuestion].answers[i];
        bottomContainer.appendChild(newH2);
        newH2.appendChild(newBtn);
    }
}

function renderHighScore()
{
    // If we get here then the user won / failled or they clicked view high score

    questionDisplay.textContent = "High Scores";
    // Clear All buttons inside the answers container
    // If using jquery, do $(element).clear()
    while (bottomContainer.firstChild) {
        bottomContainer.removeChild(bottomContainer.firstChild);
    }

    for(var i =0; i < highScores.length;i++)
    {
        console.log("writing highscore for " + highScores[i]);
        var newParagraph = document.createElement("p");
        newParagraph.setAttribute("class","col-12 text-center");
        newParagraph.textContent = highScores[i];
        bottomContainer.appendChild(newParagraph);
    }

}

function loadHighScores()
{
    if(localStorage.getItem("scores"))
    {
        highScores = JSON.parse(localStorage.getItem("scores"));
    }
}

function saveHighScores()
{
    localStorage.setItem("scores",JSON.stringify(highScores));
}

function timerTick()
{
    adjustTime(1);
    if(currentTime <= 0)
    {
        currentQuestion = questions.length;
        currentTime = 0;
        renderPanel();
    }
}

function adjustTime(amount)
{
    currentTime -= amount;
    timeDisplay.textContent = "Time: " + currentTime;
}

function submitAnswer()
{
    if(this.value == questions[currentQuestion].correctIndex)
    {
        console.log("Correct!");
        currentQuestion++;
        renderPanel();
    }
    else
    {
        console.log("Wrong!");
        adjustTime(questions[currentQuestion].penaltyValue);
        currentQuestion++;
        renderPanel();
    }
}
