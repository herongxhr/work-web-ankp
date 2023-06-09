# p8-theme 主题管理



## 介绍

p8-theme的目标是让应用系统不通过JavaScript也能实现对系统主题的管理，在系统样式开发过程中只需关注业务样式的实现，无需关心怎么使用代码来操作主题样式。

相较于V1.0.0,p8-theme下面两种扩展方式进行了内置，在使用场景上为了满足独立的组件开发需要：
1. 主题扩展
2. 组件扩展

此插件主要是利用Sass这种CSS扩展语言来实现的，引用的系统请自行支持Sass。

### 安装

```
npm install p8-theme
```

## 快速上手


### 引入方式

```
@import '~p8-theme/dist/main.scss';
```

### 使用

```
@include p8-install-component() {
  .about {
    h1 {
      color: p8-theme(background-primary-color-1);
    }
  }
}
```

## 引用目录结构

![alt 目录结构](https://192.168.1.19/huchongchong/p8-image/-/raw/master/theme01.png)

