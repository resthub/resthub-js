define(['lib/class', 
        'test/class/statics', 
        'test/class/inheritance', 
        'test/class/attributes', 
        'test/class/init'], function(Class) {

	var Resource = Class.extend({
	  init: function(name) {
	    this.name = name;
	  }
	});

	var Project = Resource.extend({
	  init: function(name) {
	    this._super( 'Ping ' + name );
	  }	  
	});
	
	var ProjectContainer = Project.extend({
	  init: function(name){
	    this._super( 'Pong ' + name );
	  }
	});


	$('.create').click(function() {
		var r1 = new Resource('r1');
		var p1 = new Project('p1');
		var pc1 = new ProjectContainer('pc1');
		$('#main').html('Resource name : ' + r1.name +
						'<br />project name : ' + p1.name +
						'<br />project container name : ' + pc1.name);
	});

});
