# 1.安装 Framework7 和 Vue
+ 使用NPM： npm install framework7
+ 使用NPM： npm install vue
# 2.安装 Framework7-Vue 插件
+ 使用NPM： npm install framework7-vue
# 3.安装 cordova （打包工具）
+ npm i cordova -g
## 3.1 创建cordova项目
+ cordova create 工程名 构建ID 软件名
+ 例如：cordova create nyapass com.nyapass.moe Nyapass
## 3.2 添加目标平台
+ cd到工程目录下：
+ cordova platform add ios --save
+ cordova platform add android --save
+ cordova工程中的platforms文件夹中生成对应平台的工程文件
## 3.3 查看添加的平台
+ cordova platform ls
## 3.4 打包指定的平台
+ cordova build ios --buildFlag='-UseModernBuildSystem=0'
## 3.5 运行app
+ cordova run ios --buildFlag='-UseModernBuildSystem=0'
## Cordova - 禁用整个应用页面的上下拖动效果（防止拖动出现黑边）
+  config.xml 中： 
+  name="WebViewBounce" value="false"
+  name="DisallowOverscroll" value="true"
# 使用Dom7
+ this.$$('el')
+ 和 jq 基本一样
