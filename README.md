### 說明
須先安裝 node.js。
使用react作為主要的邏輯框架，webpack作為打包工具。
### 開發環境
``` shell
# 切換到專案目錄
cd $(dirname $0)
# 依照 package.json 安裝本專案的依賴包
npm install
```
### 啟動測試環境
執行專案目錄內的 npm_start_webpack_dev.command，會啟動 webpack_dev_server，監聽專案資料夾的變化並自動更新畫面。
webpack_dev_server的相關設定(address/port)在```launch_webpack_dev_server.js```內
若要停止webpack_dev_server，則執行專案目錄內的 npm_stop_webpack_dev.command。
### 修改 webpack dev server 的設定
## Port
```launch_webpack_dev_server.js```內修改三個地方
``` javascript
// ...

config.entry.app.unshift("webpack-dev-server/client?http://localhost:6060/", "webpack/hot/dev-server");

new WebpackDevServer(webpack(config), {
  // ...
}).listen(6060, 'localhost', function (err, result) {
  // ...

  console.log('Listening at http://localhost:6060/');
});
// ...
```
目前預設使用 6060 port，若要使用別的 port 則把 6060改為需要的數字，然後重新啟動 webpack_dev_server 即可。
### 發佈
執行專案目錄內的 ```npm_build_release```