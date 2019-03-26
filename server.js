const http = require('http');
const url = require('url');
const queryString = require("querystring");
const mysql = require("mysql");

const hostname = 'localhost';
const port = 1338;

http.createServer((req, res) => {
  res.writeHead(200, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  });
  var pool = mysql.createPool({ //链接池配置
    host: "localhost", //主机地址 IP地址 本机地址 -h
    port: 3306, //端口号默认是3306，如果改了就写改后的端口
    user: "root", //账号名 用户名
    password: "54guoshuai", //密码 如果没有就不写
    database: "Framework7-vue" //操作的数据库
  });

  function getConn(sqlStr) {
    var promise = new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          console.log("获取失败");
        } else {
          connection.query(sqlStr.cmd, (err, result) => {
            if (err) {
              console.log("操作失败：" + err.sqlMessage);
            } else {
              resolve(result);
            };
            connection.release();
          });
        };
      });
    });
    return promise;
  };
  //req.url 请求的URL
  let methods = req.method;
  // console.log("当前的访问方式是:" + methods);
  if (methods == "GET") {
    let params = url.parse(req.url, true, true);
    // url对象
    console.log(params);
    switch (url.parse(req.url).pathname) {
      case "/Today": // 返回轮播图
        getConn({
          cmd: "select * from Today"
        }).then(data => {
          res.end(JSON.stringify(data));
        });
        break;
      case "/TodayDetails":
        getConn({
          cmd: "select * from Today where id=" + (params.query.page * 8 + 1)
        }).then(data => {
          if (params.query.page > Math.ceil(data.length / 8)) return res.end(JSON.stringify("end"));
          else res.end(JSON.stringify(data));
        });
        break;
      default:
        break;
    };
  } else {
    let datas = "";
    req.on("data", (chunk) => {
      datas += chunk;
    });
    req.on("end", () => {
      // 如果是ajax post请求这里换成JSON.parse
      let postData = queryString.parse(datas.toString());
      console.log(postData);
      switch (req.url) {
        case "/Today": // 返回轮播图
          getConn({
            cmd: "select * from Today"
          }).then(data => {
            res.end(JSON.stringify(data));
          });
          break;
          case "/TodayDetails":
                getConn({
                    cmd: "select * from TodayDetails where id=" + postData.id
                }).then(data => {
                  let TodayDetails = new Object();
                  TodayDetails.details = data[0];
                  getConn({
                      cmd: "select * from TodayPhoto where id=" + postData.id
                  }).then(data => {
                    TodayDetails.photos = data;
                    res.end(JSON.stringify(TodayDetails));
                  });
                });
                break;
        default:
          break;
      };
    });
  };
}).listen(port, hostname, () => {
  console.log(`服务启动成功 http://${hostname}:${port}/`);
});