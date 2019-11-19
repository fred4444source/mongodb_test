const config = {
	host : 'localhost',
	port : 27017,
	option : {
		useNewUrlParser : true
	}
}
Reflect.defineProperty(config, 'url', {
	enumerable : true,
	configurable : false,
	set : (v) => {
	},
	get : () => {
		return 'mongodb://' + config.host + ':' + config.port;
	}
});
module.exports = config;
