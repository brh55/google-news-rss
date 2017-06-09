# google-news-rss [![Build Status](https://travis-ci.org/brh55/google-news-rss.svg?branch=master)](https://travis-ci.org/brh55/google-news-rss) [![Coverage Status](https://coveralls.io/repos/github/brh55/google-news-rss/badge.svg?branch=master)](https://coveralls.io/github/brh55/google-news-rss?branch=master)

> 🗞 A node module that searches Google News RSS Feed and returns a usable JSON response

This is an unofficial node module that allows a user to fetch a Google News RSS feed based on search terms and returns an easy to use JSON response.

## Install

```
$ npm install --save google-news-rss
```

## Usage

```js
const GoogleNewsRss = require('google-news-rss');

const googleNews = new GoogleNewsRss();

googleNews.search('unicorns')
	.then(resp => console.log(resp));
	
//
// [ 
//   { 
//      title: 'Why don\'t unicorns exist? You asked Google – here\'s the answer ... - The Guardian',
//      link: 'http://news.google.com/news/url?sa=t&fd=R&ct2=us&usg=AFQjCNGNR4Qg8LGbjszT1yt2s2lMXvvufQ&clid=c3a7d30bb8a4878e06b80cf16b898331&cid=52779522121279&ei=VQU7WYjiFoLEhQHIs4HQCQ&url=https://www.theguardian.com/commentisfree/2017/jun/07/why-dont-unicorns-exist-google',
//      pubDate: 'Wed, 07 Jun 2017 07:01:30 GMT',
//      description: 'Why don&apos;t unicorns exist? You asked Google &#x2013; here&apos;s the answer ...',
//      publisher: 'The Guardian',
//      imgSrc: '//t2.gstatic.com/images?q=tbn:ANd9GcRa2NGl3_alXByd3kpnDDImMJFGeskk4Mf_AWZc-ohe_O8iEtmBs7hMxieldT_--jQWuDr4gQc'    
//    }
//  ... 9 more articles
// ]
```


## API

### GoogleNewsRss()
Type: `class`

`new GoogleNewsRss()`

### Instance Methods
#### .search(terms)

##### terms
Type: `string`<br>

Search terms to search for within Google news. `IE: ethereum,btc`
 
Returns:  `Promise` that resolves 10 formatted articles

## Article Properties
| Properties   | Description                  | Example                                                                                                                                                                                                                                                                             |
|--------------|------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| title        | Title of the article         | Why don't unicorns exist? You asked Google – here's the answer ... - The Guardian                                                                                                                                                                                                  |
| link         | Google news link to article  | [Article Link](http://news.google.com/news/url?sa=t&fd=R&ct2=us&usg=AFQjCNGNR4Qg8LGbjszT1yt2s2lMXvvufQ&clid=c3a7d30bb8a4878e06b80cf16b898331&cid=52779522121279&ei=VQU7WYjiFoLEhQHIs4HQCQ&url=https://www.theguardian.com/commentisfree/2017/jun/07/why-dont-unicorns-exist-google) |
| pubDate      | Published date               | Wed, 07 Jun 2017 07:01:30 GMT                                                                                                                                                                                                                                                       |
| description  | Short description of article | Why don't unicorns exist? You asked Google - here's the answer ...                                                                                                                                                                                                                  |
| thumbnailUrl | Thumbnail Url                |    //t2.gstatic.com/images?q=tbn:ANd9GcRa2NGl3_alXByd3kpnDDImMJFGeskk4Mf_AWZc-ohe_O8iEtmBs7hMxieldT_--jQWuDr4gQc                                                                                                                                                                                                                                                                              |
| publisher    | Publisher of article         | The Guardian                                                                                                                                                                                                                                                                        |

## License

MIT © [brh55](https://github.com/brh55/google-news-client)
