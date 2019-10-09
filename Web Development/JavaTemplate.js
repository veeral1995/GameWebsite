"use strict"
//     Veeral Patel
//     11/11/15
//     TicTacToe


	var markCount;
	var winningCombos;
	var boardState;

window.onload=function()
{
	var i;

	setMarkCount(0);
	i=0;
	while (i < 9)
		{
		document.getElementById("square"+i).onclick = markTheSquare;
		i = i + 1;

		}

	setWinningCombinations("012 345 678 036 147 258 246 048");
	setBoardState(getWinningCombinations());

	var x = document.getElementById("reset");
	x.onclick = clearBoard;
}

function clearBoard ()
{
	location.reload();
}

function updateBoardState (letter,boxNum)
{
		var winners;
		var localBoardState;
		var location;

		location = -1;
		winners = getWinningCombinations();
		localBoardState = getBoardState();

		location = winners.indexOf(boxNum,location+1);
		while (location >= 0)
		{
			localBoardState = replaceCharacterInString(localBoardState,location,letter);
			location = winners.indexOf(boxNum,location+1);
		}
		setBoardState(localBoardState);
}

function replaceCharacterInString(source, where, what)
{
	return source.substring(0,where) + what + source.substring(where+1,source.length);
}

function getBoardState ()
{
	return boardState;
}

function setBoardState (value)
{
	boardState = value;
}

function getWinningCombinations ()
{
	return winningCombos;
}

function setWinningCombinations (value)
{
	winningCombos = value;
}

function markTheSquare()
{
	this.onclick = null;
	this.innerHTML = getXorO();


	var localBoardState;
	var localWinningCombos;
	var playerMark;
	var foundAt;
	var elementId;
	var i;
	foundAt = -1;

	updateBoardState(getXorO(),this.id.charAt(this.id.length-1));

	playerMark = getXorO()+getXorO()+getXorO();
	localBoardState = getBoardState();
	localWinningCombos = getWinningCombinations();
	foundAt = localBoardState.indexOf(playerMark,foundAt+1);

	while(foundAt >= 0)
	{
		i = 0;
			while(i<9)
			{
				document.getElementById("square"+i).onclick = null;
				i = i + 1;
			}
		i = 0;
			while(i<=3)
			{
				elementId = document.getElementById("square" + (localWinningCombos.charAt(foundAt+i)));
				elementId.style.color = 'red';
				i = i + 1;
			}
			foundAt = localBoardState.indexOf(playerMark,foundAt+1);
	}


	setMarkCount(getMarkCount()+1);
	foundAt = -1;
}

function getMarkCount()
{
	return markCount;
}

function setMarkCount (value)
{
	markCount = value;
}

function getXorO ()
{
	var letters;
	var position;

	position = getMarkCount()%2;
	letters = "XO";

	return (letters.charAt(position));
}