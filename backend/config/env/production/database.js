module.exports =  ({ env }) => ({
	connection: {
		client: 'postgres',
		connection: {
		host: env('DATABASE_HOST', 'localhost'),
			port: env.int('DATABASE_PORT', 5432),
			database: env('DATABASE_NAME', 'app'),
			user: env('DATABASE_USERNAME', 'app'),
			password: env('DATABASE_PASSWORD', 'app'),
			ssl: env.bool('DATABASE_SSL', false)
		}
	}
});
