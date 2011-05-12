/*!
 * jQuery OAuth 2 implementation
 * 
 * May be used as standalone functions, or directly in ResthubController widget.
 * 
 * Does not manage the access token storage, nor that the protocol errors.
 * Users could thus plug their own storage and error management solutions. 
 */
define(['lib/controller', 'lib/jquery'], function(Controller) {

	/**
	 * Use this special Controller implementation when accessing a backend protected with OAuth2.
	 * 
	 * You MUST define first the tokenEndPoint, clientId and clientSecret static attributes.
	 * 
	 * Then call getOAuth2token() to authenticate the end-user and get the corresponding token.
	 * This token will be stored in $.storage with key OAuth2Controller.storageKey
	 */
	return Controller.extend('OAuth2Controller', {
		/**
		 * Static configuration used for OAuth 2 protocol calls with the server.
		 */

		/**
		 * Unic identifier of the client (the webapp).
		 * Not used for now.
		 */
		clientId: '',
		
		/**
		 * Unic secret(password) of the client (the webapp).
		 * Not used for now.
		 */
		clientSecret: '',
		
		/**
		 * Url of the authorization token end-point which issued tokens.
		 */
		tokenEndPoint: '',
		
		/**
		 * Key used to store token in storage.
		 */
		storageKey: 'oauth2Token'
	}, {
				
		/**
		 * Sends a request to get the access token.
		 * An OAuth 2 "token request" is sent to the OAuth2Controller.tokenEndPoint url.
		 * 
		 * The returned token (if successful) is given to the specified callback.
		 * The retrieved token is stored in $.storage(), for further uses.
		 * 
		 * @param username The resource owner login (end-user login).
		 * @param password The resource owner password (end-user password).
		 * @param success A callback, called when the token is returned by the server.
		 * This function takes only one parameter, which is the token (JSON structure).
		 * @param error A callback, called when the server refused to issue a token.
		 * This function takes two parameters: the first is the error string, and the second
		 * an option explanation.
		 */
		getOAuth2token: function( username, password, success, error ) {	
			var _this = this;
			
			// Performs a request to get an authentication token.
			$.ajax({
					url: OAuth2Controller.tokenEndPoint,
					type: 'POST',
					data: {
						client_id: OAuth2Controller.clientId,
						client_secret: OAuth2Controller.clientSecret,
						grant_type: "password",
						username: username,
						password: password
					},
					success: function ( data, textStatus, XMLHttpRequest ) {
						$.storage.set(OAuth2Controller.storageKey, data);
						// Calls the callback
						if (success instanceof Function) {
							success.call( this, data );
						}
					},
					error: function ( XMLHttpRequest, textStatus, errorThrown ) {
						// Only for OAuth protocol errors.
						if (XMLHttpRequest.status == 400 || XMLHttpRequest.status == 401) {
							if (error instanceof Function) {
								error.call( this, "Authentication error", "Unable to login due to bad credentials");
							}
						}
					} 
			});
		} // getOauth2token().
	});						
});