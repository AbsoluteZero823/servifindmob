const expressJwt = require("express-jwt");

function authJwt() {
    const secret = process.env.secret;
    const api = process.env.API_URL;
    return expressJwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        path: [
            { url: /\/public\/uploads(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/api\/v1\/services(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/api\/v1\/users(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/api\/v1\/inquiries(.*)/, methods: ['GET','POST','DELETE', 'OPTIONS'] },

            // { url: /\/api\/v1\/orders(.*)/, methods: ['GET', 'OPTIONS', 'POST'] },
            `${api}/inquireform`,
            `${api}/users/logout`,
            `${api}/users/login`,
            `${api}/users/register`,
            
            // `${api}/users/userprofile`,
            // `${api}/users/:id`,

        ]
    })
}

async function isRevoked(req, payload, done) {
    if (!payload.isAdmin) {
        done(null, true)
    }

    done();
}



module.exports = authJwt