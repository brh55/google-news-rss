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
		title: 'Your pick: World\'s 50 best foods - CNN',
		link: 'http://news.google.com/news/url?sa=t&fd=R&ct2=us&usg=AFQjCNEDNjfEObRdKmRlsbRO4BSuFFC2hg&clid=c3a7d30bb8a4878e06b80cf16b898331&ei=rCJqWYjEINKMzgKc_YDgCQ&url=http://www.cnn.com/travel/article/world-best-foods-readers-choice/index.html',
		pubDate: 'Wed, 12 Jul 2017 12:04:47 GMT',
		description: 'Your pick: World&apos;s 50 best foods',
		publisher: 'CNN',
		thumbnailUrl: '//t0.gstatic.com/images?q=tbn:ANd9GcQtGI39Y_w847WipM0d9UBrcxj41HrNLEL_lDfnl0sw-BqkdHEN1U2d-xNF4rXw3B4PTumy1y28'
	};

	const expectedArticle2 = {
		title: 'Best Korean dishes: 40 foods we can\'t live without - CNN',
		link: 'http://news.google.com/news/url?sa=t&fd=R&ct2=us&usg=AFQjCNEeo82SxlrQZP5SzjugGtJHFt36_g&clid=c3a7d30bb8a4878e06b80cf16b898331&ei=rCJqWYjEINKMzgKc_YDgCQ&url=http://www.cnn.com/travel/article/best-korean-dishes/index.html',
		pubDate: 'Wed, 12 Jul 2017 15:54:41 GMT',
		description: 'Best Korean dishes: 40 foods we can&apos;t live without',
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
