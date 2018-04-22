const prompts = require('./prompts');
const terminalArt = require('./terminalArt');

console.log(terminalArt);

const promptForUsername = new prompts.Prompt(
  'input',
  'username',
  'New users, enter a username; existing users, enter your Crypto Cur username:',
  (input) => {
    if (prompts.sanitize(input, 'username') &&
        prompts.validateInputLength(input, 6, 'username')) {
          return true;
    }
    return false;
  }
);

const promptForPassword = new prompts.Prompt(
  'password',
  'password',
  'Please enter your password:',
  (input) => {
    if (prompts.sanitize(input, 'password') && 
        prompts.validateInputLength(input, 8, 'password')) {
          return true;
    }
    return false;
  }
);

const runPrompts = () => {
  promptForUsername.ask()
  .then(result => console.log(`Hi, ${result.username}. 👋`))
  .then(() => promptForPassword.ask())
  .then(results => console.log(results))
  .catch(error => console.log('An error occurred: ', error));
}

module.exports = runPrompts;