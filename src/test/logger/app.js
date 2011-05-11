define(['lib/console'], function() {
	
	$('#failedDebug').click(function(evt){
		evt.preventDefault();
		console.debug('It failed : '+toto.name);
		return false;
	});
	
	$('#debug').click(function(evt){
		evt.preventDefault();
		console.debug('It works');
		return false;
	});
	
	$('#filteredError').click(function(evt){
		evt.preventDefault();
		LOGGER_CONF['logger.unknown'] = 'unknown';
		
		// Unknown level must appear.
		console.debug('[logger.unknown] Must appear');
		
		// Unconfigured logger name must appear.
		console.debug('[unknown] Must appear');
		
		// No logger must appear.
		console.debug('Must appear');
		
		// Misformated logger must appear.
		console.debug('[mistformated.logger MUST appear');

		return false;
	});
	
	$('#filteredDebug').click(function(evt){
		evt.preventDefault();
		LOGGER_CONF['logger.debug'] = 'debug';
		LOGGER_CONF['logger.info'] = 'info';
		LOGGER_CONF['logger.warn'] = 'warn';
		LOGGER_CONF['logger.error'] = 'error';
		LOGGER_CONF['logger.off'] = 'off';
		LOGGER_CONF['logger.all'] = 'all';
		
		// Filtering on debug level
		console.debug('[logger.debug] Must appear');
		console.info('[logger.debug] Must appear');
		console.warn('[logger.debug] Must appear');
		console.error('[logger.debug] Must appear');
		
		// Filtering on info level
		console.debug('[logger.info] Must NOT appear');
		console.info('[logger.info] Must appear');
		console.warn('[logger.info] Must appear');
		console.error('[logger.info] Must appear');

		// Filtering on warn level
		console.debug('[logger.warn] Must NOT appear');
		console.info('[logger.warn] Must NOT appear');
		console.warn('[logger.warn] Must appear');
		console.error('[logger.warn] Must appear');

		// Filtering on error level
		console.debug('[logger.error] Must NOT appear');
		console.info('[logger.error] Must NOT appear');
		console.warn('[logger.error] Must NOT appear');
		console.error('[logger.error] Must appear');

		// Filtering on all level
		console.debug('[logger.all] Must appear');
		console.info('[logger.all] Must appear');
		console.warn('[logger.all] Must appear');
		console.error('[logger.all] Must appear');

		// Filtering off level
		console.debug('[logger.off] Must NOT appear');
		console.info('[logger.off] Must NOT appear');
		console.warn('[logger.off] Must NOT appear');
		console.error('[logger.off] Must NOT appear');
		return false;
	});
	
	$('#dir').click(function(evt){
		var name = "toto";
		evt.preventDefault();
		console.debug({message:'It works'});
		return false;
	});
});
