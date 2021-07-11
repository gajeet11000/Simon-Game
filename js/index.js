var availableButtons = ["red", "green", "yellow", "blue"];
var generatedSequence = [];
var userClickedSequence = [];

var level = 1;
var gameOver = false;
var sequenceNumber = 0;



$("#control").click(controlFlow);

function controlFlow()
{
	if (!gameOver)
	{
		$("button").click(buttonClick);
		startGame();
	}
	else
	{
		playAgain();
	}
}

function buttonClick()
{
	if (!gameOver)
	{
		var buttonPressed = $(this).attr("id");
		if (buttonPressed === generatedSequence[sequenceNumber])
		{
			playAudio(buttonPressed);
			newSequence();
		}
		else
		{
			gameOverEnd();
		}
	}
}

function startGame()
{
	$("#control").off("click");
	levelUp();
	animateButton();
}

function levelUp()
{
	$("#control").text("Level: " + level);
	level++;
}

function animateButton()
{
	var randomButtonId = availableButtons[getRandomNumber()];

	randomButton = $("#"+randomButtonId);

	setTimeout(function ()
	{
		randomButton.fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
	}, 400);
	

	generatedSequence.push(randomButtonId);
}

function newSequence()
{
	sequenceNumber++;
	if (sequenceNumber === generatedSequence.length)
	{
		sequenceNumber = 0;
		userClickedSequence = [];
		startGame();
	}
}

function playAgain()
{
	gameOver = false;

	level = 1;
	sequenceNumber = 0;

	generatedSequence = [];
	$("button").on("click", buttonClick);
	startGame();
}

function gameOverEnd()
{
	$("button").off("click");
	$("#control").on("click", controlFlow);
	gameOver = true;
	playAudio("wrong");
	$("body").addClass("game-over");
	setTimeout(function ()
	{
		$("body").removeClass("game-over");
	}, 200);
	$("#control").text("Game Over, Retry?");
}

function getRandomNumber()
{
	return Math.floor(Math.random() * 4);
}


function playAudio(name)
{
	var audio;

	switch(name)
	{
		case "red": audio = new Audio("mp3s/red.mp3");break;
		case "green": audio = new Audio("mp3s/green.mp3");break;
		case "yellow": audio = new Audio("mp3s/yellow.mp3");break;
		case "blue": audio = new Audio("mp3s/blue.mp3");break;
		case "wrong": audio = new Audio("mp3s/wrong.mp3");break;
	}

	audio.play();
}