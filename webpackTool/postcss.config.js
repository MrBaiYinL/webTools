module.exports = {
  plugins: [
    require("autoprefixer"), // css内容添加浏览器前缀兼容
    // 压缩css代码
    require("cssnano")({
      preset: "default",
    }),
  ],
};
