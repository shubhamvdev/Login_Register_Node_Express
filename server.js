const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const db = require("./app/models");
const Role = db.role;

const dbConfig = require("./app/config/dbConfig")

const app = express();


// app.use("/",userRoute)

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/views'));
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
    cookieSession({
        name: "login-session",
        secret: "COOKIE_SECRET", // should use as secret environment variable
        httpOnly: true
    })
);

db.mongoose.set('strictQuery', false);
//DB connection
db.mongoose
    .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
        initial();
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });


function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "user"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'user' to roles collection");
            });

            new Role({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'admin' to roles collection");
            });
        }
    });
}

// Home Page
app.get("/", function (req, res) {
    res.render("home");
});

// Register Page
app.get("/register", function (req, res) {
    res.render("register");
});

// login Page
app.get("/login", function (req, res) {
    res.render("login");
});

const authRoute = require('./app/routes/authRoute')
const userRoute = require('./app/routes/userRoute')

app.use("/api", authRoute)
app.use("/api",userRoute)
// set port, listen for requests
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});