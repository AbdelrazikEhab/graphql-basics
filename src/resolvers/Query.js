const Query = {
  users(parent, args, { db }, info) {
    if (!args.query) {
      return db.usersArr;
    } else {
      return db.usersArr.filter((user) => {
        user.name.toUpperCase().includes(args.query.toLowerCase());
      });
    }
  },
  posts(parent, args, { db }, info) {
    if (!args.query) {
      return db.postsArr;
    } else {
      return db.postsArr.filter((post) => {
        post.title.toUpperCase().includes(args.query.toLowerCase());
      });
    }
  },
  comments(parent, args, { db }, info) {
    return db.CommentsArr;
  },
  me() {
    return {
      id: "1as",
      age: 23,
      name: "Abdelrazik",
      employee: true,
      GPA: 2.9,
    };
  },
  post() {
    return {
      id: "1as",
      title: "palastine",
      body: "palastine is our land",
      publish: true,
    };
  },
};
export { Query as default };
