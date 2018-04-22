const inquirer = require('inquirer');

function Prompt(inputType, dataCollected, userPrompt, validation) {
  this.inputType = inputType;
  this.dataCollected = dataCollected;
  this.userPrompt = userPrompt;
  this.validation = validation;
  this.ask = function() {
    return new Promise((resolve, reject) => {
      inquirer.prompt([
        { 
          name: this.dataCollected,
          type: this.inputType,
          message: this.userPrompt,
          validate: this.validation
        }
      ])
      .then(result => resolve(result))
      .catch(error => reject(error));
    })
  };
}

function sanitize(input, dataField) {
  if (typeof(input) !== 'string') {
    throw new Error('function "sanitize" expected type: "string" as 1st and only argument.');
  }
  if (typeof(dataField) !== 'string') {
    throw new Error('function "sanitize" expected type: "string" as 2nd argument.');
  }
  const regEx = /^[#\$%\^\&*\)\(+=.-]+$/g;
    if (input.match(regEx)) {
      console.log('\n🙅  Your username may not contain the following characters: ... ');
      return false;
    } else {
      return true;
    }
}

function validateInputLength(input, minLength, dataField) {
  if (typeof(input) !== 'string') {
    throw new Error('function "validateInputLength" expected type: "string" as 1st argument.');
  }
  if (typeof(minLength) !== 'number') {
    throw new Error('function "validateInputLength" expected type: "number" as 2nd argument.');
  }
  if (typeof(dataField) !== 'string') {
    throw new Error('function "validateInputLength" expected type: "string" as 3rd argument.');
  }
  if (input.length > minLength) {
    return true;
  } else {
    console.log(`\n🙅  Please ensure your password is over ${minLength} characters in length.`);
    return false;
  }
}

module.exports = {
  Prompt: Prompt,
  sanitize: sanitize,
  validateInputLength: validateInputLength
}