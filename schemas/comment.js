const commentSchema = {
  articleId: { type: "string", isRequired: true },
  text: { type: "string", isRequired: true },
  date: { type: "number", isRequired: true },
  author: { type: "string", isRequired: true },
};

module.exports = commentSchema;
