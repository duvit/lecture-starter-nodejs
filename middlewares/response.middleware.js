const responseMiddleware = (req, res, next) => {
  if (res.data) {
    res.status(200).json(res.data);
  } else if (res.error) {
    res.status(res.error.status || 400).json({
      error: true,
      message: res.error.message || 'An error occurred'
    });
  } else {
    res.status(500).json({
      error: true,
      message: 'Internal Server Error'
    });
  }

  next();
};

export { responseMiddleware };
