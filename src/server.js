const mongoose = require('mongoose');
// const cluster = require('cluster');
// const os = require('os');

const app = require('./app');
const config = require('./config');
const logger = require('./library/helpers/loggerHelpers');

// const { userModule, brandModule } = require('./components');

const port = process.env.PORT || 5000;

// userModule.model;
// brandModule.model;

mongoose
	.connect(config.dbURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true
	})
	.then(() =>
		logger.info(`
        ++++++++++++++++++++++++++++++++++++++++++++++++
          MongoDB succesfully connected
        ++++++++++++++++++++++++++++++++++++++++++++++++
      `)
	)
	.catch((err) => logger.info(err));

const server = app.listen(config.port, (err) => {
	if (err) {
		logger.error(err);
		process.exit(1);
		return;
	}
	logger.info(`
    ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        Server is running on port: ${config.port}
    ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    `);
});

// Cluster API has a variety of events.
// Here we are creating a new process if a worker die.

// cluster.on('exit', function(worker) {
// 	logger.info(`Worker ${worker.id} died'`);
// 	logger.info(`Staring a new one...`);
// 	cluster.fork();
// });
