define([ 'lib/repository', 'lib/oauth2controller' ], function(Repository, OAuth2Controller) {

	/**
	 * Use this special Repository implementation when accessing a backend protected with OAuth2.
	 */
	return Repository.extend("OAuth2Repository", {
		
		/**
		 * Overload of the Repository ajax method to add the OAuth2 token when available.
		 * The token is retrieved in the $.storage() with the key OAuth2Controller.storageKey.
		 */
		_ajax : function(url, callback, type, data) {
			// Gets the token existing in session.
			var accessToken = $.storage.get(OAuth2Controller.storageKey);
			// Triggers the ajax call.
			$.ajax({
					
				// Adds the access token in the request header.
				beforeSend: function( XMLHttpRequest ) {
					if(accessToken && "access_token" in accessToken) {
						XMLHttpRequest.setRequestHeader("Authorization", 
								'OAuth '+ accessToken.access_token);
					}
				},
				
				// Gets the protocol errors.
				error: function( XMLHttpRequest, textStatus, errorThrown ) {
					// Only for 400, 401 and 403 scopes.
					if(XMLHttpRequest.status == 400 ||
							XMLHttpRequest.status == 401
							// || 
							//XMLHttpRequest.status == 403
							//TODO fix http://bitbucket.org/ilabs/resthub/issue/42/oauth2-resthuboauth2js-oauth2ajax
							) {
						// Extract the WWW-Authenticate response header.
						var error = XMLHttpRequest.getResponseHeader("WWW-Authenticate");
						var errorObj = {};
						errorObj.status='';
						errorObj.message='';
						// Parse the error status and optionnal message.
						var i = error.indexOf('error="');
						if (i != -1) {
							errorObj.status = error.substring(i+7, error.indexOf('"', i+7));
						} else {
							errorObj.status = 'invalid_request';
						}
						i = error.indexOf('error_description="');
						if (i != -1) {
							errorObj.message = error.substring(i+19, error.indexOf('"', i+19));
						}
						if (this.authorizationError instanceof Function) {
							this.authorizationError.call(params, errorObj, XMLHttpRequest);
						}
					}	
				},
				
				url : url,
				dataType : this.defaults.dataType,
				contentType : this.defaults.contentType,
				type : type,
				data : data,
				success : callback
			});
		}
	}, {});
});
