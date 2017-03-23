var Keymetrics = require('keymetrics-api');

module.exports = {
	run: () => {
		console.log('launch keymetrics')

		var km = new Keymetrics({
			token: '[token]',
			public_key: 'bqf66ehxdygphl4', /* daryl bucket */
			realtime: true
		});

		km.init(function(err, res) {
			if (err) return console.log(err);
			km.bucket.fetchUserRole(function(err, res) {
				console.log('Current permissions: ' + res);
			});

			km.bus.on('data:*:status', function(data) {
				console.log(' data : ', data.mini_metrics.daryl.mapky);
			});
		});
	}
}