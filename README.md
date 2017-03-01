# Fbook

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
0 | 不可借
1 | 可借

### Status In Record
status | message
0 | 借阅中
1 | 已归还

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
#### 用户注册

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
address | http://localhost:3000/books
method | POST
parameters | userId,bookId,startTime(optional),status(optional)

#### 查询借阅记录
key | value
---|---
address | http://localhost:3000/books
method | GET
query parameters | userId,offset,limit


#### 还书
