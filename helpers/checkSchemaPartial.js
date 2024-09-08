function checkSchemaPartial(data, schema) {
  const errors = [];
  for (let field in data) {
    if (!schema[field]) {
      errors.push(`${field} doesn't exists`);
    } else {
      const isValidType = (schema[field]?.type === "array" && Array.isArray(data[field])) || schema[field]?.type === typeof data[field];
      if (!isValidType) {
        errors.push(`${field} wrong type, should be ${schema[field]?.type}`);
      }
    }
  }

  if (!errors.length) {
    return [null, { ...data }];
  }
  return [errors, null];
}

module.exports = checkSchemaPartial;
