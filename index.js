var parser = require('subtitles-parser')
var chineseConv = require('chinese-conv')

const DEFAULT_OPTION = {
  // 'skip-position-annotation': true,  // Not Implemented
  'skip-no-parallel-corpus': true,
  'skip-multiple-line': true,
  'skip-not-acceptable-characters': true,
  'acceptable-symbols': "'!！?？「」,，.。",
  'auto-convert-to-traditional-chinese': true,
  'auto-convert-to-simplified-chinese': false,
  'verbose-each-line': true,
  'verbose-reason': true,
  'parallel-corpus-separate-symbol': '\n'
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
  return (option[key] === undefined) ? DEFAULT_OPTION[key] : option[key]
}

const prepare = (option) => {
  let results = {}
  Object.keys(DEFAULT_OPTION).forEach(key => {
    results[key] = setOrDefault(option, key)
  })
  let enable = !(results['auto-convert-to-traditional-chinese'] === true && results['auto-convert-to-simplified-chinese'] === true)
  assert(enable, '[ASSERTION ERROR] can\'t convert to simplified-chinese and traditional-chinese at the same time')
  return results
}

const warn = (msg, env) => {
  if (env['verbose-reason']) console.warn('[WARN]', msg)
}

module.exports = (srt, option = DEFAULT_OPTION) => {
  const config = prepare(option)
  warn('"output-reason" Not Implemented', config)

  let data = parser.fromSrt(srt)
  let results = []
  data.map((str, index) => {
    if (config['verbose-each-line']) console.log(str.text.split('\n'))
    if (str.text.split('\n').length > 2) {
      if (config['skip-multiple-line']) {
        warn('"multiple-line" detected', config)
        return str
      }
    }

    // Check if parallel
    if (str.text.split('\n').length < 2) {
      if (config['skip-no-parallel-corpus']) {
        warn('"no-parallel-corpus" detected', config)
        return str
      }
    }

    // Detect symbols
    const filter = new RegExp(`[^\u4e00-\u9fa5a-zA-Z\d\n\s ${config['acceptable-symbols']}]`, 'gi')
    const breakRule = str.text.match(filter)
    if (breakRule !== null && breakRule.length > 0) {
      if (config['skip-not-acceptable-characters']) {
        warn('"not-acceptable-characters" detected', config)
        return str
      }
    }

    // Convert chinese
    let chinese = str.text.split('\n')[0]
    const nonchinese = str.text.split('\n').slice(1)
    if (config['auto-convert-to-traditional-chinese']) {
      chinese = chineseConv.tify(chinese)
    } else if (config['auto-convert-to-simplified-chinese']) {
      chinese = chineseConv.sify(chinese)
    }
    str.text = [chinese].concat(nonchinese).join('\n')

    // Replace separated symbol
    if (config['parallel-corpus-separate-symbol'] !== DEFAULT_OPTION['parallel-corpus-separate-symbol']) {
      str.text = str.text.replace(DEFAULT_OPTION['parallel-corpus-separate-symbol'], config['parallel-corpus-separate-symbol'])
    }

    results.push(str.text)
  })
  return results
}
