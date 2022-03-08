## webpack 优点

1、拥有依赖管理、动态打包、代码分离、按需加载、代码压缩、静态资源压缩、缓存等配置；
2、webpack 扩展性强，插件机制完善，开发者可自定义插件、loader；
3、webpack 社区庞大，更新速度快，轮子丰富；
4、webpack 通过依赖关系图可以获取非代码资源，如 images 或 web 字体等。并会把它们作为依赖提供给应用程序。
5、每个模块都可以明确表述它自身的依赖，在打包时可根据依赖进行打包，避免打包未使用的模块

## webpack-cli 是 webpack 的命令行工具，用于在命令行中使用 webpack

# 处理 js 文件，将 es6+代码进行编译成为浏览器可以识别的低版本兼容性良好的 js 代码了

## babel-loader

首先对于我们项目中的 jsx 文件我们需要通过一个"转译器"将项目中的 jsx 文件转化成 js 文件，babel-loader 在这里充当的就是这个转译器。

## @babel/core

babel-loader 仅仅识别出了 jsx 文件，内部核心转译功能需要@babel/core 这个核心库，@babel/core 模块就是负责内部核心转译实现的

## @babel/preset-env

@babel/prest-env 是 babel 转译过程中的一些预设，它负责将一些基础的 es 6+语法，比如 const/let...转译成为浏览器可以识别的低级别兼容性语法。

这里需要注意的是@babel/prest-env 并不会对于一些 es6+高版本语法的实现，比如 Promise 等 polyfill，你可以将它理解为语法层面的转化不包含高级别模块(polyfill)

## @babel/plugin-transform-runtime

@babel/plugin-transform-runtime,上边我们提到了对于一些高版本内置模块，比如 Promise/Generate 等等@babel/preset-env 并不会转化，所以@babel/plugin-transform-runtime 就是帮助我们来实现这样的效果的,他会在我们项目中如果使用到了 Promise 之类的模块之后去实现一个低版本浏览器的 polyfill。

其实与@babel/plugin-transform-runtime 达到相同的效果还可以直接安装引入@babel/polyfill，不过相比之下这种方式不被推荐，他存在污染全局作用域，全量引入造成提及过大以及模块之间重复注入等缺点。

# 支持 jsx 需要额外配置 babel 去处理 jsx 文件，将 jsx 转译成为浏览器可以识别的 js

## @babel/preset-react

@babel/preset-react 是内置了一系列 babel plugin 去转化 jsx 代码成为我们想要的 js 代码

## html-webpack-plugin

功能：当使用 webpack 打包时，创建一个 html 文件，并把 webpack 打包后的静态文件自动插入到这个 html 文件当中。
用这个文件(public/index.html)作为插件的模板文件，同时与 index.js 入口文件中的 ReactDom.reander(...,document.getElementById('root'))进行呼应，页面中已经创建一个 id=root 的 div 作为渲染节点。

## webpack-dev-server

SPA 单页面应用,为了不用每次修改代码都需要执行一次打包命令再进行预览。
webpack 提供了 devServer 配置，支持每次更新代码热重载。

## clean-webpack-plugin

clean-webpack-plugin 是一个清除文件的插件。在每次打包后，磁盘空间会存有打包后的资源，在再次打包的时候，需要先把本地已有的打包后的资源清空，来减少对磁盘空间的占用。插件 clean-webpack-plugin 就是用来做这个事情。

## 配置路径别名 在 webpack.config.js 中加入

resolve: {
alias: {
"@": path.resolve(\_\_dirname, "./src"),
},
mainFiles: ["index", "main"],
},

## 设置图片和字体 在 webpack.config.js module 的 rule 新增（assets 模块是 webpack5 自带）

      {
        test: /\.(png|jpe?g|svg|gif)$/,
        type: "asset/inline",
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        type: "asset/resource",
        generator: {
          filename: "fonts/[hash][ext][query]",
        },
      },

## js 压缩（webpack5 自带最新的 terser-webpack-plugin）webpack.prod.js、webpack.config.js 都需要进行配置

terser-webpack-plugin 默认开启了 parallel: true 配置，并发运行的默认数量： os.cpus().length - 1 ，我们默认配置的 parallel 数量为 4，使用多进程并发运行压缩以提高构建速度。

## 配置 css loader(postcss-loader、css-loader、MiniCssExtractPlugin.loader)

# PostCSS 与 babel 一样都是功能比较复杂的插件系统，我们这里主要是 postcss-loader 处理生成的 css。

需要在根目录下新建一个 postcss.config.js 文件，并进行配置

# css-loader 是解析 css 文件中的@import/require 语句分析的.

# MiniCssExtractPlugin.loader

