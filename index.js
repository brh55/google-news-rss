const assert = require('assert');
const popsicle = require('popsicle');
const decode = require('unescape');
const pify = require('pify');
const cheerio = require('cheerio');
const striptags = require('striptags');
const forOwn = require('lodash.forown');
let parseString = require('xml2js').parseString;

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

const formatArticle = article => {
	const description = decode(article.description);
	const $ = cheerio.load(description);
	const imgSrc = $('img', 'tr').attr('src');
	const htmlDescription = $('.lh').children().html();
	const publisher = $('font', '.lh font').html();
	const formattedDescription = striptags(htmlDescription);
	// Add publisher and re-formatted description
	const formatArticle = Object.assign(article, {description: formattedDescription}, {publisher});
	// omit imgSrc if empty
	return imgSrc ? Object.assign(formatArticle, {imgSrc}) : formatArticle;
};

class googleNewsClient {
	constructor() {
		this.url = 'https://news.google.com/news/section';
	}

	_buildOptions(appendQuery) {
		const query = Object.assign({}, {output: 'rss'}, appendQuery);

		return {
			url: this.url,
			query
		};
	}

	search(terms) {
		assert(typeof terms === 'string', true, 'expected terms to be string');

		return this._request({
			q: terms
		});
	}

	_request(query) {
		const options = this._buildOptions(query);
		return popsicle.request(options)
			.then(resp => resp.body)
			.then(body => parseString(body, {trim: true}))
			.then(parseXml => parseXml.rss.channel[0].item)
			.then(articles => articles.map(flattenArticles))
			.then(articles => articles.map(formatArticle));
	}
}

module.exports = googleNewsClient;
