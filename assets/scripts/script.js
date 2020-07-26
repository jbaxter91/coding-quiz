
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
    question: "1",
    answers: ["1","2","3","4"],
    correctIndex: 0,
    penaltyValue: 10
}
var panel3 = 
{
    question: "4",
    answers: ["1","2","3","4"],
    correctIndex: 3,
    penaltyValue: 10
}
var panel4 = 
{
    question: "2",
    answers: ["1","2","3","4"],
    correctIndex: 1,
    penaltyValue: 10
}
var panel5 = 
{
    question: "4",
    answers: ["1","2","3","4"],
    correctIndex:3,
    penaltyValue: 10
}
var panel6 = 
{
    question: "1",
    answers: ["1","2","3","4"],
    correctIndex: 0,
    penaltyValue: 10
}
var panel7 = 
{
    question: "3",
    answers: ["1","2","3","4"],
    correctIndex: 2,
    penaltyValue: 10
}
// ----------- End Panels Section -------------

var questions = [panel1,panel2,panel3,panel4,panel5,panel6,panel7];
var currentQuestion = 0;

var answersContainer = document.querySelector("#answersContainer");
var questionDisplay = document.querySelector("#questionDisplay");
questionDisplay.innerHTML = questions[currentQuestion].question + "<hr>";


rebuildPanelDisplay();

// This function clears all buttons off the answers container then repopulates them with the current questions.
// **Note** You must incriment the current question prior to calling rebuildPanaelDisplay
function rebuildPanelDisplay()
{
    // Clear All buttons inside the answers container
    // If using jquery, do $(element).clear()
    while (answersContainer.firstChild) {
        answersContainer.removeChild(answersContainer.firstChild);
    }

    for(var i = 0; i < questions[currentQuestion].answers.length; i++)
    {
        var newH2 = document.createElement("h2");
        var newBtn = document.createElement("button");
        newH2.setAttribute("class","col-12 text-center");
        newBtn.setAttribute("class","btn btn-warning");
        newBtn.value = i
        newBtn.addEventListener("click", submitAnswer);
        newBtn.textContent = questions[currentQuestion].answers[i];
        answersContainer.appendChild(newH2);
        newH2.appendChild(newBtn);
    }
}



function submitAnswer()
{
    if(this.value == questions[currentQuestion].correctIndex)
    {
        console.log("Correct!");
        currentQuestion++;
        rebuildPanelDisplay();
    }
}
