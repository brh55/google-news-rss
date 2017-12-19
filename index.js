const assert = require('assert');
const queryString = require('query-string');
const Entities = require('html-entities').AllHtmlEntities;
const pify = require('pify');
const cheerio = require('cheerio');
const striptags = require('striptags');
const forOwn = require('lodash.forown');
const es6Promise = require('es6-promise');

es6Promise.polyfill();

const isoFetch = require('isomorphic-fetch');
let parseString = require('xml2js').parseString;

const entities = new Entities();
const decode = entities.decode;

parseString = pify(parseString);

const flattenArticles = article => {
	let flattenObj = {};
	forOwn(article, (value, key) => {
		// omit guid
		if (key === 'guid') {
			return;
		}
		const mergeObj = {};
		mergeObj[key] = value[0];
		flattenObj = Object.assign(flattenObj, mergeObj);
	});
	return flattenObj;
};

const deriveDescription = rawDescription => {
	if (!rawDescription) {
		return 'No description found';
	}

	const match = rawDescription.match(/size="-1">(?!<b>).+\.\.\./g);
	if (match) {
		const description = match[0];
		// decode -> striptags -> substr
		const formatDescription = decode(striptags(description.substr(10, description.length)));
		// Odd character that appears, will remove manually
		const removedStaryChars = formatDescription.replace(/â€”/g, '');
		return removedStaryChars;
	}

	// Shouldn't get passed here, if so that means there have been google updates
	// Put will remove as much of noise as possible
	return decode(striptags(rawDescription));
};

const formatArticle = article => {
	const description = article.description;
	const $ = cheerio.load(description);
	const cleanDescription = deriveDescription(description);

	// Remove the appended "- Publisher"
	const title = article.title.replace(/\s*-.+/img, '');
	// Remove the prefix Google URL
	const thumbnailUrl = $('img', 'tr').attr('src');
	const publisher = $('font', '.lh font').html();

	// Add publisher, re-formatted description, and url
	const formatArticle = Object.assign(article, {
		description: cleanDescription,
		publisher,
		title
	});

	// omit imgSrc if empty
	return thumbnailUrl ? Object.assign(formatArticle, {thumbnailUrl}) : formatArticle;
};

class googleNewsClient {
	constructor() {
		this.url = 'https://news.google.com/news/rss';
	}

	_buildOptions(term, appendQuery) {
		const query = Object.assign({}, appendQuery);

		return {
			url: this._formulateUrl(term),
			query
		};
	}

	_formulateUrl(term) {
		if (!term) {
			return this.url;
		}

		const urlTerm = encodeURIComponent(term);
		return `${this.url}/search/section/q/${urlTerm}/${urlTerm}`;
	}

	// Will probably let people pass in a object after terms
	search(terms, num = 10, language = 'en', extraParams = {}) {
		assert(typeof terms === 'string', true, 'expected terms to be string');
		assert(typeof num === 'number', true, 'expected num to be number');
		assert(typeof language === 'string', true, 'expected language to be string');

		let params = {
			gl: 'US',
			num,
			hl: language
		};

		params = Object.assign({}, params, extraParams);
		const options = this._buildOptions(terms, params);
		return this._request(options);
	}

	_request(options) {
		const qs = queryString.stringify(options.query);
		const url = (qs) ? `${options.url}?${qs}` : options.url;
		const params = {
			method: 'GET'
		};

		return isoFetch(url, params)
			.then(response => {
				if (response.ok) {
					return response.text();
				}

				throw new Error(`Fetch ${url} failed`);
			})
			.then(body => parseString(body, {trim: true}))
			.then(parseXml => parseXml.rss.channel[0].item)
			.then(articles => articles.map(flattenArticles))
			.then(articles => articles.map(formatArticle));
	}
}

module.exports = googleNewsClient;
