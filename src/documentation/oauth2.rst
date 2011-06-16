==============
OAuth2 support
==============

RESThub JS is provided with an `OAuth2 protocol <http://tools.ietf.org/html/draft-ietf-oauth-v2>`_ support that allows Javascript applications to authenticate on serverside webservises protected by OAuth2 configured with `password grant type <http://tools.ietf.org/html/draft-ietf-oauth-v2>`_.

Authentication
--------------

.. code-block:: javascript

	/**
	 * Set the unique identifier of the client (this Javascript aplication)
	 */
	OAuth2Client.clientId =  'myClientId';
	
	/**
	 * Set the unique secret(password) of the client (this Javascript aplication)
	 */
	OAuth2Client.clientSecret = 'myClientPassword';
	
	/**
	 * Set the url of the authorization token end-point which issued tokens
	 */
	OAuth2Client.tokenEndPoint = 'oauth/authorize';
		
	/**
	 * Set the key used to store token in local storage
	 */
	OAuth2Client.storageKey: 'oauth2Token';

	/**
	 * Sends a request to get the access token.
	 * An OAuth 2 "token request" is sent to the OAuth2Client.tokenEndPoint url.
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
	OAuth2Client.login: function( username, password, success, error );

