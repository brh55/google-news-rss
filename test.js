import nock from 'nock';
import test from 'ava';
import rssMock from './mock/rss';
import GoogleNewsClient from '.';

const link = 'https://news.google.com/news';

nock(link)
	.get('/rss/search/section/q/food/food')
	.query({num: 10, hl: 'en', gl: 'US'})
	.reply(200, rssMock);

nock(link)
	.get('/rss/search/section/q/food/food')
	.query({gl: 'US', num: 30, hl: 'en'})
	.reply(200, rssMock);

const googleNews = new GoogleNewsClient();

test('Searches the news and returns formatted articles', async t => {
	t.plan(3);

	const expectedArticle1 = {
		title: 'Big Food\'s Deal Frenzy Is Just Getting Started',
		link: 'https://www.bloomberg.com/news/articles/2017-12-19/boom-in-food-m-a-deals-is-just-getting-started-as-kraft-looms',
		category: 'food',
		pubDate: 'Tue, 19 Dec 2017 11:31:14 GMT',
		description: 'Big Food\'s Deal Frenzy Is Just Getting Started',
		publisher: 'Bloomberg',
		thumbnailUrl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRPP8v1KNk_X0D6oZPiSJSpSBbhR9IPCHqwGvmUOiryk32E7Ih_YoUjZlenfUjXhIuWXoMKH5kNuw'
	};

	const expectedArticle2 = {
		title: '\'Feast for the Eyes\' is a delightful history of food in photography',
		link: 'https://www.csmonitor.com/Books/Book-Reviews/2017/1219/Feast-for-the-Eyes-is-a-delightful-history-of-food-in-photography',
		category: 'food',
		pubDate: 'Tue, 19 Dec 2017 14:02:06 GMT',
		publisher: 'Christian Science Monitor',
		description: '\'Feast for the Eyes\' is a delightful history of food in photography'
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
