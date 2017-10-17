import express from 'express';
import natural from 'natural';
const router = express.Router();

/* GET index page. */
router.post('/', (req, res) => {
	let data = [];
	let pushed = {
		data : "",
		name : ""
	}
	let token = new natural.WordTokenizer();
	pushed.data = token.tokenize(req.body.message);
	pushed.name = "Tokenizer Word";
	data.push(pushed);
	pushed = {
		data : "",
		name : ""
	}
	let windist = natural.JaroWinklerDistance(req.body.from, req.body.to);
	pushed = {
		name : "JaroWinklerDistance String",
		data : windist
	}
	data.push(pushed);
	let levendist = natural.LevenshteinDistance(req.body.from, req.body.to);
	pushed = {
		name : "LevenshteinDistance String",
		data : levendist
	}
	data.push(pushed);
	let dicedist = natural.DiceCoefficient(req.body.from, req.body.to);
	pushed = {
		name : "DiceCofficient String",
		data : dicedist
	}
	data.push(pushed);
	natural.PorterStemmer.attach()
	pushed = {
		name : "PorterStemmer Token & Stem",
		data : req.body.message.tokenizeAndStem()
	}
	data.push(pushed);
  res.json(data);
});

export default router;
