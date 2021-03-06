var generators = require('yeoman-generator');
var chalk = require('chalk');
var path = require('path');

module.exports = generators.Base.extend({
  promptTask: function() {
    var done = this.async();

    // welcome message
    if (!this.options['skip-welcome-message']) {
      this.log(chalk.green(
        "Let's create a new app with React, Underscore, Amygdala and Ampersand.js"
      ));
    }
    this.prompt([{
      type    : 'input',
      name    : 'name',
      type: String,
      validate: function(input) {
        return !!input.trim();
      },
      message : 'Your app name'
    }], function (answers) {
      this.appName = answers.name;
      this.appPath = this._.slugify(answers.name);
      done();
    }.bind(this));
  },
  app: function() {
    this.template('_Router.js', path.join(this.appPath, 'Router.js'));
    this.template('_example.test.js', path.join(this.appPath, 'test/'+ this.appPath +'test.js'));
    this.src.copy('HelloView.js', path.join(this.appPath, 'HelloView.js'));
  },
  end: function() {
    this.log(chalk.green("App Created.. initialize your router on `index.js` to finish the setup:"));
    this.log(chalk.magenta("  var " + this.appPath + "Router = require('./"+ this.appPath +"/Router.js')"));
    this.log(chalk.magenta("  new " + this.appPath + "Router();"));
  }
});
