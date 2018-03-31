# srt2corpus

## What can srt2corpus do?
It can help you to convert srt file into CN-? parallel corpus

## Usage

```js
var fs = require('fs')
var corpus = require('srt2corpus')

// or use fs.readFile with callback
var data = fs.readFileSync(file.path, 'utf8') 
var results = corpus(data)

// add options
var results = corpus(data, {
  verbose-each-line: false,
  verbose-reason: false
})
```




## Options

key|Description|Default
--|--|--
skip-position-annotation| Skip SRT Formate (Not Implemented)|`true`
skip-no-parallel-corpus| Skip when just chinese (not parallel) |`true`
skip-multiple-line| Skip when multiple line subtitle |`true`
skip-not-acceptable-characters| Skip special characters |`true`
acceptable-symbols| Whitelist for special characters |`'!！?？「」,，.。`
auto-convert-to-traditional-chinese| Convert chinese to Traditional Chinese |`true`
auto-convert-to-simplified-chinese| Convert chinese to Simplified Chinese  |`false`
verbose-each-line| Verbose each subtitle |`true`
verbose-reason| Verbose when skip in which rule |`true`
parallel-corpus-separate-symbol| Custom your separate symbol/word  |`\n`

