import { sign, verify, decode as _decode } from "jsonwebtoken";


 function createToken(userDetail, accessExp, refreshExp) {
    let accessToken = sign({ userDetail }, process.env.access_key, { expiresIn: accessExp })
    let refreshToken = sign({ userDetail }, process.env.refresh_key, { expiresIn: refreshExp })
    return { "accessToken": accessToken, "refreshToken": refreshToken };
}


 function verifyToken(req, res, next) {
    
    let mobileToken = req.headers["authorization"];
    let token;
    if (!mobileToken) {
        return res.set("Connection", "close").status(401).json()
    } else {
        let accessToken = mobileToken.split(" ")[1];
        token = accessToken;
    }
    verify(token, process.env.access_key, function (err) {
        if (!err) {
            req.user = decode(token);
            console.log("the req ",req.user)
            next();
        }
        else {
            return res.set("Connection", "close").status(401).json()
        }
    })
}



 function newAccessToken(req, res, accessExp, refreshExp, callback) {
    let refToken = req.body?.refreshToken
    let token;
    if (!refToken) {
        return res.set("Connection", "close").status(401).json()
    } else {
        token = refToken
    }
    let userDetail = decode(token)
    verify(token,process.env.refresh_key, (err) => {
        if (!err) {
            const accessToken = sign({ userDetail }, process.env.access_key, { expiresIn: accessExp });
            const refreshToken = sign({ userDetail }, process.env.refresh_key, { expiresIn: refreshExp })
            return res
                .set("Connection", "close")
                .status(200)
                .json({
                    token: {
                        "accessToken": accessToken,
                        "refreshToken": refreshToken
                    }
                })
        } else {
            if (callback) {
                return callback(() => res.set("Connection", "close").status(417).clearCookie("accessToken").clearCookie("refreshToken").json())
            } else {
                return res.set("Connection", "close").status(417).clearCookie("accessToken").clearCookie("refreshToken").json()
            }
        }
    })
}


 function decode(token) {
    return _decode(token).userDetail;
}


export default { createToken, verifyToken, newAccessToken, decode }
