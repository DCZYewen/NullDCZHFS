# NullcatServer 
一个高速，轻量，异步的HTTP(s)框架（自带服务器），李子豪Gemini (DCZ_Yewen)为其编写了HFS的前端，修复了少许BUG。

## 食用方法 
1. 安装依赖(pip install -r requirements.txt)  
2. 运行程序(python3 main.py)  
3. 在程序根目录创建.forbidden_flag文件标识最远回溯目录。

## HFS
1. HFS的目录在NullcatServer的host下的`hfs/index.html`。
2. 进入`http://example.com/hfs/index.html`即可进入HFS。
3. HFS默认自带了jquery和bootstrap等等依赖文件，根据需求选择cdn或者使用程序包附带的库。

### 可选步骤 
1. 设置服务器(编辑config.json)，默认配置文件指示NullcatServer后台启动。
2. 迁移数据库(直接执行python3 migrare.py)  

## 注意 
Nullcat : 这个框架暂时没有稳定版本，可能会出现一些奇怪的问题，~~500是常态，自己修修就好了~~  

李子豪Gemini : 目前HFS系统没有发现BUG，如果有，请在issue里指出。
