const express = require("express");
const fs = require("fs");

const Movies = require("./movieDB");

const app = express.Router();

var ids = 0;

app.get('/show/:id', (req, res) => {
    let { id } = req.params;
    ids = id;

    res.sendFile(__dirname + '/index.html');
})

app.get('/player', function(req, res){
 
    Movies.findById(ids)
    .then(response => {

        const range = req.headers.range;                // The range of the video

        const string = JSON.stringify(response);
        const stringValue = JSON.parse(string);
        const path = stringValue['path'];               // Fetching the link from the mongoDB
        
        const videoSize = fs.statSync(path).size;       // Fetching the file size
        const chunkSize = 10**6;                            // 10 to the power of 6 == 1000000 (1MB)
        const start = Number(range.replace(/\D/g, ""));     // starting point of the video file
        const end = Math.min(start + chunkSize, videoSize - 1)  // Ending point of the video in a chunk
        const contentLength = end - start + 1;                  // total video length
        
        const headers = {                                       // creating an header identification of the transmission
            "Content-Range": `bytes ${start}-${end}/${videoSize}`, 
            "Accept-Ranges": "bytes", 
            "Content-Length": contentLength, 
            "Content-Type": "video/mp4"
        } 
        res.writeHead(206, headers) 
        const stream = fs.createReadStream(path, {      // streaming the file
            start, 
            end 
        }) 
        stream.pipe(res) 
    }) 
    .catch(err => {
        res.status(500).json({ error: err })
    })
})

module.exports = app;