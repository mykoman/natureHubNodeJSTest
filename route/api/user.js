const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const User = require('../../Models/User')


//route
router.get('/', async (req, res) =>{
    //retrieve all cookies
    const storedCookies = parseCookies(req)
    let trackingCode ;
    let anonymousUser;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    //check for specific cookie
    trackingCode = storedCookies.natureHubTrackingTokenCode;
    if(trackingCode){
        //cookie found, user should exist
        const updates = {
            ip,
            $inc : { visits: 1},
            lastVisit: Date.now()
        }
        try {
            anonymousUser = await User.findOneAndUpdate({trackingCode}, updates, {new : true} );
            
            
        } catch (error) {
            console.log(error)
        }
        console.log(storedCookies);
        
    }
    else{
        //no cookie found, create user
        trackingCode = uuidv4();
        try {
            const anonymousUserObject = await new User({
                ip,
                trackingCode,
                lastVisit: Date.now()
            })
            anonymousUser = await anonymousUserObject.save();
            console.log("no cookie found");
        } catch (error) {
            console.log(error)
        }
       
       
    }
    res.setHeader('Set-Cookie', 'natureHubTrackingTokenCode='+trackingCode+';expires='+new Date(new Date().getTime()+36000000000000).toUTCString());
    res.status(200).json(anonymousUser)

})

/**
 * @description helps to get all cookies and puts them in an object for easy extraction
 * @param request 
 * @returns object
 */
function parseCookies (request) {
    var list = {},
        requestCookies = request.headers.cookie;

    requestCookies && requestCookies.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    return list;
}

module.exports = router;
