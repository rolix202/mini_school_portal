import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";


// Custom imports
import authRoute from "./routes/authRoute.js"
import staffRoute from "./routes/staffRoute.js"
import CustomError from "./utils/customError.js";
import globalErrorHandler from "./controllers/errorController.js"
import { protect } from "./controllers/authController.js";


const app = express()

app.use(morgan('dev'));
// app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json());
app.set('view engine', 'ejs')


app.use('/api/v1/auth', authRoute)
app.use('/api/v1/staff', protect, staffRoute)


// NOT FOUND ROUTE
app.all('*', (req, res, next) => {
    // res.status(404).json({
    //     status: 'fail',
    //     message: `The requested URL ${req.originalUrl} does not exist on the server..!`
    // })

    const err = new CustomError(`The requested URL ${req.originalUrl} does not exist on the server..!`, 404);
    next(err)
})

// global error handler for any error not properly handled
app.use(globalErrorHandler)


export default app;