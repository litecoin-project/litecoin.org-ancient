//
// Copyright (c) 2013 Litecoin Developers
//
// Miniature process watchdog & logger
//

var _ = require("underscore"),
    spawn = require("child_process").spawn,
	zutils = require("zetta-utils");

function Application() {

	var self = this;

	var logger = new zutils.Logger({ filename : 'logs/site.log' });

    self.process = { }
	var processes = 
	{
		'site' : { script: 'site.js' },
	}

    _.each(processes, function(o, name){
    	self.process[name] = new zutils.Process({ 
    		process: o.process || process.execPath, 
    		args: o.script ? [o.script] : o.args, 
    		descr : name,
    		logger : logger
    	});
    	self.process[name].run();
    });
}

GLOBAL.app = new Application();