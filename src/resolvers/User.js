const User = {
  posts(parent, args, { db }, info) {
    return db.postsArr.filter((post) => {
      return post.comments === parent.id;
    });
  },
  comments(parent, args, { db }, info) {
    return db.CommentsArr.filter((comment) => {
      return comment.auther === parent.comments;
    });
  },
};
export { User as default };
