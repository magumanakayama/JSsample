// Redisクライアントの設定
const redisConfig = {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password : process.env.REDIS_PASSWORD, // Redisのパスワード
    enableOfflineQueue: false, // オフラインキューを無効化    
}

exports.redisConfig = redisConfig;