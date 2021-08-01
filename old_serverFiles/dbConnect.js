mongoose.connect('mongodb://localhost/cookwell', { useNewUrlParser: true } ) // this will be different for production. It will come from config file
	.then(() => console.log('Connected to MongoDB...'))
	.catch(err => console.error('Could not connect to MongoDB...', err));