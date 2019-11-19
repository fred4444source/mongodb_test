console.clear();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
//const ObjectID = require('./core').BSON.ObjectID;
const ObjectID = require('bson').ObjectId;

const g = {
	client : null,
}

{
	const client_config = require('./client_config');
	const db_config = require('./db_config');

/*
	let p = MongoClient.connect(client_config.url, client_config.option);
	p.then((client) => {
		console.log('connect success');
		g.client = client;
		console.log(client);
//		let cp = client.close();
		cp.then((o)=> {
			console.log('close success');
			console.log(o);
		}, (o) => {
			console.log('close faild');
			console.log(o);
		});
	}, (e) => {
		console.log('connect faild');
		console.log(e);
		process.exit(1);
	});
*/
console.log(ObjectID);
	const start = async function() {
		try {
			const client = await MongoClient.connect(client_config.url, client_config.option);
			g.client = client;
			console.log(client);
			const db = client.db('test');
			console.log(db);
			const collection_excel = db.collection('excel');
			console.log(collection_excel);
			const result = await collection_excel.insertMany([
				{name : 'fred1', age : 33},
				{name : 'fred2', sex : 'male'},
				{name : 'fred3', age : 32, sex : 'male'},
				{_id : Date.now(), n1 : 1, n2 : 2, n3 : 3, n4 : 4}
			]);
			console.log(result);
			/*
			const ids = result.insertedIds;
			typeof(ids);
			ids.forEach((id) => {
				console.log(id);
				console.log(id.toString());
			});
			*/
			const ops = result.ops;
			ops.forEach((r) => {
				console.log(r);
				console.log(r._id);
				console.log(typeof(r._id));
				const is = r._id instanceof ObjectID;
				console.log(is);
				if (is) {
					console.log(r._id.toString());
					console.log(r._id.toHexString());
				}
			});
			await client.close();
		} catch (e) {
			console.log(e);
			//process.exit(1);
		}
	}
	start();
}


const http = require('http');
http.createServer(function(request, response) {
	console.log('start a http server for remote debug');
}).listen(10003);
