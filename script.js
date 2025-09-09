var questions = [
    {
        question: "Are you ready to answer my questions?",
        answers: ["What question is this?", "C'mon", "No", "I was born ready"],
        correct: 3
    },
    {
        question: "Who is the best football player ever?",
        answers: ["Messy", "Ronaldo(Suiii)", "Harry Maguire", "Neymar"],
        correct: 1
    },
    {
        question: "Which would be the best collab of 2025?",
        answers: ["TrumpXPutin", "RavanXGandhiji(2oct)", "YouXSrm", "Cannot Say"],
        correct: 3
    },
    {
        question: "The goated time to sleep?",
        answers: ["10PM", "11PM", "3PM", "2PM"],
        correct: 2
    },
    {
        question: "Do you regret joining SRM?",
        answers: ["Yes", "HELL NAHHH", "Can't say", "Ques so goated that everyone knows the answer"],
        correct: 3
    }
];

var currentQuestion = 0;
var score = 0;
var answered = false;

function showQuestion() {
    var q = questions[currentQuestion];

    document.getElementById("question").textContent = q.question;
    document.getElementById("questionNumber").textContent =
        "Question " + (currentQuestion + 1) + " of " + questions.length;

    var answersContainer = document.querySelector(".answers");
    answersContainer.innerHTML = ""; // clear previous buttons

    q.answers.forEach((answer, index) => {
        var btn = document.createElement("button");
        btn.textContent = answer;
        btn.className = "answer-btn";
        btn.onclick = () => checkAnswer(index);
        answersContainer.appendChild(btn);
    });

    document.getElementById("feedback").textContent = "";
    document.getElementById("feedback").style.display = "block";
    document.getElementById("nextBtn").style.display = "none";

    answered = false;
}

function checkAnswer(selectedAnswer) {
    if (answered) return;
    answered = true;

    var q = questions[currentQuestion];
    var buttons = document.getElementsByClassName("answer-btn");

    for (var i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
    }

    if (selectedAnswer === q.correct) {
        score++;
        buttons[selectedAnswer].classList.add("correct");
        document.getElementById("feedback").textContent = "✅ Correct!";
        document.getElementById("feedback").className = "correct-feedback";
    } else {
        buttons[selectedAnswer].classList.add("wrong");
        buttons[q.correct].classList.add("correct");
        document.getElementById("feedback").textContent =
            "❌ Wrong! The correct answer is: " + q.answers[q.correct];
        document.getElementById("feedback").className = "wrong-feedback";
    }

    if (currentQuestion < questions.length - 1) {
        document.getElementById("nextBtn").style.display = "block";
    } else {
        setTimeout(showResults, 2000);
    }
}

function nextQuestion() {
    currentQuestion++;
    showQuestion();
}

function showResults() {
    document.querySelector(".question-info").style.display = "none";
    document.querySelector(".question-box").style.display = "none";
    document.querySelector(".answers").style.display = "none";
    document.getElementById("feedback").style.display = "none";
    document.getElementById("nextBtn").style.display = "none";

    document.getElementById("finalScore").textContent =
        "Your Score: " + score + "/" + questions.length;
    document.getElementById("scoreDisplay").style.display = "block";
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    answered = false;

    document.querySelector(".question-info").style.display = "block";
    document.querySelector(".question-box").style.display = "block";

    // FIX: restore original flex layout
    const answersContainer = document.querySelector(".answers");
    answersContainer.style.display = "flex";

    document.getElementById("feedback").style.display = "block";
    document.getElementById("scoreDisplay").style.display = "none";

    showQuestion();
}

showQuestion();