这个插件将 CSS 提取到单独的文件中。它为每个包含 CSS 的 JS 文件创建一个 CSS 文件。它支持按需加载 CSS 和 SourceMaps。
这里需要提一下与 style-loader 的区别，我们在这里使用 MiniCssExtractPlugin 代替了 style-loader。
style-loader 会将生成的 css 添加到 html 的 header 标签内形成内敛样式，这显然不是我们想要的。所以这里我们使用 MiniCssExtractPlugin.loader 的作用就是拆分生成的 css 成为独立的 css 文件。
在 webpack.config.js 中进行 css 配置
{
test: /\.css$/,
use: [
{
loader: MiniCssExtractPlugin.loader,
},
"css-loader",
"postcss-loader",
],
},

new MiniCssExtractPlugin({
filename: "assets/[name].css",
}),

## 配置 less

# 在 webpack.config.js 中的 style-loader、css-loader、less-loader 的顺序不能改变，因为 webpack 在转换时是从后往前转的，即先将.less 转成.css，然后在将.css 写进 style 里的。

# 当我们引入 antd.less 时，需要启动 less-loader 的 javascriptEnabled=true

{
loader: MiniCssExtractPlugin.loader,
},
"css-loader",
"postcss-loader",
// 当解析 antd.less，必须写成下面格式，否则会报 Inline JavaScript is not enabled 错误
{ loader: "less-loader", options: { lessOptions: { javascriptEnabled: true } } },
]

## CssMinimizerWebpackPlugin 将在 Webpack 构建期间搜索 CSS 文件，优化、压缩 CSS

# webpack.prod.js、webpack.config.js 都需要进行配置

optimize-css-assets-webpack-plugin 与 css-minimizer-webpack-plugin 相比， css-minimizer-webpack-plugin 在 source maps 和 assets 中使用查询字符串会更加准确，而且支持缓存和并发模式下运行。

## progress-bar-webpack-plugin 编译进度条

# webpack.common.js 中进行配置

通过 progress-bar-webpack-plugin 插件查看编译进度，方便我们掌握编译情况。

## speed-measure-webpack-plugin 编译速度分析 webpack.dev.js

const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();
module.exports = smp.wrap({
// ...webpack config...
})

## webpack-bundle-analyzer 打包体积分析 webpack.common.js / webpack.dev.js

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
plugins: [
// 打包体积分析
new BundleAnalyzerPlugin()
],
}

## 代码规范 eslint + prettier

# prettier .prettierrc.js 配置文件, .prettierignore 让 prettier 忽略检查一些文件:

module.exports = {
printWidth: 120, // 代码宽度建议不超过 100 字符
tabWidth: 2, // tab 缩进 2 个空格
semi: false, // 末尾分号
singleQuote: true, // 单引号
jsxSingleQuote: true, // jsx 中使用单引号
trailingComma: 'es5', // 尾随逗号
arrowParens: 'avoid', // 箭头函数仅在必要时使用()
htmlWhitespaceSensitivity: 'css', // html 空格敏感度
}

# eslint

安装 npm i -D eslint
初始化 npx eslint --init
配置文件 .eslintrc.js
忽略检查文件 .eslintignore

当 prettier 和 eslint 共同工作时，可能会冲突。需要安装 eslint-config-prettier 插件并且覆盖 eslint 部分规则

## lint-staged 只对进入暂存区的文件进行校验

# 添加配置文件 lint-staged.config.js

在整个项目上运行 lint 效率会非常底下，为了提升效率，使用的工具 lint-staged

# 命令行执行 npx lint-staged 就能手动在暂存区运行 eslint+prettier 进行代码风格校验

## husky 代码提交动作（commit）的时候自动运行代码校验命令，保证代码的规范性与风格统一

在 package.json 添加脚本命令{"prepare": "husky install"}
然后命令行执行： npx husky add .husky/pre-commit "npx lint-staged"
会自动生成.husky 文件夹

# 此时每当执行 git commit 操作时，都会自动执行 lint-staged 做规则校验，如果 lint 没有通过，则会 abort 当前的 commit 操作，直到修复完了所有的 error 才能成功提交

## webpack 环境拆分

development(开发环境) 和 production(生产环境) 这两个环境下的构建目标存在着巨大差异。为代码清晰简明，为每个环境编写彼此独立的 webpack 配置

# webpack-marge 合并通用配置和特定环境配置

将配好的 webpack.config.js 的内容拆分到 config 文件夹的三个配置文件中
通用配置 webpack.common.js
开发环境配置 webpack.development.js
生产环境配置 webpack. production.js

## 构建速度优化

# cache

通过配置 webpack 持久化缓存，cache: filesystem，来缓存生成的 webpack 模块和 chunk，改善构建速度，可提速 90% 左右；

# 减少 loader、plugin

每个的 loader、plugin 都有其启动时间，尽量少地使用工具，将非必须的 loader、plugins 删除
