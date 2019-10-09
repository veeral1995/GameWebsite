"use strict";
/*
	Danny Sullivan
	CISC 131
	Dec. 8, 2014
	Game of Life
*/
window.onload=function()
{
	var gameBoardArray;
	var tempArray;
	var element;

	element= document.getElementById("gameBoard");
	gameBoardArray= create2dArray(100, 100, 0);
	tempArray= copy2darray(gameBoardArray);

	createGameBoard(element, gameBoardArray);
	createFirstGeneration(gameBoardArray);

	var i;
	var j;

	for(i=0; i < gameBoardArray.length; i++)
	{
		for(j=0; j < gameBoardArray[i].length; j++)
		{
			if(gameBoardArray[i][j] === 1){document.getElementById("r" + i + "c" + j).style.backgroundColor= getLiveColor();}
			else{document.getElementById("r" + i + "c" + j).style.backgroundColor= getDeadColor();}
		}
	}
	window.setInterval(function() {applyRules(gameBoardArray, tempArray);}, 500);
};

function applyRules(array2d, tmpArray)
{
	var i;
	var j;

	for(i=0; i < array2d.length; i++)
	{
		for(j=0; j < array2d[i].length; j++)
		{
			tmpArray[i][j]= countLivingNeighbors(array2d, i, j);
		}
	}
	for(i = 0; i < array2d.length; i++)
	{
		for(j = 0; j < array2d[i].length; j++)
		{
			if(tmpArray[i][j] < 2){array2d[i][j]= 0;}
			if(tmpArray[i][j] > 3){array2d[i][j]= 0;}
			if(tmpArray[i][j] === 3){array2d[i][j]= 1;}
			if(array2d[i][j] === 1){document.getElementById("r" + i + "c" + j).style.backgroundColor= getLiveColor();}
			else{document.getElementById("r" + i + "c" + j).style.backgroundColor= getDeadColor();}
		}
	}
}

function countLivingNeighbors(array2d, i, j)
{
	var count;

	count= 0;
	if(isInArray(array2d, i+1, j) && isAlive(array2d[i+1][j])){count= count+1;}
	if(isInArray(array2d, i-1, j) && isAlive(array2d[i-1][j])){count= count+1;}
	if(isInArray(array2d, i, j+1) && isAlive(array2d[i][j+1])){count= count+1;}
	if(isInArray(array2d, i, j-1) && isAlive(array2d[i][j-1])){count= count+1;}
	if(isInArray(array2d, i+1, j+1) && isAlive(array2d[i+1][j+1])){count= count+1;}
	if(isInArray(array2d, i+1, j-1) && isAlive(array2d[i+1][j-1])){count= count+1;}
	if(isInArray(array2d, i-1, j-1) && isAlive(array2d[i-1][j-1])){count= count+1;}
	if(isInArray(array2d, i-1, j+1) && isAlive(array2d[i-1][j+1])){count= count+1;}

	return count;
}

function createFirstGeneration(array2d)
{
	var i;
	var j;
	var k;
	var row;
	var column;

	for(i=0; i < array2d.length; i++)
	{
		for(j=0; j < array2d[i].length; j++)
		{
			if(i === j || i == j || (i + j) % 2 === 0)
			{
				array2d[i][j]= getAliveValue();
			}
		}
	}
}

function copy2darray (array)
{
	var i;
	var j;
	var result;

	result= new Array(array.length);

	for(i=0; i < result.length; i++)
	{
		result[i]= new Array(array[i].length);
		for(j=0; j < result[i].length; j++)
		{
			result[i][j]= array[i][j];
		}
	}
	return result;
}

function create2dArray(rows, columns, initialValue)
{
	var i;
	var j;
	var result;

	result= new Array(rows);

	for(i=0; i < result.length; i++)
	{
		result[i]= new Array(columns);
		for(j=0; j < result[i].length; j++)
		{
			result[i][j]= initialValue;
		}
	}
	return result;
}

function isInArray(array2d, row, column)
{
	if(row >= 0 && row < array2d.length && column >= 0 && column < array2d[row].length) {return true;}
	else{return false;}
}

function getDeadColor()
{
	return 'black';
}

function getLiveColor()
{
	return getRandomRGB();
}

function isAlive(cell)
{
	if(cell === 1){return true;}
	else{return false;}
}

function getDeadValue()
{
	return 0;
}

function getAliveValue()
{
	return 1;
}

function createGameBoard(containerElement, array2d)
{
 	var i;
    var j;
    var count;
    var html;
    var classInfo;

    html = "";
    count = 0;

    for(i = 0; i < array2d.length; i++)
    {
        if(i === 0){classInfo = 'cell firstRow newRow';}
        else{classInfo = 'cell newRow';}

        for(j = 0; j < array2d[i].length; j++)
        {
            if(i === 0 && j === array2d[i].length - 1){classInfo = 'cell firstRow lastColumn';}
            if(i !== 0 && j === array2d[i].length - 1){classInfo = 'cell lastColumn';}
            html = html + createHTMLElement('div', 'r' + i + 'c' + j, classInfo, null);
            if(i === 0){classInfo = 'cell firstRow';}
            else{classInfo = 'cell';}
            count = count + 1;
        }
    }
    containerElement.innerHTML = html;
}

function createHTMLElement(elementType, id, classInfo, content)
{
	if(elementType === null)
	{
		elementType= "";
	}
	else
	{
		trim(elementType);
	}

	if(id === null)
	{
		id= "";
	}
	else
	{
		trim(id);
		id= ' id = "' + id + '" ';
	}

	if(classInfo === null)
	{
		classInfo= "";
	}
	else
	{
		trim(classInfo);
		classInfo= 'class= "' + classInfo + '"';
	}

	if(content === null)
	{
		content= "";
	}
	else
	{
		trim(content);
	}
	return '<' + elementType + id + classInfo + '>' + content + '</'+ elementType + '>';
}

function trim(data)
{
	var whiteSpace;
	var start;
	var end;
	var result;

	if(typeof data === "string")
	{
		whiteSpace = " \n\r\t\f";
		start = 0;

		while(start < data.length && whiteSpace.indexOf(data.charAt(start)) >= 0)
		{
			start = start + 1;
		} //while
		end = data.length - 1;

		while(end >= 0 && whiteSpace.indexOf(data.charAt(end)) >= 0)
		{
			end = end - 1;
		} //while

		if(end < start) { result = ""; }

		else { result = data.substring(start, end + 1); }
	}
	else { result = data; }
	return result;
}

function getRandomInteger(upperLimit)
{
	var result;
	result= Math.random();
	result= result *(upperLimit+1);
	result= Math.floor(result);
	return result;
}

function getRandomRGB()
{
	var blue;
	var green;
	var red;
	red= getRandomInteger(255);
	blue= getRandomInteger(255);
	green= getRandomInteger(255);
	return "rgb(" + red + "," + green + "," + blue + ")";
}