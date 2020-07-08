const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require('uuid');
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
		let id = uuidv4();
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

			fs.writeFile(dataBase, JSON.stringify(notes), function (err) {
				if (err) throw err;
			});

			res.json(note);
		});
	});
	app.delete("/api/notes/:id", (req, res) => {

		fs.readFile(dataBase, (err, data) => {
			if (err) throw err;
			let notes = JSON.parse(data);
	
			const noteExists = notes.some((note) => note.id === req.params.id);
	
			if (noteExists) {
				notes = notes.filter((note) => note.id !== req.params.id);
		
				fs.writeFile(dataBase, JSON.stringify(notes), function (err) {
					if (err) throw err;
					res.json(notes);
				});
			} else {
				res.status(400).json({ msg: `Deleted Note: ${req.params.id}` });
			}
		})})
	}