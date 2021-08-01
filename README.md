## ⚠️注意点

**webpack 4**

1. style-loader <= 2.0.0
2. css-loader <= 5.2.7
3. less-loader <= 7.3.0
4. webpack-cli <= 3.3.12 (webpack-dev-server 命令 -> webpack serve)
5. mini-css-extract-plugin <= 1.6.2
6. optimize-css-assets-webpack-plugin (css-minimizer-webpack-plugin for webpack5)
7. cssnano <= 4.1.11
8. html-webpack-plugin <= 4.5.2
9. postcss-loader <=4.3.0
10. raw-loader <= 1.0.0 (webpack5支持asset模块，废弃了raw-loader/url-loader/file-loader)

### source map

> [JavaScript Source Map 详解](https://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html)

+ eval: 使用eval包裹模块代码
+ source map: 产生`.map`文件
+ cheap: 不包含列信息
+ inline: 将`.map`作为`DataURI`嵌入，不单独生成`.map`文件
+ module: 包含`loader`的`sourcemap`

### 提取公共资源

**方式一：用 script 引入**
+ [html-webpack-externals-plugin](https://www.npmjs.com/package/html-webpack-externals-plugin)
+ 通过`script标签`直接引入cdn

**方式二：打包成 vendors 脚本**
+ [splitChunksPlugin](https://webpack.js.org/plugins/split-chunks-plugin/#root)

```sh
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /(react|react-dom)/,
          name: 'vendors',
          chunks: 'all',
        }
      }
    }
  },
```

### tree-shaking

+ 支持ESM，不支持CJS
+ mode=production 默认开启 tree-shaking
+ 纯函数（无副作用）的代码才能被摇除

### scope hoisting

+ 支持ESM，不支持CJS
+ mode=production，默认开启`module-concatenation-plugin`
+ 原理：将所有模块的代码按照引用顺序放在一个函数作用域里，然后适当地重命名一些变量以防止变量名冲突
+ 对比：通过`scope hoisting`可以减少声明代码和内存开销

### 代码分割 & 动态import

**懒加载js脚本的方式**
1. CJS：require.ensure
2. ES6: 动态import(目前还没有原生支持，需要babel转换) -- @babel/plugin-syntax-dynamic-import

### eslint

**parser**
+ 将代码转换为 ESTree，ESLint 会对 ESTree 进行校验
+ esprima
+ babel-eslint

### 打包组件库、基础库

+ library 指定库的全局变量
+ libraryTarget 支持库引入的方式
