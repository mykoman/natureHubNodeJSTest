const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');


//route
router.get('/', async (req, res) =>{
    //retrieve all cookies
    const storedCookies = parseCookies(req)
    let trackingCode ;
    //check for specific cookie
    const natureHubCookie = storedCookies.natureHubTrackingTokenCode;
    if(natureHubCookie){
        //cookie found, user should exist
        console.log(storedCookies);
        trackingCode = uuidv4();
    }
    else{
        //no cookie found, create user
        console.log("no cookie found");
        trackingCode = uuidv4();
    }
    res.setHeader('Set-Cookie', 'natureHubTrackingTokenCode='+trackingCode+';expires='+new Date(new Date().getTime()+36000000000000).toUTCString());
    res.status(200).send("Still in dev")

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
