//requiring all the necessary modules
const express = require('express') 
const bodyParser = require('body-parser')
const data = require("./data.json")

const app = express()

app.use(bodyParser.urlencoded({ extended: false}))

app.set('view engine', 'pug')

//using css files in public folder and also accesing images.
app.use(express.static('public'));
app.use('/images', express.static('images'));

//home route
app.get('/', (req, res) => {
    res.render('index', { projects: data.projects });
});

//about route
app.get('/about', (req, res) => {
    res.render('about', { projects: data.projects });
});

//individula projects route
app.get('/project/:id', (req, res) => {
    const id = req.params.id 
    res.render('project', { project: data.projects[id] });
});

//404 error route handler
app.use((req, res, next) => {
    const error = new Error("Oops! The page you’re looking for doesn’t exist."); // Create a new error object
    error.status = 404; // Set the status code to 404
    next(error); // Pass this error to the next middleware (Express’s error handler)
});

//common error route handler
app.use((error, req, res, next) => {
    if (error.status === 404) {
      // Render the 404 page for not found errors
      res.status(404).render("page-not-found", { message: error.message });
    } else {
      // Set status to 500 if it's a server error or no status is set
      res.status(error.status || 500).render("error", {
        message: "Something went wrong on the server",
        error: error.message,
      });
    }
  });

//listening the app on port 3000.
app.listen(3000, () => {
    console.log('server is running on port 3000.')
}) 