const articleSchema = {
  title: { type: "string", isRequired: true },
  text: { type: "string", isRequired: true },
  date: { type: "number", isRequired: true },
  author: { type: "string", isRequired: true },
  comments: { type: "array", isRequired: false },
};

module.exports = articleSchema;
