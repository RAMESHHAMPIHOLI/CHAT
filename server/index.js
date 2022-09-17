const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

const mongoose = require('mongoose');
var userModel = require('./UserSchema');

mongoose.connect('mongodb+srv://Ramesh:RAMUALLI1434t@xyz.uffuvce.mongodb.net/?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true
});
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (error) => {
    console.log(error);
});


app.post('/signin', (req, res) => {
    const ult = req.body;
    let un = ult.uname;
    let em = ult.email;
    let ps = ult.pass;
    // console.log(fn);
    const newUser = new userModel({
        username: un,
        email: em,
        password: ps,
        passes: []
    })

    newUser.save(function (err) {
        if (err) return console.log(err)
        res.status(202);
        res.json({ success: 'success' });
        console.log(`suc`)
    })
})

app.post('/v', (req, res) => {
    const vlt = req.body;
    let vun = vlt.uname;
    let vps = `${vlt.pass}`;
    userModel.findOne({ username: vun }, (err, docs) => {
        console.log(docs)
        if (docs.password === vps) {
            res.sendStatus(200)
            console.log(`h`)
        } else {
            res.sendStatus(404)
            console.log(`w`)
        }
    })
})

app.post('/getdata', (req, res) => {
    const gtd = req.body;
    let gun = gtd.body.uname;
    let gps = `${gtd.body.pass}`;
    console.log(gtd);
    userModel.findOne({ username: gun }, (err, docs) => {
        res.status(200).send(docs)
        console.log(`data se`)
        // console.log(JSON.stringify(docs))
    }).catch(err => {
        console.log(err);
        res.status(404);
    })
})

app.post('/savep', (req, res) => {
    const spl = req.body;
    let sun = spl.uname;
    let spas = spl.pass;
    let ssc = spl.accn;
    let pasn = spl.passn;
    var upbody = { "accn" : ssc, "accp" : pasn } ;
    console.log(ssc);
    let u = userModel.findOneAndUpdate({ username: sun }, { $push: { 'passes': upbody } }).then((err, result) => {
                if (err) {
                    // res.send(err);
                    console.log(err)
                } else {
                    console.log(result);
                    // res.send(result);
                }
        })
    // u.passes.push({accn: ssc, passn: pasn});
    // u.save().then(function (err) {
    //     if (err) return console.log(err)
    //     res.status(202);
    //     res.json({ success: 'success' });
    //     console.log(`suc pas`)
    // })
})

app.listen(5000, () => {
    console.log('List')
})