const validators = {
  validateAlphaNumeric: (parameter) => {
    if (typeof parameter !== 'string' || !parameter.match(/^[\p{L}\p{N}]*$/u)) {
      throw {code: 400, message: "The exercise name should be alphanumeric."};
    }
  },

  validateFromValues: (parameter, values) => {
    if (!values.includes(parameter)) {
      throw {code:400, message: `The parameter should be one of the [${values.join(", ")}]`};
    }
  },

  validateUser: (user) => {
    return user.$type === 'user'
      && typeof user.id === 'number' && user.id > 0
      && typeof user.name === 'string' && user.name !== ""
      && Object.keys(user).length === 3;
  }
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

function userExtractor (data) {
  if (data === null || typeof data === undefined || typeof data !== 'object') {
    return [];
  }
  if (validators.validateUser(data)) {
    return [data];
  }
  const result = [];
  for (const key of Object.keys(data)) {
    result.push(...userExtractor(data[key]));
  }
  return result;
}

function getSortedUsers(users, sortField) {
  return users.sort((a, b) => (a[sortField] < b[sortField]? -1: 1));
}

function getUniqueUsers(sortedUsers) {
  const result = [];
  sortedUsers.forEach(user => {
    if(result.length === 0 || (result[result.length - 1].id !== user.id && result[result.length - 1].name !== user.name)) {
      result.push(user);
    }
  });
  return result;
}

export {validators, userExtractor, sendResponse, sendError, getSortedUsers, getUniqueUsers}