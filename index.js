var parser = require('subtitles-parser')
var chineseConv = require('chinese-conv')

const DEFAULT_OPTION = {
  'skip-position-annotation': true,
  'skip-no-parallel-corpus': true,
  'skip-multiple-line': true,
  'skip-if-symbols-exists': true,
  'acceptable-symbols': ['!', '！', '?', '？', '「', '」', ',', '，', '.', '。', '-'],
  'auto-convert-to-traditional-chinese': true,
  'auto-convert-to-simplified-chinese': false,
  'output-reason': true
}

const assert = (condition, message) => {
  if (!condition) {
    message = message || 'Assertion failed'
    if (typeof Error !== 'undefined') {
      throw new Error(message)
    }
    throw message // Fallback
  }
}

const setOrDefault = (option, key) => {
  return option[key] || DEFAULT_OPTION[key]
}

const prepare = (option) => {
  let results = {}
  Object.keys(DEFAULT_OPTION).forEach(each => {
    results[each] = setOrDefault(option, each)
  })
  let enable = !(results['auto-convert-to-traditional-chinese'] === true && results['auto-convert-to-simplified-chinese'] === true)
  assert(enable, '[ASSERTION ERROR] can\'t convert to simplified-chinese and traditional-chinese at the same time')
  return results
}

const warn = (msg, env) => {
  if (env['output-reason']) console.warn('[WARN]', msg)
}

module.exports = (srt, option = DEFAULT_OPTION) => {
  const config = prepare(option)

  if (config['output-reason']) {
    warn('"output-reason" Not Implemented', config)
  }

  let data = parser.fromSrt(srt)
  let results = []
  data.map((str, index) => {
    if (str.text.split('\n').length > 2) {
      if (config['skip-multiple-line']) {
        warn('"multiple-line" detected', config)
        return str
      }
    }
    if (str.text.split('\n').length < 2) {
      if (config['skip-no-parallel-corpus']) {
        warn('[WRAN] "no-parallel-corpus" detected', config)
        return str
      }
    }
    console.log(str.text.split('\n')[0])
    results.push(str.text)
  })
  console.log(results)
  return true
}
