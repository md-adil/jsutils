(function() {
	function Event() {
		this.callbacks = {};
	}
	Event.prototype =  {
		success: function(callback) {
			this.on('success', callback);
			return this;
		},

		error: function(callback) {
			this.on('error', callback);
			return this;
		},

		complete: function(callback) {
			this.on('complete', callback);
			return this;
		},

		on: function(evt, callback) {
			if(!this.callbacks[evt]) {
				this.callbacks[evt] = [];
			}
			this.callbacks[evt].push(callback);
		},

		trigger: function() {
			var self = this,
				evt = arguments[0];
				args = Array.prototype.slice.call(arguments, 1);
				binded = this.callbacks[evt];
			if(binded) {
				binded.forEach(function(cb) {
					cb.apply(self, args);
				});
			}
		}
	};

	if ( typeof module === "object" && module && typeof module.exports === "object" ) {
	  module.exports = Event;
	} else {
	  window.Event = Event;
	  if ( typeof define === "function" && define.amd ) {
	    define( "event", [], function () { return Event; } );
	  }
	}
})();