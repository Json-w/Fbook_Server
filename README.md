# Fbook
## todo
- [ ] 数据库密码加密
- [ ] 权限控制
- [ ] 借书记录filter

## API
### Error Code

code | message
---|---
10000 | 操作成功
30001 | 用户登录失败
30002 | 用户注册失败(邮箱已被注册)
40001 | token过期
50000 | 操作失败

### Status In Book
status | message
---|---
0 | 可借
1 | 不可借

### Status In Record
status | message
---|---
0 | 已归还
1 | 借阅中

每个API返回格式
```
{
    code:"10000",
    message:"success",
    result:{
        ...
    }
}
```


### user
#### 用户登录
key  | value
---|---
address | http://localhost:3000/user/session
method | POST
parameters|username,password
请求格式|json
##### request
```
{"username":"wangpei","password":"wangpei"}
```
##### response
```
{
    "code": "10000",
    "message": "success",
    "result": {
        "id": 28,
        "username": "wangpei",
        "password": null,
        "email": "519875872@qq.com",
        "telephone": null,
        "address": null,
        "token": "26b00a70-8620-48d8-b091-037537b412f7"
    }
}
```

#### 用户注册
key | value
---|---
address | http://localhost:3000/user/register
method | POST
parameters | username password email telephone address imageUrl
请求格式 | json
##### request
```
{"username":"wangpei","password":"wangpei","email":"519875872@qq.com"}
```
##### response
```
{
    "code": "10000",
    "message": "register success"
}
```
```
{
    "code": "50000",
    "message": "register failure"
}
```

#### 用户数据更新
key | value
---|---
address | http://localhost:3000/user
method | PUT
parameters | id(must)


### book
#### 删除书籍
key  | value
---|---
address | http://localhost:3000/books/:id
method | DELETE
parameters|id
请求格式|json


#### 根据书名模糊查询
key  | value
---|---
address | http://localhost:3000/books?name
method | GET
parameters|name


#### 查询所有书籍
key  | value
---|---
address | http://localhost:3000/books
method | GET
query parameters(optional)|offset,limit,name

#### 借阅书籍
key | value
---|---
address | http://localhost:3000/records
method | POST
parameters | userId,bookId,startTime(optional),status(optional)

#### 查询借阅记录
key | value
---|---
address | http://localhost:3000/books
method | GET
query parameters | userId,offset,limit


#### 还书
key | value
---|---
address | http://localhost:3000/records
method | PUT

### 新增API
根据书籍获取借阅记录
http://localhost:3000/books/41/records?token=xxx&status=0

获取用户信息
http://localhost:3000/user/1?token=xx

