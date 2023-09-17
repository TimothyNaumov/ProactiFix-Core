import express from "express";
import bodyParser from "body-parser";

const host = 'localhost';
const port = process.env.PORT || "8000";

const app = express();

app.set("port", port)

app.use(function (req, res, next) {
    bodyParser.JSON  
});

app.use(bodyParser.urlencoded({ extended: true }));

// app.listen(port, function(err, data) {
//     if(err)
//         console.log(err);
//     else
//         console.log("connected")
// });

var db = getDatabase();

const ref = db.ref


app.get("/", (req, res) => {
    res.writeHead(200);
    res.end("ProactiFix");
});

app.get("/appliances", (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(appliances));
});

app.get("/proactive", (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(proactive));
});

app.get("/reactive", (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(reactive));
});

app.get("/work_orders", (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(work_orders));
});

app.listen(port, () => {
    console.log(`Server is running on http://${host}:${port}`);
});

