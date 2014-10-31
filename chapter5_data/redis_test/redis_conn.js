var redis = require('redis');
//链接redis
var client = redis.createClient(6379, '127.0.0.1');

client.on('error', function(err) {
    console.log('Error ' + err);
}) ;

//操作redis中的数据
//print函数输出操作的结果，或在出错时输出错误
client.set('color', 'red', redis.print); //reply:ok
client.get('color', function(err, value) {
   if (err) throw err;
    console.log('Got: ' + value);
});

//用哈希表存储和获取数据
//hmset设定哈希表中的元素
//hkeys列出哈希表中的所有元素的键
client.hmset('camping', {
   'shelter': '2-person tent',
    'cooking': 'campstove'
}, redis.print);

client.hget('camping', 'cooking', function(err, value) {
   if (err) throw err;
    console.log('Will be cooking with: ' + value);
});

client.hkeys('camping', function(err, keys) {
   if (err) throw err;
    keys.forEach(function(key, i) {
       console.log('   ' + key);
    });
});


//用链表存储和获取数据
//lpush lrange(start, end)
client.lpush('tasks', 'Paint the bikeshed red.', redis.print);
client.lpush('tasks', 'Paint the bikeshed green.', redis.print);
client.lrange('tasks', 0, -1, function(err, items) {
   if (err) throw err;
    items.forEach(function(item, i) {
       console.log('   ' + i + item);
    });
});

//用集合存储和获取数据
//集合使一组无序的字符串组
//集合获取数据的性能比链表好
//集合中的元素必须使唯一的，把两个相同的值存到集合中，第二次尝试会被忽略
client.sadd('ip_addresses', '204.10.37.96', redis.print);
client.sadd('ip_addresses', '204.10.37.96', redis.print);
client.sadd('ip_addresses', '72.32.231.8', redis.print);
client.smembers('ip_addresses', function(err, members) {
    if (err) throw err;
    console.log(members);
});