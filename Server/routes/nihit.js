import express from 'express';
import natural from 'natural';
const router = express.Router();
import pos from 'pos';

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
	let metaphone = natural.Metaphone;
	pushed = {
		name : "Phonetix Metaphone String",
		data : metaphone.compare(req.body.from,req.body.to) + " " + metaphone.process(req.body.from) + " " + metaphone.process(req.body.from, 3)
	}
	data.push(pushed);
	metaphone.attach();
	pushed = {
		name : "Phonetix Metaphone attach String",
		data : req.body.from.soundsLike(req.body.to)
	}
	data.push(pushed);
	pushed = {
		name : "Phonetix Metaphone token String",
		data : req.body.message.tokenizeAndPhoneticize()
	}
	data.push(pushed);
	let noun = new natural.NounInflector();
	pushed = {
		name : "Noun pluralize & singular",
		data : noun.pluralize(req.body.from) +" "+ noun.singularize(req.body.to)
		}
	data.push(pushed);
	let wordnet = new natural.WordNet();
	pushed = {
		name : "WordNet Meaning",
		data : []
		}
		let t = false;
	wordnet.lookup(req.body.from, (res) => {
		res.forEach((re) => {
			let temp = re.synsetOffset + " | "+ re.lemma +" | "+ re.pos + " | "+ re.synonyms + " | " + re.gloss
			pushed.data.push(temp);
		})

	})
	setTimeout(() => {
		data.push(pushed);	
	},2000)	
	let tt = [];
		console.log("here");
	let words = new pos.Lexer().lex(req.body.message);
	console.log("here1");
	let tagger = new pos.Tagger();
	console.log("here2");
	let tagword = tagger.tag(words);
	console.log("here3", tagword);	
	for (let i in tagword) {
    let taggedWord = tagword[i];
    let word = taggedWord[0];
    let tag = taggedWord[1];
    let temp = word + " | " +tag;
    tt.push(temp);
	}
	setTimeout(() => {
		pushed = {
		name : "POS implement",
		data : tt
		}
		data.push(pushed);	
		res.json(data);
	},2000)
});

export default router;
