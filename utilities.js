const validators = {
  validateAlphaNumeric: (parameter) => {
    if (typeof parameter !== 'string' || parameter.replace('/^[A-Za-z0-9]+$/g', '') !== parameter) {
      throw {code: 400, message: "The exercise name should be alphanumeric."};
    }
  },

  validateFromValues: (parameter, values) => {
    if (!values.includes(parameter)) {
      throw {code:400, message: `The parameter should be one of the ${values.join(", ")}`};
    }
  },
};

function sendResponse(res, data) {
  res.status(200).json(data);
}

function sendError(res, error) {
  if (error.code === undefined || error.message === undefined) {
    console.log(error);
    error = {code: 500, message: "Internal error"};
  }
  res.status(error.code).json({message: error.message});
}

const dataExtractors = {

};

export {validators, dataExtractors, sendResponse, sendError}