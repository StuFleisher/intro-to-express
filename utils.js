const { BadRequestError } = require("./expressError");


/** Convert strNums like ["1","2","3"] to [1, 2, 3]. */

function convertStrNums(strNums) {
  // if the conversion isn't successful, throw a BadRequestError and will
  // be handled in your route


  let nums = strNums.map(value=>{
    let valueAsNum = Number(value);
    if (isNaN(valueAsNum)){
      throw new BadRequestError(`${value} is not a number`)

    }
    return valueAsNum;
  });



  return nums;
}


module.exports = { convertStrNums };