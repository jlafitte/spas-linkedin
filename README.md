# spas-linkedin
LinkedIn API helpers for SPAS

## Installation

### Installing spas
``` bash
$ [sudo] npm install spas -g
```

### Installing spas-linkedin
``` bash
$ npm install spas-linkedin
```

## Documentation
Your bundle should have an item like this:
```
"linkedin": {
  "resource": linkedin.companyScrape,
  "params": {
    "url": "https://www.linkedin.com/company/joyent",
    "count": 3
  },
  "cacheduration": 3000,
  "timeout": 5000
}
```
Just change the URL to the company linkedin page, and the count to the number of entires you'd like to return.
