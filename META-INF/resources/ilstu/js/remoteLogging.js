(function() {
	var FILE_ID = "remoteLogging.js";
	/**
	 * @namespace ilstu.remotelogging
	 */
	angular.module('ilstu.remotelogging', []);
	angular.module('ilstu.remotelogging').provider('ilstuRemoteLogging', ilstuRemoteLoggingProvider);

	/**
	 * @name remoteLoggingProvider
	 * @member ilstu.remotelogging
	 * @ngInject
	 */
	function ilstuRemoteLoggingProvider($provide) {
		var _endpoint = undefined,
			_logDebug = undefined,
			_logWarn = undefined,
			_logError = undefined,
			_logInfo = undefined,
			provider = this
            ;

		/**
		 * Angular provider $get function.
		 */
        //provider.writeEndpoint=writeEndpoint($http);
		provider.$get = providerGetFn;
		/**
		 * Setter function for specifying where log will POST log messages.
		 */
		provider.loggingEndpoint = function(value) {
			_endpoint = angular.copy(value);
		};
		/**
		 * Sets whether we will POST $log.info and $log.log messages.
		 */
		provider.logInfoEnabled = function(value) {
			_logInfo = !!value;
		};
		/**
		 * Sets whether we will POST $log.debug messages.
		 */
		provider.logDebugEnabled = function(value) {
			_logDebug = !!value;
		};
		/**
		 * Sets whether we will POST $log.warn messages.
		 */
		provider.logWarnEnabled = function(value) {
			_logWarn = !!value;
		};
		/**
		 * Sets whether we will POST $log.error messages.
		 */
		provider.logErrorEnabled = function(value) {
			_logError = !!value;
		};

		//////////////////////////////////////////////////
		// provider initialization:start
		_logDebug = false;
		_logWarn = false;
		_logError = false;
		_logInfo = false;
		// provider initialization:end
		//////////////////////////////////////////////////

		//////////////////////////////////////////////////
		// provider private methods
		//////////////////////////////////////////////////

		/**
		 * @ngInject
		 */

		function providerGetFn($injector) {

            $provide.decorator('$log', ['$injector','$delegate',
                function ($injector,$delegate) {
                    var swap = function (originalFn) {
                        return function () {
                            console.log("begin fxn sqap");
                            var args = [].slice.call(arguments);
                            angular.forEach(args, function (value, index) {
                                //endpointWriter.writeLn(value);
                                $injector.get('$http')({
                                    method: 'GET',
                                    url: 'http://localhost:4040/remotelog/index.php?debug='+"message"
                                    //data: {debug: "message"}
                                }).success(function (response) {
                                    console.log(response);
                                    console.log("nogo");
                                }).error(function (err, status) {
                                    console.log("here error reg", err, status);
                                });

                            });
                            originalFn.apply(null, args);
                        };
                    };
                    console.log("before $delegates");
                    $delegate.warn = swap($delegate.warn);
                    $delegate.error = swap($delegate.error);
                    $delegate.debug=swap($delegate.debug);
                    return $delegate;
            }]);

			console.log("outside all ");
			return {
				"info": "remote logging enabled here"
			};
		}




	}
})();
