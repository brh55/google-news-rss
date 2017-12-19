# google-news-rss [![Travis branch](https://img.shields.io/travis/brh55/google-news-rss/master.svg?style=flat-square)](https://travis-ci.org/brh55/google-news-rss) [![Coveralls branch](https://img.shields.io/coveralls/brh55/google-news-rss/master.svg?style=flat-square)](https://coveralls.io/github/brh55/google-news-rss) [![npm badge](https://img.shields.io/npm/dt/google-news-rss.svg?style=flat-square)](https://www.npmjs.com/package/google-news-rss)

> 🗞 A node module (with browser support) that searches Google News RSS Feed and returns a usable JSON response

This is an unofficial, super easy to use node module / API client that allows a user to fetch a Google News RSS feed based on search terms and returns an easy to use JSON response. `google-news-rss` also supports in-browser requests.

![RSS Example](https://user-images.githubusercontent.com/6020066/26994437-4399c680-4d2d-11e7-824b-6082aee7c2c8.png)

<p align="center">Coverts ⬇️</p>

```
{
   title: "Are there really antioxidants in that juice? How to protect against food fraud.",
   description: "Regrettably, they are examples of food fraud that are perpetrated on unsuspecting Americans. The global food industry loses $10 billion to $15 billion per year through food substitutions, dilutions and fake labels, according to the Grocery ...",
   pubDate: "Wed, 08 Jun 2017 07:01:30 GMT",
   thumbnailUrl: "//t1.gstatic.com/images?q=tbn:ANd9GcS7OWziKD2Lc3zReERlqVcffAcgIuzzq723AR4zF807dKuqhzMY6EUEpQyzwGzHXpE05gGtFHNC",
   publisher: "Washington Post",
   link: "http://news.google.com/news/url?sa=t&fd=R&ct2=us&usg=AFQjCNEeo82SxlrQZP5SzjugGtJHFt36_g&clid=c3a7d30bb8a4878e06b80cf16b898331&ei=rCJqWYjEINKMzgKc_YDgCQ&url=https://www.washingtonpost.com/lifestyle/wellness/are-there-really-antioxidants-in-that-juice-how-to-protect-against-food-fraud/2017/06/07/fec98462-4554-11e7-bcde-624ad94170ab_story.html"
}
```


## Install

```
$ npm install --save google-news-rss
```

## Usage

```js
const GoogleNewsRss = require('google-news-rss');

const googleNews = new GoogleNewsRss();

googleNews
   .search('unicorns')
   .then(resp => console.log(resp));

//
// [
//   {
//      title: 'Why don\'t unicorns exist? You asked Google – here\'s the answer ...',
//      link: 'http://news.google.com/news/url?sa=t&fd=R&ct2=us&usg=AFQjCNGNR4Qg8LGbjszT1yt2s2lMXvvufQ&clid=c3a7d30bb8a4878e06b80cf16b898331&cid=52779522121279&ei=VQU7WYjiFoLEhQHIs4HQCQ&url=https://www.theguardian.com/commentisfree/2017/jun/07/why-dont-unicorns-exist-google',
//      pubDate: 'Wed, 07 Jun 2017 07:01:30 GMT',
//      description: 'Imagine for a second that you’re God. You’ve created the universe in six days (seven under EU working time directives). You’ve created millions of creatures of unimaginable grace, oddness and beauty',
//      publisher: 'The Guardian',
//      imgSrc: '//t2.gstatic.com/images?q=tbn:ANd9GcRa2NGl3_alXByd3kpnDDImMJFGeskk4Mf_AWZc-ohe_O8iEtmBs7hMxieldT_--jQWuDr4gQc'
//    }
//  ... 9 more articles
// ]
```


## API

### GoogleNewsRss()
**Type:** `class`<br>
**Usage:** `new GoogleNewsRss()`

## Instance Methods
### .search(terms[, num, language, extraParams])
**Returns:** `Promise` that resolves `n` formatted articles

#### terms
**Type:** `string`<br>

Search terms to search for within Google news. `IE: ethereum,btc`

### num
**Type:** `int`<br>
**Default:** 10

Number of results to be returned [1...30].

#### language
**Type:** `string`<br>
**Default:** `en`

[Language](https://sites.google.com/site/tomihasa/google-language-codes#interfacelanguage) of the results within Google News. `IE: pt-BR`

**Returns:** `Promise` that resolves 10 formatted articles

#### extraParams
**Type:** `object`<br>

Any additional query params that are appended to RSS url to refine the results. Please note, there aren't any officially documented parameters so your mileage may vary. Feel free to experiment with some of the params listed on this [blog post provided by i-tweak](http://i-tweak.blogspot.com/2013/10/google-news-search-parameters-missing.html).

## Article Properties
| Properties   | Description                                    | Example                                                                                                                                                                                                                                                                             |
|--------------|------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| title        | Title of the article                           | Why don't unicorns exist? You asked Google – here's the answer ... - The Guardian                                                                                                                                                                                                   |
| link         | Google news link to article                    | [Article Link](http://news.google.com/news/url?sa=t&fd=R&ct2=us&usg=AFQjCNGNR4Qg8LGbjszT1yt2s2lMXvvufQ&clid=c3a7d30bb8a4878e06b80cf16b898331&cid=52779522121279&ei=VQU7WYjiFoLEhQHIs4HQCQ&url=https://www.theguardian.com/commentisfree/2017/jun/07/why-dont-unicorns-exist-google) |
| pubDate      | Published date                                 | Wed, 07 Jun 2017 07:01:30 GMT                                                                                                                                                                                                                                                       |
| description  | Short description of article                   | Why don't unicorns exist? You asked Google - here's the answer ...                                                                                                                                                                                                                  |
| thumbnailUrl | Thumbnail Url. **Omitted when not available.** | //t2.gstatic.com/images?q=tbn:ANd9GcRa2NGl3_alXByd3kpnDDImMJFGeskk4Mf_AWZc-ohe_O8iEtmBs7hMxieldT_--jQWuDr4gQc                                                                                                                                                                       |
| publisher    | Publisher of article                           | The Guardian                                                                                                                                                                                                                                                                        |                                                                                                                                                        |

## License

MIT © [Brandon Him](https://github.com/brh55/google-news-client)
