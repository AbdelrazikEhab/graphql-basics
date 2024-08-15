const Post = {
  auther(parent, args, { db }, info) {
    return db.usersArr.find((user) => {
      return user.id === parent.auther;
    });
  },
  comments(parent, args, { db }, info) {
    return db.CommentsArr.filter((comment) => {
      return comment.post === parent.id;
    });
  },
};
export { Post as default };
