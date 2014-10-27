var http = require('http');
var work = require('./lib/timetrack');
var mysql = require('mysql');

var db = mysql.createConnection({
    host:     '127.0.0.1',
    user:     'root',
    password: 'root',
    database: 'timetrack'
});

//程序逻辑
//浏览、添加、删除工作记录、归档工作记录
//归档的工作记录不再出现在主页面上
//但可以在一个单独的web页面上浏览

var server = http.createServer(function(req, res) {
   switch (req.method) {
       case 'POST':
           switch (req.url) {
               case '/':
                   break;
               case '/archive':
                   break;
               case '/delete':
                   break;
           }
           break;
       case 'GET':
           switch (req.url) {
               case '/':
                   break;
               case 'archived':
                   break;
           }
           break;
   }
});

//创建一个数据库表（如果不存在的话）
//启动http服务器
//所有的node-mysql查询都用query函数执行

db.query(
    "CREATE TABLE IF NOT EXISTS work ("
    + "id INT(10) NOT NULL AUTO_INCREMENT, "
    + "hours DECIMAL(5,2) DEFAULT 0, "
    + "date DATE, "
    + "archived INT(1) DEFAULT 0, "
    + "description LONGTEXT, "
    + "PRIMARY KEY(ID)",
    function(err) {
        if (err) throw err;
        console.log('Sever started...');
        server.listen(3000, '127.0.0.1');
    }
);