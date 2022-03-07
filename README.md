# webTools
前端、工具库、tools

why Rollup?

###Rollup官网：
Rollup 是一个 JavaScript 模块打包器，可以将小块代码编译成大块复杂的代码，例如 library 或应用程序。
Rollup 对代码模块使用新的标准化格式，这些标准都包含在 JavaScript 的 ES6 版本中，而不是以前的特殊解决方案，如 CommonJS 和 AMD。ES6 模块可以使你自由、无缝地使用你最喜爱的 library 中那些最有用独立函数，而你的项目不必携带其他未使用的代码。ES6 模块最终还是要由浏览器原生实现，但当前 Rollup 可以使你提前体验。


开发js库，webpack的各种loader和打包后的文件体积就不太适用，针对于开发项目是很有效的。
所以rollup的产生就是针对开发js库的。
rollup生成代码只是把我们的代码转码成目标js,同时如果需要,可以同时生成支持umd/commonjs/es的js代码,vue/react/angular都在用它作为打包工具。查看他们的官网代码都可以看到rollup的影子。