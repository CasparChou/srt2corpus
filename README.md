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
  'verbose-each-line': false,
  'verbose-reason': false
})
```

## Options

key|Description|Default
--|--|--
skip-position-annotation| Skip SRT Formate (Not Implemented)|`true`
skip-no-parallel-corpus| Skip when just chinese (not parallel) |`true`
skip-multiple-line| Skip when multiple line subtitle |`true`
skip-not-acceptable-characters| Skip special characters |`true`
acceptable-symbols| Whitelist for special characters |`'!！?？「」,，.。`
auto-convert-to-traditional-chinese| Convert chinese to Traditional Chinese |`true`
auto-convert-to-simplified-chinese| Convert chinese to Simplified Chinese  |`false`
verbose-each-line| Verbose each subtitle |`true`
verbose-reason| Verbose when skip in which rule |`true`
parallel-corpus-separate-symbol| Custom your separate symbol/word  |`\n`

## Sample Result

```
{ id: '16',
  startTime: '00:00:35,720',
  endTime: '00:00:39,500',
  text: '就算一點欺詐行為  風投公司都認為是死罪\nEven a whiff of fraud is a mortal sin for VCs.' }
{ id: '17',
  startTime: '00:00:40,320',
  endTime: '00:00:42,760',
  text: '\'魔笛手\'品牌及其名下的所有資產現在\nPied Piper and all of its assets are now officially' }
{ id: '18',
  startTime: '00:00:42,760',
  endTime: '00:00:44,700',
  text: '正式屬于\'巴赫頭有限責任公司\'了\nthe property of Bachmanity LLC.' }
{ id: '19',
  startTime: '00:00:44,700',
  endTime: '00:00:48,010',
  text: '-你剛才說\'巴赫頭\'  -他們出價最高\n- Did you just say "Bachmanity?" - They had the highest bid?' }
{ id: '20',
  startTime: '00:00:48,010',
  endTime: '00:00:49,880',
  text: '那么  就賣給巴赫頭了\nBachmanity it is then.' }
{ id: '21',
  startTime: '00:00:50,550',
  endTime: '00:00:52,790',
  text: '理查德  是你救了我們\nRichard, you pulled us out of a nosedive.' }
{ id: '22',
  startTime: '00:00:52,800',
  endTime: '00:00:56,300',
  text: '當然了  我們必定會失敗\nOf course, inevitably we will plummet towards the earth,' }
```

```js
array = [
  '就算一點欺詐行為  風投公司都認為是死罪\nEven a whiff of fraud is a mortal sin for VCs.',
  '\'魔笛手\'品牌及其名下的所有資產現在\nPied Piper and all of its assets are now officially',
  '正式屬於\'巴赫頭有限責任公司\'了\nthe property of Bachmanity LLC.',
  '那麼  就賣給巴赫頭了\nBachmanity it is then.',
  '理查德  是你救了我們\nRichard, you pulled us out of a nosedive.',
  '當然了  我們必定會失敗\nOf course, inevitably we will plummet towards the earth,'
]
```