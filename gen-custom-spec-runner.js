var _ = require('underscore');
var path = require('path');
var glob = require('glob');
var fs = require('fs');
var file_paths  = [];
async = require("async");
var spec_file_name = process.argv[2];
var conf = require('./custom-config.js');

async.eachSeries(files, function(pattern, processHtml) {
	
	glob(pattern, function(er, fileArray){
		_.each(fileArray, function(file){
			var basename = path.basename(file);
			var stats = fs.statSync(file);
			if(!_.find(file_paths, function(item){
				return item === file;
			})){
				if(basename === spec_file_name) {
					file_paths.push(file);
//					console.log(basename);
				} else if(file.indexOf('spec') < 0){
					file_paths.push(file);
//					console.log(basename);
				}
			}
		});
		processHtml();
	});
}, function(err){
	processHtml('done');
}
);


function processHtml(status) {
	console.log(status);
	if(status === 'done'){
		var fileName = 'custom-spec-runner.html';
		var stream = fs.createWriteStream(fileName);
		stream.once('open', function(fd){
			var html = buildHtml();
			stream.end(html);
		});
	}
};

var jasmine_icon_path = 'jasmine-standalone-2.2.0/lib/jasmine-2.2.0/jasmine_favicon.png';
var jasmine_css_path = 'jasmine-standalone-2.2.0/lib/jasmine-2.2.0/jasmine.css';
function buildHtml(){
	console.log("Number of files loaded: " + file_paths.length);
	var html_begin = '<!DOCTYPE html>'
			+  '<html>' + '<head>' +
			'<link rel="shortcut icon" type="image/png" href="' + jasmine_icon_path + '">' +
			'<link rel="stylesheet" href="' + jasmine_css_path +'">' ;
	var script_type_begin = '<script type="text/javascript" src="';
	var script_type_end = '"> </script>';
	var html_end =  '</head>' + '<body>' + '</body>' + '</html>';
	var output = '' + html_begin;
	file_paths.forEach(function(file){
		output +=  script_type_begin + file + script_type_end;
	});
	
	output += html_end;
	return output;
}