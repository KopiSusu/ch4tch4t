import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import config from '../src/config';
// import {mapUrl} from 'utils/url.js';
import PrettyError from 'pretty-error';
import http from 'http';
import SocketIo from 'socket.io';
import request from 'superagent';

const pretty = new PrettyError();
const app = express();

const server = new http.Server(app);

const io = new SocketIo(server);
io.path('/ws');

app.use(session({
  secret: 'react and redux rule!!!!',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}));
app.use(bodyParser.json());

// Spin up the server
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})

// for Facebook verification
app.get('/gateway/facebook', function (req, res) {
    if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
        res.send(req.query['hub.challenge'])
    }
    res.send('Error, wrong token')
})

// Process Messages
app.post('/gateway/facebook', function (req, res) {
    let messaging_events = req.body.entry[0].messaging
    for (let i = 0; i < messaging_events.length; i++) {
        let event = req.body.entry[0].messaging[i]
        let sender = event.sender.id
        if (event.message && event.message.text) {
            let text = event.message.text
            if (text === 'Generic') {
                sendGenericMessage(sender)
                continue
            }
            sendFacebookMessage(sender, "Text received from facebook gateway, echo: " + text.substring(0, 200))
        }
    }
    res.sendStatus(200)
})

// for Line verification
// Process Messages
app.post('/gateway/line', function (req, res) {
    let messaging_events = req.body.events
    for (let i = 0; i < messaging_events.length; i++) {
        let event = req.body.events[i]
        let sender = event.source.userId
        let replyToken =  event.replyToken
        if (event.message && event.message.text) {
            let text = event.message.text
            replyLineMessage(replyToken, "Text received from line gateway, echo: " + text.substring(0, 200))
            
        }
    }
    res.sendStatus(200)
})

// Reply Functions
function sendFacebookMessage(sender, text) {
    console.log('sender: ', sender)
    console.log('text: ', text)

    let messageData = { text:text }

    request
        .post(`https://graph.facebook.com/v2.6/me/messages?access_token=${token}`)
        .send({
            recipient: {id:sender},
            message: messageData,
        })
        .set('Accept', 'application/json')
        .end((err, res) => {
            if (err) {
                console.log('some error threw')
            } 
        })

}
function replyLineMessage(replyToken, text) {
  console.log('text: ', text)

  request
        .post('https://api.line.me/v2/bot/message/reply')
        .send({
            replyToken: replyToken,
            messages: [ 
              {
                "type":"text",
                "text":text
            }
          ]
        })
        .set('Authorization', `Bearer ${cT}`)
        .end((err, res) => {
            if (err) {
                console.log('err: ', err)
            } 
        })
}
