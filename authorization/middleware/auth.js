const {getUser} = require("../service/auth");


async function restrictToLoggedinUserOnly(req,res,next){
   
    const userUid = req.cookies?.uid;

    // const userUid = req.headers("authorization");

    if(!userUid) return res.redirect("/login");
    // const token  = userUid.split("Bearer ")[1];
    //for cookies
    const user = getUser(userUid);

    //for authorization
    // const user = getUser(token);

    if(!user) return res.redirect("/login");

    req.user = user;
    next();
}

async function checkAuth(req,res,next) {
    const userUid = req.cookies?.uid;
    // const userUid = req.headers["authorization"];
    // const token  = userUid.split("Bearer ")[1];
    const user = getUser(userUid);
    //  const user = getUser(token);
    req.user = user;
    next();
}

module.exports = {
    restrictToLoggedinUserOnly,
    checkAuth,
};