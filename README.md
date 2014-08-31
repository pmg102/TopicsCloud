TopicsCloud
===========

My submission to the Brandwatch Javascript developer challenge


# TopicsCloud

## Getting Started

All you need to do is to clone this repository (or download and extract the ZIP), and point your browser to the index.html file in the root. Required libraries are bundled into the tree so that everything runs on an offline client.

Test output can be seen by pointing your browser at SpecRunner.html in the project root. 

The solution may also be run on a server: if so, you are advised to change the references to jquery and require in index.html to refer to their CDN versions as these will likely already be in the users browser cache. Additionally, you may wish to remove the include of topics-data.js from index.html, and replace the line

```
    onLoadTopics(__DATA);
```
in js/main.js with the commented out line $.getJSON() on the preceding line.

## Production

For production all the js files have been concatenated, minified and uglified with r.js:
```
$ r.js -o paths.requireLib=../lib/require name=main out=main-built.js baseUrl=. include=requireLib
```
The resulting file has been included in this repo for demonstration purposes at js/main-built.js, and should be referenced as indicated in index.html for release.
