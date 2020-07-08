const express = require("express");
var app = express;
const fs = require("fs");
const path = require("path");
const uuid = require("uuid");
const dataBase = path.join(__dirname, "../db/db.json");

module.exports = function (app) {
	app.get("/api/notes", function (req, res) {
		fs.readFile(dataBase, function (err, data) {
			if (err) throw err;
			let notes = JSON.parse(data);
			res.json(notes);
		});
	});

	app.post("/api/notes", function (req, res) {
		let id = uuid.v4;
		let title = req.body.title;
		let text = req.body.text;

		let note = {
			id,
			title,
			text,
		};
		fs.readFile(dataBase, (err, data) => {
			if (err) throw err;
			let notes = JSON.parse(data);
			notes.push(note);

			fs.writeFile(dataPath, JSON.stringify(notes), function (err) {
				if (err) throw err;
			});

			res.json(note);
		});
	});
};
