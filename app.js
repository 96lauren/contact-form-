const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json())
app.set('vews',__dirname + '/views');
app.set('view engine','pug')

const mailer = require('express-mailer');

const auth ={
    user:'f8fe597a40af32',
    pass:'8b3f1103555066'
}
const options = {
    from:"laurensambu@gmail.com",
    host:"smtp.mailtrap.io",
    port:25,
    auth:auth,
    transportMethod:'SMTP'
    
}
mailer.extend(app,options);
app.use((req, res,next)=>{
    res.header("Access-Control-Allow-Origin",'*');
    res.header("Access-Control-Allow-Headers","Origin-X-Requested-with, Content-Type,Accept");
    next();
});

app.post('/contacts', (req, res) =>{
    
    const recipient= {
        to:" 196b0052b1-2f18c1@inbox.mailtrap.io",
        subject:req.body.subject,
        name:req.body.name,
        message:req.body.message
    }    


    app.mailer.send('email',recipient,(error => {
        console.log(error)
    }));

    res.send('Node Js Application ')
})

app.listen(port, () => console.log(`app >http://localhost:${port}!`))