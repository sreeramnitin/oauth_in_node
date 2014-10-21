var http = require('http'),
fs = require('fs'),
url=require('url'),
client_id="MgPENXXEuGu1lfDTx0U5lJUg7iHGZv3GuKTaoGeE1jiWG15d0j";
client_secret="r7StDRUU6AU0AwVhiz3M6nsTP3mtpesUTFJYwkI8593TK1f4ES";

http.createServer(function (req, res) {
if(url.parse(req.url).pathname == '/index') {
  var brokenUrl = url.parse(req.url, true),responseData;
  options = {
  host: 'join.agiliq.com',
  port: 80,
  path: 'http://join.agiliq.com/oauth/access_token/?client_id='+client_id+'&redirect_uri=http://localhost:1337/index'+'&client_secret='+client_secret+'&code='+brokenUrl.query.code,
  method: 'GET'
  };
  http.request(options, function(res2) {
 
  res2.setEncoding('utf8');
  res2.on('data', function (chunk) {
     responseData = JSON.parse(chunk);
	 var data = ''+fs.readFileSync('./templates/index.html');
	 console.log(data);
	 data = data.replace('{{access_token}}',responseData.access_token);
	 res.writeHead(200, {'Content-Type': 'text/html'});
	 res.end(data);
  });
}).end();
  
  //responseData = fs.readFileSync('./templates/index.html
  
  }
  if(url.parse(req.url).pathname == '/') {
  res.statusCode = 302;
  res.setHeader("Location", 'http://join.agiliq.com/oauth/authorize?client_id='+client_id+'&redirect_uri=http://localhost:1337/index');
  res.end();
  }
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');