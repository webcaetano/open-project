#!/usr/bin/env node

var http = require('http');
var path = require('path');
var async = require('async');
var _ = require('lodash');
var fs = require('fs');
var argv = require('yargs').argv;
var exec = require('child_process').exec;

var projects = JSON.parse(fs.readFileSync(path.join(__dirname,'./../projects.json')))
var project = projects[argv._[0]];

if(!project){
	console.error('Project not setup');
	process.exit();
}

var runs = [];
_.each(project,function(cmd){
	runs.push(function(callback){
		exec(cmd);
		callback();
	});
});

async.parallel(runs);

setTimeout(function(){
	process.exit();
},2000)


