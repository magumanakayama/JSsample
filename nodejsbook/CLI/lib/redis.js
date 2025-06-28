const { redisConfig } = require('../config');
const Redis = require('ioredis');


let redis = null;

// redisクライアントのゲッター
const getClient = () => redis;
exports.getClient = getClient;


// redisクライアント生成
const connect = () => {
    if (!redis) {
        redis = new Redis(redisConfig);
        return redis;
    }
    return redis;
}
exports.connect = connect;


// redisクライアント生成時の初期処理
const init = async () => {
    await Promise.all([
        redis.set('user:1', JSON.stringify({ id: 1, name : 'maguma' })),
        redis.set('user:2', JSON.stringify({ id: 2, name : 'Nakayama' })),
        redis.set('user:3', JSON.stringify({ id: 3, name : 'Okabe' })),
    ])

    // await redis.rpush('users:list', JSON.stringify({ id: 1, name : 'maguma' }));
    // await redis.rpush('users:list', JSON.stringify({ id: 2, name : 'Nakayama' }));
    // await redis.rpush('users:list', JSON.stringify({ id: 3, name : 'Okabe' }));
};
exports.init = init;