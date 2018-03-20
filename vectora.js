/************************************************************
*	This code is under MIT licence, 						*
*	you can find the complete file here: VectoraJS/LICENSE	*
*************************************************************/



function Vector(input){


	/*
	*	everything that gives you same information about the array
	*/


	/*
	*	return the amount of the dimensions of the array
	*/
	this.getDimensions = () => {
		let intDimentions = 0;
		//count every existing dimension
		while(typeof(this["num" + intDimentions]) !== "undefined" || this["num" + intDimentions] === null){
			intDimentions++;
		}
		return intDimentions;
	}


	/*
	*	returns the (geometrical) length of the vector
	*/
	this.getLength = () => {
		//multidimensional pythagoras c = squareroot( a^2 + b^2 + c^2 + ....)
		
		//1st add the square of each value
		let numSquareLength = 0;
		for (let intI = 0; intI < this.getDimensions(); intI++) {
			numSquareLength+=this["num" + intI] ** 2;
		}

		// calculate square root
		let numLength = numSquareLength**0.5

		return numLength;
	}


	/*
	*	returns a hash
	*	the function is not perfect
	*	but for most circumstances it works
	*/
	this.getHash = () => {
		//calculate the bits there are in an int for each value
		let intBitsPerDimension = Math.floor(31/this.getDimensions());

		let intHash = 0;

		// go throw each value and xor them in 
		for (let intI = 0; intI < this.getDimensions(); intI++) {
			let numValue = this["num" + intI];
			intHash = intHash^(numValue<<(intBitsPerDimension)*intI)
		}

		return Math.abs(intHash);
	}


	/*
	*	returns a string of the end point of the position vector 
	*/
	this.toString = () => {
		//1st put the the barracked and the 1st value because it is special into the string 
		let strResult = "(" + this["num" + 0];
		//go through each value and also add it
		for (let intI = 1; intI < this.getDimensions(); intI++) {
			strResult += "|" + this["num" + intI];
		};
		//the barracked at the end
		strResult += ")";

		return strResult;
	}


	/*
	*	returns a array with the values of each dimension
	*/
	this.toArray = () => {
		let arrResult = new Array();
		//go through each value and put it into the array
		for (let intI = 0; intI < this.getDimensions(); intI++) {
			arrResult.push(this["num" + intI]);
		};

		return arrResult;
	}




	/*
	*	everything that manipulates the current instance
	*/


	/*
	*	handles constructor input
	*	there are tow types of inputs
	*	1. a number, that then means the amount of dimensions
	*	2. a array,  that then contains the values for each dimension
	*/
	this.init = (input) => {
		//if the input is a number than put a array with the length of input filled with the default value 0
		let arrInput = typeof(input) === "number" ? new Array(input).fill(0) : input;

		//create vector with the value
		this.addDimensions(arrInput);
	}



	/*
	*	add a new dimension with a value
	*/ 
	this.addDimension = (numValue) => {
		//basically push the new value
		this["num" + this.getDimensions() ] = numValue;
	}


	/*
	*	add multiple dimensions with a values
	*/ 
	this.addDimensions = (arrValues) => {
		//go through each value and add them individual
		for (numValue of arrValues) {
			this.addDimension(numValue);
		};
	}




	/*
	*	everything that returns a new vector
	*/


	/*
	*	return a vector with the same values as the original vector
	*/
	this.copy = () => {
		let vecNewVector = new Vector();
		//go throw each value and add them into the new vector
		for (let intI = 0; intI < this.getDimensions(); intI++) {
			vecNewVector.addDimension(this["num" + intI]);
		}
		return vecNewVector;
	}


	/*
	*	multiplies a scalar with this vector
	*/
	this.times = (numScalar) => {
		let vecNewVector = this.copy(); 
		//go throe to each value and multiply it with the scalar
		for (let intI = 0; intI < this.getDimensions(); intI++) {
			vecNewVector["num" + intI] =this["num" + intI] * numScalar;
		}
		return vecNewVector;
	}


	/*
	*	normalize the vector
	*/
	this.normalize = () => {
		let vecNewVector = this.copy();
		vecNewVector = vecNewVector.times(1/vecNewVector.getLength());
		return vecNewVector;
	}


	/*
	*	add two vectors
	*/
	this.add = (vecOtherValue) => {
		//first check if the vector is compatible
		if(this.getDimensions() !== vecOtherValue.getDimensions()){
			console.error("you can not add two vectors with a different amount of dimensions")
			return false;
		}

		let vecNewVector = this.copy();

		//than add each value to its counterpart
		for (let intI = 0; intI < this.getDimensions(); intI++) {
			vecNewVector["num" + intI] += vecOtherValue["num" + intI];
		};
		return vecNewVector;
	}


	/*
	*	subtract two vectors
	*/
	this.subtract = (vecOtherValue) => {
		//first check if the vector is compatible
		if(this.getDimensions() !== vecOtherValue.getDimensions()){
			console.error("you can not subtract two vectors with a different amount of dimensions")
			return false;
		}

		let vecNewVector = this.copy();

		//than subtract each value to its counterpart
		for (let intI = 0; intI < this.getDimensions(); intI++) {
			vecNewVector["num" + intI] -= vecOtherValue["num" + intI];
		};
		return vecNewVector;
	}


	/*
	*	rounds every value of the vector
	*/
	this.round = () => {
		let vecNewVector = this.copy();
		//go trow each value and round them
		for (let intI = 0; intI < this.getDimensions(); intI++) {
			vecNewVector["num" + intI] = Math.round(vecNewVector["num" + intI]);
		};
		return vecNewVector;
	}


	/*
	*	round down every value of the vector
	*/
	this.floor = () => {
		let vecNewVector = this.copy();
		//go trow each value and perform Math.floor on them
		for (let intI = 0; intI < this.getDimensions(); intI++) {
			vecNewVector["num" + intI] = Math.floor(vecNewVector["num" + intI]);
		};
		return vecNewVector;
	}


	/*
	*	round up every value of the vector
	*/
	this.ceil = () => {
		let vecNewVector = this.copy();
		//go trow each value and perform Math.ceil on them
		for (let intI = 0; intI < this.getDimensions(); intI++) {
			vecNewVector["num" + intI] = Math.ceil(vecNewVector["num" + intI]);
		};
		return vecNewVector;
	}




	/*
	*	everything that tells you something about the vector based on other data
	*/


	/*
	*	check if the vector has the same values
	*/
	this.equal = (vecOtherValue) => {
		//first check if the vector is compatible
		if(this.getDimensions() !== vecOtherValue.getDimensions()){
			console.error("you can not compare two vectors with a different amount of dimensions")
			return false;
		}

		//than check if the values are the same
		let boolEqual = true;
		for (let intI = 0; intI < this.getDimensions(); intI++) {
			boolEqual = boolEqual && this["num" + intI] == vecOtherValue["num" + intI];
		};

		return boolEqual;
	}


	/*
	*	calculate the scalar product
	*/
	this.scalarproduct = (vecOtherValue) => {
		//first check if the vector is compatible
		if(this.getDimensions() !== vecOtherValue.getDimensions()){
			console.error("you can not get the scalar product two vectors with a different amount of dimensions")
			return 0;
		}

		let numScalarProduct = 0;
		//go throw each value and add them (a1*b1 + a2*b2 + a3*b3 + ...)
		for (let intI = 0; intI < this.getDimensions(); intI++) {
			numScalarProduct += this["num" + intI] * vecOtherValue["num" + intI];
		}

		return numScalarProduct;
	}


	//init the object
	if(input != null){
		this.init(input);
	}
}





/*
*	creates a vector from a string
*/
parseVector = (strInput) => {
	//1st replace everything that isn't needed
	strInput = strInput.replace("(", "").replace(")", "").replace(" ", "");

	//create the individual numbers
	arrValues = strInput.split("|")
	arrValues.forEach((strValue) => { return parseFloat(strValue); } )

	return new Vector(arrValues);
}

