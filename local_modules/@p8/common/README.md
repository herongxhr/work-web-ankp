# p8-plugin-common

框架通用类，包括系统集成等等扩展功能

## 使用
1. 使用CLI设置本地仓库地址：CLI命令在package.json中有配置 4:config
2. 配置文件
    - webpack.dev.js: 开发环境配置文件
    - webpack.prod.js: 生产环境配置文件
    - webpack.normal.js: 非压缩模式配置文件
3. 安装项目依赖包
```
npm install / yarn install
```


## 如何打包？

此插件使用3种打包方式：
1. 开发环境打包：
2. 非压缩模式打包
3. 生成模式打包

3种打包方式在package.json文件中都有相关命令1:serve、2:build:min、3:build:normal

