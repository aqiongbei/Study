var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    mime = require('mime'),
    User = require('./model.js').User,
    Books = require('./model.js').Books;

http.createServer(function(req, res) {
    var urlObj = url.parse(req.url, true),
        pathname = urlObj.pathname,
        query = urlObj.query,
        bookReg = /^\/book(\/\w+)?$/,
        userReg = /^\/userReg/,
        userLogin = /^\/userLogin/;
    if (pathname == '/') {
        res.setHeader('Content-Type', 'text/html;charset=utf8');
        fs.createReadStream('./index.html').pipe(res);
    } else if (bookReg.test(pathname)) {
        var id = pathname.match(bookReg)[1];
        switch (req.method) {
            case 'GET':
                if (id) {
                    Books.findOne({ _id: id.slice(1) }, function(err, result) {
                        res.end(JSON.stringify(result));
                    })
                } else {
                    Books.find({})
                        .sort({ _id: -1 })
                        .skip((query.pageNum - 1) * query.pageSize)
                        .limit(query.pageSize)
                        .exec(function(err, result) {
                            res.end(JSON.stringify(result));
                        })
                }
                break;
            case 'POST':
                var str = '';
                req.on('data', function(chunk) {
                    str += chunk;
                });
                req.on('end', function() {
                    var book = JSON.parse(str);
                    Books.create(book, function(err, result) {
                        res.end(JSON.stringify(book));
                    });
                })
                break;
            case 'PUT':
                if (id) {
                    var str = '';
                    req.on('data', function(chunk) {
                        str += chunk;
                    })
                    req.on('end', function() {
                        var book = JSON.parse(str);
                        Books.update({ _id: id.slice(1) }, book, function(err, result) {
                            res.end(JSON.stringify(book));
                        });
                    })
                }

                break;
            case 'DELETE':
                if (id) {
                    Books.remove({ _id: id.slice(1) }, function() {
                        res.end(JSON.stringify({}));
                    });
                }
                break;
        }
    } else if (userReg.test(pathname)) {
        var str = '';
        req.on('data', function(chunk) {
            str += chunk;
        });
        req.on('end', function() {
            console.log(str);
            var user = JSON.parse(str);
            readUsers(function(result) {
                user.id = result.length ? parseInt(result[result.length - 1].id) + 1 : 1;
                result.push(user);
                writeUsers(result, function() {
                    res.end(JSON.stringify(user));
                })
            })
        });
    } else if (userLogin.test(pathname)) {
        var str = '';
        req.on('data', function(chunk) {
            str += chunk;
        });
        req.on('end', function() {
            console.log(str);
            var user = JSON.parse(str);
            readUsers(function(result) {
                result.forEach(function(item) {
                    if (item.name == str.name && item.password == str.password) {
                        res.end(JSON.stringify(user));
                    }
                    res.end('error');
                })
            })
        });
    } else {
        fs.exists('.' + pathname, function(flag) {
            if (flag) {
                res.setHeader('Content-Type', mime.lookup(pathname) + ';charset=utf8');
                fs.createReadStream('.' + pathname).pipe(res);
            } else {
                res.statusCode = 404;
                res.end('not found');
            }
        })
    }
}).listen(8080);
