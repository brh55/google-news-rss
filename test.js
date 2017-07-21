import nock from 'nock';
import test from 'ava';
import rssMock from './mock/rss';
import GoogleNewsClient from '.';

nock('https://news.google.com/news')
	.get('/section')
	.query({q: 'food', output: 'rss', num: 10, hl: 'en'})
	.reply(200, rssMock);

nock('https://news.google.com/news')
		.get('/section')
		.query({q: 'food', output: 'rss', num: 30, hl: 'en'})
		.reply(200, rssMock);

const googleNews = new GoogleNewsClient();

test('Searches the news and returns formatted articles', async t => {
	t.plan(3);

	const expectedArticle1 = {
		title: 'Your pick: World\'s 50 best foods',
		link: 'http://www.cnn.com/travel/article/world-best-foods-readers-choice/index.html',
		pubDate: 'Wed, 12 Jul 2017 12:04:47 GMT',
		description: 'CNN(CNN) â€” What are the world\'s best ? We thought we knew. Apparently we don\'t. Our list of the World\'s 50 best  stimulated some impassioned debate about the conspicuous lack of French dishes and the merits of ketchup over mayonnaise. \"Ketchup ...', // eslint-disable-line no-useless-escape
		publisher: 'CNN',
		thumbnailUrl: '//t0.gstatic.com/images?q=tbn:ANd9GcQtGI39Y_w847WipM0d9UBrcxj41HrNLEL_lDfnl0sw-BqkdHEN1U2d-xNF4rXw3B4PTumy1y28'
	};

	const expectedArticle2 = {
		title: 'Best Korean dishes: 40 foods we can\'t live without',
		link: 'http://www.cnn.com/travel/article/best-korean-dishes/index.html',
		pubDate: 'Wed, 12 Jul 2017 15:54:41 GMT',
		description: 'CNN(CNN) â€” The fact that there are over 100 different types of kimchi should tell you something about the pride Koreans have in their . Korean cuisine has evolved over time because of cultural and changes, but it remains a major aspect of the ',
		publisher: 'CNN',
		thumbnailUrl: '//t0.gstatic.com/images?q=tbn:ANd9GcQCDS0sTjw9VGQ8fJRIlNhCjhe871Vz7IIQ1VQncaK7NrSNpOy5WUKL5CYQxVJ4aUjpQ6VT7Qpp'
	};

	const articles = await googleNews.search('food');
	t.deepEqual(articles[0], expectedArticle1);
	t.deepEqual(articles[9], expectedArticle2);
	t.is(articles.length, 10);
});

test('Specify num results in correct request', async t => {
	t.plan(1);

	const articles = await googleNews.search('food', 30);
	t.is(articles.length, 10);
});
