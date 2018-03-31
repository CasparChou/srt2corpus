var parser = require('subtitles-parser')

module.exports = (srt) => {
  let data = parser.fromSrt(srt)
  console.log(data)
  const allLines = data.split(/\r\n|\n/)
  // Reading line by line
  allLines.map((line, index) => {
    console.log(index, line)
  })
  return true
}
