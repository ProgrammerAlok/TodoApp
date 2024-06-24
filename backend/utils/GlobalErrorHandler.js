export const errorHandlerDev = (err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        status: err.status,
        err: err,
        message: err.message,
        stack: err.stack,
    });
};

export const errorHandlerProd = (err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        status: err.statusCode,
        message: err.message
    });
};