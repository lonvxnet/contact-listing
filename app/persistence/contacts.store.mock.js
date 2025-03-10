'use strict';

// This is just a mock persistence layer.
// Everytime server is restarted, the mock data will be cleaned.

var identifierGenerator = require("../utils/identifier.utils");
var contacts = [];

exports.loadAll = function() {
	console.log("SERVER SIDE : " + process.env.NODE_ENV);
	return contacts;
}

exports.insertOne = function(contact){
	contact.id = identifierGenerator.generateUUID(contact.name);
	contacts.push(contact);
	console.log("inserted contact with ID " + contact.id);
}

exports.updateOne = function(contact){
	for(var i = 0; i < contacts.length; i++){
		let contactToUpdate = contacts[i];
		if ( contact.id == contactToUpdate.id ){
			contacts[i] = contact;
			console.log("updated contact with ID " + contact.id);
		}
	}
}

exports.deleteOne = function(id){
	for(var i = 0; i < contacts.length; i++){
		let contact = contacts[i];
		if ( id == contact.id ){
			console.log("found to remove in position " + i);
			contacts.splice(i, 1);
			break;
		}
	}
}
