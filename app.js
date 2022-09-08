const express = require('express');
const app = express();
const ws = require('ws');

const server = require("http").createServer(app);

// let socketpath = ('/sockets/' + socketid + '/')
const wss = new ws.Server({port: 5000});

const port = process.env.PORT || 3000;

wss.on('connection',(socket)=>{
    console.log("new client connected");
    socket.onmessage = function(message)
    {
        wss.clients.forEach(client =>{
            if(client != socket)
            {
                client.send(message.data);
            }
        })
    }
})


app.set('view engine','ejs');


app.get("/user",(req,res)=>{
    res.render("client.ejs");
});
app.get("/",(req,res)=>{
    res.render("start.ejs");
});

app.get("/admin",(req,res)=>{
    res.render("admin.ejs");
});

server.listen(port, (error)=>{
    if(error)
    console.log(error);
    else 
    console.log("server is running on http://localhost:3000/")
});