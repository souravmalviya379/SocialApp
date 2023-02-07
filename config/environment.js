const development = {
    name: 'development',
    asset_path: '/assets',
    port: 8000,
    db: 'SocialApp_DB',
    session_cookie_key: process.env.SOCIALAPP_SESSION_COOKIE_KEY,
    jwt_secret: process.env.SOCIALAPP_JWT_SECRET,
    google_client_id: process.env.SOCIALAPP_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.SOCIALAPP_GOOGLE_CLIENT_SECRET,
    google_callback_url: process.env.SOCIALAPP_GOOGLE_CALLBACK_URL
}

module.exports = development;