const Comment = {
  auther(parent, args, { db }, info) {
    return db.usersArr.find((user) => {
      return user.id === parent.auther;
    });
  },
  post(parent, args, { db }, info) {
    return db.postsArr.find((post) => {
      return post.id === parent.post;
    });
  },
};
export { Comment as default };
