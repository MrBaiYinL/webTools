import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import typescript from "rollup-plugin-typescript";
import json from "rollup-plugin-json";
import babel from "rollup-plugin-babel";
import pkg from "./package.json";
import postcss from "rollup-plugin-postcss";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import { terser } from "rollup-plugin-terser";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";

export default {
  input: {
    // 打包多入口
    foo: "src/index.ts",
    bar: "src/index.ts",
  },
  output: {
    dir: pkg.browser, // 最终打包出来的文件路径和文件名，这里是在package.json的browser: 'dist/index.js'字段中配置的
    format: "cjs", // umd是兼容amd/cjs/iife的通用打包格式，适合浏览器
    name: "tools",
  },
  // [
  //   // 打包出口,按需打包成不同的.UMD and IIFE output formats are not supported for code-splitting builds
  //   {
  //     file: pkg.browser, // 最终打包出来的文件路径和文件名，这里是在package.json的browser: 'dist/index.js'字段中配置的
  //     format: "umd", // umd是兼容amd/cjs/iife的通用打包格式，适合浏览器
  //     name: "tools",
  //   },
  //   {
  //     file: "./dist/my-lib-umd.js",
  //     format: "umd",
  //     name: "myLib",
  //   },
  //   {
  //     file: "./dist/my-lib-es.js",
  //     format: "es",
  //   },
  //   {
  //     file: "./dist/my-lib-cjs.js",
  //     format: "cjs",
  //   },
  // ],
  plugins: [
    // 打包插件
    resolve(), // 查找和打包node_modules中的第三方模块
    commonjs(), // 将 CommonJS 转换成 ES2015 模块供 Rollup 处理
    typescript(), // 解析TypeScript
    json(),
    babel({
      exclude: "node_modules/**",
    }),
    postcss({
      plugins: [
        autoprefixer(), // 样式前缀适配不同浏览器
        cssnano(), // 压缩css
      ],
      extract: "css/index.css", // 抽离css，注意：在页面也需要单独引入打包好的css文件
    }),
    terser(), // 代码压缩
    serve({
      contentBase: "", //服务器启动的文件夹，默认是项目根目录，需要在该文件下创建index.html
      port: 8020, //端口号，默认10001
    }),
    livereload("dist"), //watch dist目录，当目录中的文件发生变化时，刷新页面
  ],
};

// rollup基础插件

// rollup-plugin-alias: 提供modules名称的 alias 和reslove 功能

// rollup-plugin-babel: 提供babel能力

// rollup-plugin-eslint: 提供eslint能力

// rollup-plugin-node-resolve: 解析 node_modules 中的模块

// rollup-plugin-commonjs: 转换 CJS -> ESM, 通常配合上面一个插件使用

// rollup-plugin-serve: 类比 webpack-dev-server, 提供静态服务器能力,启动一个服务器

// rollup-plugin-filesize: 显示 bundle 文件大小

// rollup-plugin-uglify: 压缩 bundle 文件

// rollup-plugin-replace: 类比 Webpack 的 DefinePlugin , 可在源码中通过 process.env.NODE_ENV 用于构建区分 Development 与 Production 环境.

// rollup-plugin-postcss。它支持css文件的加载、css加前缀、css压缩、对scss/less的支持等等。

// rollup-plugin-livereload用于文件变化时，实时刷新页面。

// rollup监听源文件的改动很简单，就是在执行打包命令时，添加 -w 或者 --watch， "dev": "rollup -wc"
