# custom-jasmine-specrunner
NodeJS script which creates a jasmine SpecRunner.html using customizable file path config.

This script was created to make my life easier when debugging jasmine tests and to keep me from punching the monitor each time karma test runner with chrome crashed when debugging.

The generated **custom-spec-runner.html** can be run in any browser of your choice to debug/ execute tests in jasmine spec runner environment for the specified single spec. The html just needs to be refreshed after each time the script is run.

Currently the script assumes that the file naming pattern of spec files to be __*.spec.js__.

# Installation
1. Install NodeJS.
2. Unzip the contents to any folder of your choice (currently the required node modules are already provided).

# Usage
By default the jasmine spec runner lib files will be bootstrapped by the script.

#### Example
To generate the custom-spec-runner.html from the base directory run: 
```
node gen-custom-spec-runner.js
```
The html file can be opened which displays the default jasmine spec runner details and will not contain any specs.

To load a spec, the spec file name is passed as the third argument on the run command as shown below. The project contains a sample spec file **example.spec.js** which can be loaded into the spec-runner by executing: 
```
node gen-custom-spec-runner.js example.spec.js
```
The generated spec-runner will now have a single passing spec.

#### Configuring for your application
The application source _*.js_ and test _*.spec.js_ files can be loaded onto the html by specifying file paths in order (if required) in the provided **custom-config.js** file. By default the script will ignore any file with 'spec' in its name. The file path config must contain the path of your _*.js_ and _*.spec.js_ files. 

The config file already contains the file paths to bootstrap jasmine library and the example spec. Your file paths should go after the existing paths to ensure that jasmine is bootstrapped first. Also the file paths can be absolute or relative to the spec-runner project base directory.
