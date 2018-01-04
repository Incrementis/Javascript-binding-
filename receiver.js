/*
	====================================================================================================
	
	NOTE: 
	Parts of code in the functions below could be optimized, but due to simplicity and
	demonstration purpose, it is kept as it is.
	
	The topic focused contents are commented with the keyword "ATTENTION"
	
	Due to much lines of code, the code is commented a lot to guarantee understanding. 
	Depending on the developers javascript experience and improving naming(functions, variables),
	the amount of comments could be reduced.
	
	====================================================================================================
*/


"use strict";

var Table =
{
	
	hasImages: document.getElementsByClassName('parts'),	//Tag area filled with images
	hasImageNames: [],					//Image filenames
	hasRandomNumbers: [],					//For random generated image positions
	hasStamps:[],						//Stamp filenames
	isStamped:[],						//List of user made stamps
	hasCounted: 0,						//Mouse click counter
	
	//Purpose: Gets the image names which are later needed to show them in web browser
	setImageNames: function()
	{
		for(var name = 0; name < arguments.length; name++)
		{
			var image = arguments[name] + ".png";
			
			this.hasImageNames.push(image);
		}
		
	},

	//Purpose: Gets the stamp image names which are later needed to show them in web browser
	setStamps: function()
	{
		for(var stamp = 0; stamp < arguments.length; stamp++)
		{
			var stampName = arguments[stamp] + ".png";
			
			this.hasStamps.push(stampName);
		}
	},
	
	//Purpose: Generates a random number between 0 and 9
	setPositions: function()
	{

		//just in case - visualizing the value distinctly - for debugging
		var random = "NONE";

		for(var index = 0; index < 9; index++)
		{
			random = Math.floor(Math.random() * 9);
			
			//If it is the first random number at all - no redundancy check is needed
			if(index ===  0)
			{
				this.hasRandomNumbers.push(random);
			}
			else
			{	
				
				var run = true;
				var unique = false;
 

				//"run" is "true" until a unique random number is found
				while(run)
				{

					//Checking if the random number is found unique in the list
					for(var check = 0; check < this.hasRandomNumbers.length; check++)
					{
						
						if(this.hasRandomNumbers[check] !== random)
						{
							unique = true;
						}
						else
						{
							unique = false;
							
							//No need to check the rest!
							break;
						}

					}
					
					//If not unique try again
					if(unique === false)
					{
						
						random = Math.floor(Math.random() * 9);

					}
					else
					{
						
						this.hasRandomNumbers.push(random);
						
						//Searching a unique number for the recent "index" will be stopped
						run = false;

					}

				}//while

			}//else
			
		}//for

	},//setPosition
	
	//Purpose: Sets the parts as Background images
	setBackground: function(image, position)
	{
		//Takes the calculated positions as index to take the correct image name from the list
		var background = 'url(' + this.hasImageNames[image] + ')';
		
		//Going from left to right and putting the taken pictures from the list into the web browser
		this.hasImages[position].style.backgroundImage = background;
		
	},
	
	//Purpose: Setting the stamp image on to the table part which was clicked
	getStamp: function(position)
	{
		
		
		if(this.hasCounted < 9)
		{
			var imageTag = '<img src="' + this.hasStamps[this.hasCounted] + '">'; 
			
			this.hasImages[position].innerHTML = imageTag;
			
			//Saving the positions to check later if they stamps are correct set
			this.isStamped.push(position)
			
			this.hasCounted++;
		}
		
	},

	//Purpose: Gives feedback which parts were chosen correctly
	go: function(stamp, solution)
	{
		var playerStamp = this.isStamped;
		
		//USER-ERROR
		if(stamp !== playerStamp[solution])
		{
			//Keyword "throw" is here used to break the forEach loop, but it is not a pretty solution!!!
			alert("I am sorry, but your answer is not correct!");
			throw "You can ignore this error!"; 
		
		}
		
		//INTERN-ERROR
		if(typeof stamp !== typeof playerStamp[solution])
		{
			//In this case throw should be acceptable, because it is an intern error!
			alert("FATAL ERROR: Array elements are not of the same type!");
			throw "FATAL ERROR: Array elements are not of the same type!";
			
		}
	},
	
	//Purpose: Resets the stamps
	reset:function(stamp)
	{
		stamp.innerHTML = "";
		this.hasCounted = 0;
		this.isStamped = [];
		
	}
}


//Purpose: Distributes the images randomly by loading site view
function distribute()
{
	
	
	/*
		ATTENTION:
		Using the provided receiver parameter of "forEach"
	*/
	Table.hasRandomNumbers.forEach(Table.setBackground, Table);
}


/*
	===================
	Initializing Puzzle
	===================
*/

Table.setImageNames(	"puzzle/Part0", "puzzle/Part1", "puzzle/Part2", 
			"puzzle/Part3", "puzzle/Part4", "puzzle/Part5", 
			"puzzle/Part6", "puzzle/Part7", "puzzle/Part8");
					
Table.setStamps("puzzle/Stamp0", "puzzle/Stamp1", "puzzle/Stamp2", 
		"puzzle/Stamp3", "puzzle/Stamp4", "puzzle/Stamp5", 
		"puzzle/Stamp6", "puzzle/Stamp7", "puzzle/Stamp8");
					
Table.setPositions();

distribute();


/*
	===========
	Interacting
	===========
*/

//Purpose: Checks which table position is clicked and stamps it with the required number
function stamping(field)
{

	Table.getStamp(field);

}


//Purpose: Checks if the stamps are set correctly
function going()
{
	//CHEATS
	//console.log("puS", Table.hasRandomNumbers);
	//console.log("plS", Table.isStamped);
		
	var puzzleSolution = Table.hasRandomNumbers;

	var playerSolution = Table.isStamped;
	
	//USER-ERROR
	if(puzzleSolution.length !== playerSolution.length)
	{
		
		alert("Please fill the correct number of stamps!");
		
		return 0;
		
	}
	
	//INTERN-ERROR
	if(typeof puzzleSolution !== typeof playerSolution)
	{
		
		alert("FATAL ERROR: Array objects are not of the same type!")
		throw "FATAL ERROR: Array objects are not of the same type!";
		
		return 0;
		
	}
	
	
	/*
		ATTENTION: 
		Using bind for comparing the array elements
	*/
	puzzleSolution.forEach(Table.go.bind(Table));
	
	//CONGRATS
	alert("CONGRATULATION!!! You solved the puzzle :)!")
	
	//Visualizing the right outcome
	var solvedPuzzle = document.getElementById('solved');
	solvedPuzzle.innerHTML = '<img src="Result.jpg">';
	
}


//Purpose: Resets all the Stamps, so the user can interact from start
function reseting()
{
	//Converting into an Array object, because "Table.hasImages" is a dictonary object
	var images = [].slice.call(Table.hasImages);
	
	/*
		ATTENTION:
		Using a wrapper function in "forEach"
	*/
	images.forEach(function(stamp)
	{

		Table.reset(stamp);
	
	});
}
