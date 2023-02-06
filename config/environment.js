const development = {
    name: 'development',
    asset_path: '/assets',
    port: 8000,
    db: 'SocialApp_DB',
    session_cookie_key: process.env.SOCIALAPP_SESSION_COOKIE_KEY,
    jwt_secret: process.env.SOCIALAPP_JWT_SECRET
}

module.exports = development;