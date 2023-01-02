var secrets = require('../config/secrets');
const User = require('../models/user');
const Song = require('../models/song')
const auth = require('../auth');

module.exports = function (router) {

    var homeRoute = router.route('/');

    homeRoute.get(function (req, res) {
        var connectionString = secrets.token;
        res.json({ message: 'My connection string is ' + connectionString});
    });

    // AUTH ENDPOINTS

    router.post('/signup', async (req, res) => {
        // already checks for duplicate/invalid login info
        await auth.signUp(req.body.username, req.body.password)
        .then(() => {
            User.create({name: req.body.name, email: req.body.username});
            res.status(201);
            res.send({message: "OK"});
        }).catch((err) => {
            console.log(err.message);
            res.status(500);
            res.send({message: "ERROR"});
        });
    });

    router.post('/login', async (req, res) => {
        await auth.logIn(req.body.username, req.body.password)
        .then(() => {
            console.log("Log in successful!");
            res.status(200);
            res.send({message: "OK"});
        }).catch((err) => {
            console.log(err.message);
            res.status(500);
            res.send({message: "ERROR"});
        });
    });

    router.post('/logout', async (req, res) => {
        await auth.logOut()
        .then(() => {
            console.log("Log out successful!");
            res.status(200);
            res.send({message: "OK"});
        }).catch((err) => {
            console.log(err.message);
            res.status(500);
            res.send({message: "ERROR"});
        });
    });

    router.get('/current-user', (req, res) => {
        var currentUser = auth.getCurrentUser();
        console.log(currentUser);
        res.status(200);
        res.send({message: "OK", data: JSON.stringify(currentUser)});
    });

    // DB ENDPOINTS

    router.get('/users', function (req, res) {
        User.find({}).then(user => {
            res.status(200).send({message: "OK", data: user});
        }).catch(err => {
            res.status(500).send({message: "Server error occurred.", data: []});
        });
    });

    router.get('/songs', function (req, res) {
        console.log(req.params);
        console.log("hello")
        Song.find({}).then(song => {
            res.status(200).send({message: "OK", data: song});
        }).catch(err => {
            res.status(500).send({message: "Server error occurred.", data: []});
        });
    });

    router.post('/users', function (req, res) {
        User.findOne({name: req.body.name}).then(user => {
            if (!user) {
                User.create(req.body).then(user => {
                    res.status(201).send({message: "OK", data: user});
                }).catch(err => {
                    res.status(500).send({message: "Server error occurred."});
                });
            } else {
                res.status(400).send({message: "Cannot enter duplicate name", data: []});
            }
        });
    });

    router.post('/songs', function (req, res) {
        Song.findOne({name: req.body.name}).then(song => {
            if (!song) {
                Song.create(req.body).then(song => {
                    res.status(201).send({message: "OK", data: song});
                }).catch(err => {
                    res.status(500).send({message: "Server error occurred."});
                });
            } else {
                res.status(400).send({message: "Cannot enter duplicate song", data: []});
            }
        });
    });

    var generateRoute = router.route('/generate');
    generateRoute.get(async function (req, res) {
        console.log(auth.getCurrentUser().email);
        try {
            // req.body.name
            let userInfo = await User.findOne({email: auth.getCurrentUser().email});
            // console.log(userInfo);
            // console.log(userInfo[0]);
            let userSongs = userInfo['favoriteSongs'];
            // console.log(userSongs);

            let ind = Math.floor(Math.random() * userSongs.length);
            let userSongId = userSongs[ind];
            // console.log(userSongId);

            let userSongInfo = await Song.findOne({_id: userSongId});
            // console.log(userSongInfo);
            let userListeners = userSongInfo['listeners'];
            // console.log("listeners", userListeners);
            
            let similarSongs = await Song.find({ $and: [
                {_id: { $nin: userSongs }},
                {"listeners": { $in: userListeners }},
                { $or: [ { "genre": { $ne: userSongInfo['genre']  } }, { "language": { $ne: userSongInfo['language']  } } ]}, 
                {_id: {$ne: userSongId}},
                
            ] }).limit(10);
            // console.log(similarSongs);
            if(similarSongs.length == 0) {
                res.status(200).send({message: "OK", data: []});
            } else {
                res.status(200).send({message: "OK", data: similarSongs});
            }

        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    });

    router.get('/songs/:id', function(req,res){
        console.log(req.params)
        Song.findOne({_id: req.params.id}).then(song => {
            if (!song) res.status(404).send({ message: "Not found Song with name " + req.params.id, data: [] });
            else res.status(200).send({message: "OK", data: song});
        }).catch(err => {
            res.status(500).send({message: "Server error occurred.", data: []});
        });
    });

    router.get('/users/:email', function(req,res){
        console.log(req.params)
        User.findOne({email: req.params.email}).then(user => {
            if (!user) res.status(404).send({ message: "Not found User with email " + req.params.email, data: [] });
            else res.status(200).send({message: "OK", data: user});
        }).catch(err => {
            res.status(500).send({message: "Server error occurred.", data: []});
        });
    });

    router.put('/users/:id',function(req,res){
        console.log(req.body);
        User.findOneAndUpdate({_id: req.params.id}, {$push: {favoriteSongs: req.body.song}}).then(user => {
            if (!user) res.status(404).send({ message: "Not found User with id " + req.params.id, data: [] });
            else User.findOne({_id: req.params.id}).then(function(user){
                res.status(200).send({message: "OK", data: user});
            });
        });
    });

    router.put('/songs/:id',function(req,res){
        console.log(req.body);
        Song.findOneAndUpdate({_id: req.params.id}, {$push: {listeners: req.body.listener}}).then(song => {
            if (!song) res.status(404).send({ message: "Not found Task with id " + req.params.id, data: [] });
            else Song.findOne({_id: req.params.id}).then(function(song){
                res.status(200).send({message: "OK", data: song});
            });
        });
    });

    router.get('/favorites', async function(req,res){
        try {
            var currentUser = await User.findOne({email: auth.getCurrentUser().email});
            console.log(currentUser);
            var favoriteSongs = await Song.find({_id: {$in: currentUser['favoriteSongs']}});
            console.log(favoriteSongs);
            res.status(200).send({message: "OK", data: favoriteSongs});
        } catch (err) {
            res.status(500).send({message: "Server error occurred.", data: []});
        }
    });

    return router;
}