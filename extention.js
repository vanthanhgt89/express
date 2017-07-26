const fs = require('fs')
const path = require('path')



function imgFile(sourcePath) {
  let data = []
  let listItem = fs.readdirSync(sourcePath)
  listItem.map((item, index) => {
    data.push({
      name: 'Movies' + index,
      src: '/public/img' + '/' + item
    })
  })
  return data
}
let sourcePath = __dirname + '/public/img'
let json = JSON.stringify(imgFile(sourcePath))
console.log(json);
fs.writeFileSync('data.json', json)


