const articleSchema = { title: "string", text: "string", date: "number", author: "string", comments: "array" };
const commentSchema = { articleId: "number", text: "string", date: "number", author: "string" };

function createData(data, schema) {
  const errors = [];
  for (field in data) {
    const isValid = data[field];
    let isTypeValid;
    if (schema[field] === "array") {
      isTypeValid = Array.isArray(data[field]);
    } else {
      isTypeValid = typeof data[field] === schema[field];
    }
    if (!isValid) {
      errors.push(`${field} is not set.`);
    } else if (!isTypeValid) {
      errors.push(`${field} should be ${schema[field]}, not ${typeof data[field]}`);
    }
  }

  if (!errors.length) {
    console.log({ id: +new Date(), ...data });
  }
  console.log(errors);
}

const article = {
  title: "Big theory",
  text: "123",
  date: 120000,
  author: "Gogi",
  comments: [],
};

createData(article, articleSchema);
