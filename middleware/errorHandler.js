const errorHandler = (err, req, res, next) => {
    // console.log(err.stack.cyan.underline);
    const error = { ...err };
  
    error.message = err.message;
  
    console.log(error.message);
  
    res.status(200).json({
      success: false,
      error,
    });
  };
  
  module.exports = errorHandler;

  