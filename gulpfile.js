var marked  = require('marked')
var fs = require('fs')
var path = require('path')
var cheerio = require('cheerio')

var buildConfig = require('./config/build.json')

function producePostsData (year, month) {
    var dirPath = path.resolve(__dirname, `./posts/${year}/${month}`);
    fs.readdir(dirPath, (err, files) => {
        if (err) {
            // console.error(err);
            return;
        } else if(files && files.length > 0) {
            writeJson(year, month, files)
        }
    })
}

function writeJson (year, month, files) {
    var data = {};
    var fileName = path.resolve(__dirname, `./data/${year}-${month}.json`);
    
    // var stat = fs.statSync(fileName);
    // if (!stat.errno) {
    //     console.log('correct!!!')
    //     data = require(fileName);
    //     console.log(data)
        
    // }

    for(var i = 0; i < files.length; i++) {
        var sourceFile = path.resolve(__dirname, `./posts/${year}/${month}`, `./${files[i]}`);

        var key = files[i].replace(/\.md$/, '')
        var rs = fs.readFileSync(sourceFile, {encoding: 'utf-8'})
        var html = marked(rs)
        var $ = cheerio.load(html)
        // console.log(html)

        var post = {
            "title": $('#info-title').text(),
            "month": "1",
            "tag": "前端",
            "absctract": $('#info-intro').text(),
            "content": html
        }
        data[key] = post
        console.log(data)
    }

    fs.writeFile(fileName, JSON.stringify(data), {encoding: 'utf-8'}, function(err){
        if(err) throw err;
        console.log(`${year}-${month}.json 写入成功`)
    })
}

for (var i in buildConfig) {
    var year = i;
    var months = buildConfig[year];
    for (var j = 0; j < months.length; j++) {
        var month = months[j];
        producePostsData(year, month)
    }
}



