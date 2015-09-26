var fs = require('fs'),
    _ = require('underscore'),
    child = require('child_process');

var label = 'weekly';
var keep = 2;
var fs = 'tank/Rick';
var cmd = 'ssh -t beo ssh -t enterprise zfs-auto-snapshot --destroy-only -n -v -k '+keep+' -l '+label+' '+fs;
cmd = cmd.split(' ');


var destroys=[];
var z = child.spawn(cmd[0], cmd.slice(1,cmd.length));
z.on('exit', function(code){
	console.log(destroys);
});
z.stdout.on('data', function(out){
	out=out.toString().split('\n');
	_.each(out, function(line){
		if(line.match(/^zfs destroy -r/))
			destroys.push(line);
	});
});
z.stderr.on('data', function(out){
	out=out.toString();
});
