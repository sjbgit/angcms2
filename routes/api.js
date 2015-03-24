/**
 * Created by sbunke on 3/16/2015.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Page= require('../models/page.js');
var adminUser= require('../models/admin-users.js');
var bcrypt = require('bcrypt-nodejs');

/* User Routes. */

router.get('/', function(req, res) {
    res.send('Welcome to the API zone');
});

router.get('/pages', function(request, response) {

    return Page.find(function(err, pages) {
        if (!err) {
            return response.send(pages);
        } else {
            return response.send(500, err);
        }
    });
});

router.post('/pages/add', sessionCheck, function(request, response) {
    var page = new Page({
        title: request.body.title,
        url: request.body.url,
        content: request.body.content,
        menuIndex: request.body.menuIndex,
        date: new Date(Date.now())
    });

    page.save(function(err) {
        if (!err) {
            return response.send(200, page);

        } else {
            return response.send(500,err);
        }
    });
});

router.post('/pages/update', sessionCheck, function(request, response) {
    var id = request.body._id;

    Page.update({
        _id: id
    }, {
        $set: {
            title: request.body.title,
            url: request.body.url,
            content: request.body.content,
            menuIndex: request.body.menuIndex,
            date: new Date(Date.now())
        }
    }).exec();
    response.send("Page updated");
});

router.get('/pages/delete/:id', sessionCheck, function(request, response) {
    var id = request.params.id;
    Page.remove({
        _id: id
    }, function(err) {
        return console.log(err);
    });
    return response.send('Page id- ' + id + ' has been deleted');
});

router.get('/pages/admin-details/:id', sessionCheck, function(request, response) {
    var id = request.params.id;
    Page.findOne({
        _id: id
    }, function(err, page) {
        if (err)
            return console.log(err);
        return response.send(page);
    });
});

router.get('/pages/details/:url', function(request, response) {
    var url = request.params.url;
    Page.findOne({
        url: url
    }, function(err, page) {
        if (err)
            return console.log(err);
        return response.send(page);
    });
});


router.post('/add-user', function(request, response) {
    var salt, hash, password;
    password = request.body.password;
    salt = bcrypt.genSaltSync(10);
    hash = bcrypt.hashSync(password, salt);

    console.log('pass:' + password + 'username: ' + request.body.username);

    var AdminUser = new adminUser({
        username: request.body.username,
        password: hash
    });
    AdminUser.save(function(err) {
        if (!err) {
            return response.send('Admin User successfully created');

        } else {
            return response.send(err);
        }
    });
});

router.post('/login', function(request, response) {
    var username = request.body.username;
    var password = request.body.password;

    adminUser.findOne({
        username: username
    }, function(err, data) {
        if (err | data === null) {
            return response.send(401, "User Doesn't exist");
        } else {
            var usr = data;

            if (username == usr.username && bcrypt.compareSync(password, usr.password)) {

                request.session.regenerate(function() {
                    request.session.user = username;
                    return response.send(username);

                });
            } else {
                return response.send(401, "Bad Username or Password");
            }
        }
    });
});

router.get('/logout', function(request, response) {
    request.session.destroy(function() {
        return response.send(401, 'User logged out');

    });
});

function sessionCheck(request,response,next){

    if(request.session.user) next();
    else response.send(401,'authorization failed');
}


module.exports = router;