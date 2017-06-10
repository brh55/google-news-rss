import nock from 'nock';
import test from 'ava';
import rssMock from './mock/rss';
import GoogleNewsClient from '.';

nock('https://news.google.com/news')
	.get('/section')
	.query({q: 'food', output: 'rss', num: 10})
	.reply(200, rssMock);

nock('https://news.google.com/news')
		.get('/section')
		.query({q: 'food', output: 'rss', num: 30})
		.reply(200, rssMock);

const googleNews = new GoogleNewsClient();

test('Searches the news and returns formatted articles', async t => {
	t.plan(3);

	const expectedArticle1 = {
		title: '14 killed as soldiers clash over drought food aid in Somalia - ABC News',
		link: 'http://news.google.com/news/url?sa=t&fd=R&ct2=us&usg=AFQjCNHGjodT8ktfZmfvbTpDMab0g84E4w&clid=c3a7d30bb8a4878e06b80cf16b898331&cid=52779524260870&ei=8P86WYDQD87jhAHyqJfQDA&url=http://abcnews.go.com/International/wireStory/14-killed-soldiers-clash-drought-food-aid-somalia-47937452',
		pubDate: 'Fri, 09 Jun 2017 13:49:25 GMT',
		description: '14 killed as soldiers clash over drought food aid in Somalia',
		publisher: 'ABC News'
	};

	const expectedArticle2 = {
		title: 'Rodent feces, bugs found during Muskegon-area April food inspections - MLive.com',
		link: 'http://news.google.com/news/url?sa=t&fd=R&ct2=us&usg=AFQjCNEj73ZFzrJsREMf4xAffwkeuUZfkA&clid=c3a7d30bb8a4878e06b80cf16b898331&ei=8P86WYDQD87jhAHyqJfQDA&url=http://www.mlive.com/news/muskegon/index.ssf/2017/06/rodent_feces_mold_in_cooler_fo.html',
		pubDate: 'Fri, 09 Jun 2017 12:14:32 GMT',
		description: 'Rodent feces, bugs found during Muskegon-area April food inspections',
		publisher: 'MLive.com',
		thumbnailUrl: '//t2.gstatic.com/images?q=tbn:ANd9GcRzm0aUDI6tl9pyN4yN5hRxvNxMl7bnLwqVDdNcCO7mEzOjqtFcHkkiW1r_O7EqNnxFTca77i0D'
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
