# taro 小程序 openapi 数据 mock

## 安装

`npm i -g shang-package/weapp-mock`

## 配置

1. 项目目录下存在文件 `src/config/index.(ts|js)`
2. `src/config/index.(ts|js)` 文件需要导出 2 个变量: `export { baseUrl, originBaseUrl }`  
   其中 `originBaseUrl` 是指未代理前的地址 , 如 `http://example.com/api/xxxx`  
   其中 `baseUrl` 是指代理地址, 如`http://127.0.0.1:8888`
3. 项目目录下存在文件 `openapi.config.js`, 内容如下

   ```js
   module.exports = [
     {
       schemaPath: "http://xxxxx/v2/api-docs?group=测试",
       serversPath: "./src/services",
       projectName: "xxxx",
       apiPrefix: `'/xxxx'`,
       namespace: "xxxx",

       // 以下为 mock 数据配置
       mock: false,
       mockFolder: "./mock/xxxxx",
       mockPathPrefix: "/xxxx",
     },
   ];
   ```

4. 项目目录下执行 `taro-weapp-mock`
