import CustomError from "../utils/customError.js"

const devError = (res, error ) => {
    res.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message,
        stackTrace: error.stack,
        error: error
    })
    
}

// const duplicateValueError = (err) => {
//     const name = err.keyValue.name;
//     console.log(name);
//     return new CustomError("Email already used! Please try another one.", 400)
// }

const duplicateValueError = (err) => {
    let errorMessage = '';
    for (const key in err.keyValue) {
        errorMessage += `${key} already exists\n`;
    }
    return new CustomError(errorMessage.trim(), 400);
};

const validationErrorHandler = (err) => {
    const errors = Object.values(err.errors).map(val => val.message);
    const errorMsg = `${errors.join(". ")}`;
    
    return new CustomError(errorMsg, 400)
}

const invalidTokenError = (err) => {
    return new CustomError("Invalid Token. Please log in again!", 401)
}

const jwtTokenExpiredError = (err) => {
    return new CustomError("Token expired! Please log in again!", 401)
}


const castErrorHandler = (err) => {
    const msg = `Invalid value for ${err.path}: ${err.value}!`
    return new CustomError(msg, 400);
}

const prodError = (res, error) => {
    if(error.isOperational){
        res.status(error.statusCode).json({
            status: error.statusCode,
            message: error.message
        })
    }
    else {
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong! Please try again later.'
        })
    }
}

// global error controller
export default (error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';

    if(process.env.NODE_ENV === "development"){
        devError(res, error);
    }

    else if (process.env.NODE_ENV === "production"){

        if (error.name === 'MongoServerError') error = duplicateValueError(error);

        if(error.name === "ValidationError") error = validationErrorHandler(error);

        if(error.name === "JsonWebTokenError") error = invalidTokenError(error);

        if(error.name === "TokenExpiredError") error = jwtTokenExpiredError(error);

        if(error.name === "CastError") error = castErrorHandler(error)

        prodError(res, error);
    }

   
}