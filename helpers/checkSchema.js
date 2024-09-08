const { v4: uuidv4 } = require("uuid");

function checkSchema(data, schema) {
  const errors = [];
  for (let field in schema) {
    const isValid = data[field] || !schema[field]?.isRequired;
    let isTypeValid;
    if (schema[field]?.type === "array") {
      isTypeValid = Array.isArray(data[field]) || (data[field] === undefined && !schema[field]?.isRequired);
    } else {
      isTypeValid = typeof data[field] === schema[field]?.type;
    }
    if (!isValid) {
      errors.push(`${field} is not set`);
    } else if (!isTypeValid) {
      errors.push(`${field} should be ${schema[field]}, not ${typeof data[field]}`);
    }
  }

  if (!errors.length) {
    return [null, { id: uuidv4(), ...data }];
  }
  return [errors, null];
}

module.exports = checkSchema;
