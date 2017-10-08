# Molecular Biology Project
* For AS 410.602 - Molecular Biology
* Individual project discussing relationship between autoimmunity and cancer

## Build Dependencies
* npm
* [markdown-to-html](https://github.com/cwjohan/markdown-to-html)

## Run
```sh
# gulp, nunjucks dependencies
npm install

# generates raw html, unstyled, no automatically included into main template
./generate-html.sh

# compile main index.html
gulp render
```

* open index.html in browser