const commentSchema = {
  articleId: { type: "string", isRequired: true },
  text: { type: "string", isRequired: true },
  date: { type: "string", isRequired: true },
  author: { type: "string", isRequired: true },
};

module.exports = commentSchema;
