var availableButtons = ["red", "green", "yellow", "blue"];

var generatedSequence = [];

var level = 1;
var isGameRunning = false;
var sequenceNumber = 0;

$("#control").click(function ()
{
	if (!isGameRunning)
	{
		isGameRunning = true;
		nextLevel();
	}
});

$("button").click(function ()
{
	if (isGameRunning)
	{
		var clickedButtonID = $(this).attr("id");

		if (clickedButtonID === generatedSequence[sequenceNumber])
		{
			playAudio(clickedButtonID);

			sequenceNumber++;

			if(sequenceNumber === generatedSequence.length)
			{
				sequenceNumber = 0;
				nextLevel();
			}
		}
		else
		{
			gameOver();
		}
	}
});

function nextLevel()
{
	$("#control").text("Level: " + level);
	level++;

	animateButton();
}

function animateButton()
{
	var randomButtonID = availableButtons[getRandomNumber()];

	//console.log(randomButtonID);

	randomButton = $("#" + randomButtonID);

	generatedSequence.push(randomButtonID);

	randomButton.fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

function gameOver()
{
	isGameRunning = false;

	playAudio("wrong");

	$("#control").text("Game Over, Retry?");

	$("body").addClass("game-over");

	setTimeout(function ()
	{
		$("body").removeClass("game-over");
	}, 200);

	generatedSequence = [];

	level = 1;
	isGameRunning = false;
	sequenceNumber = 0;
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