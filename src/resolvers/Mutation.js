import uuidv4 from "uuid/v4";

const Mutation = {
  createUser(parent, args, { db }, info) {
    const emailToken = db.usersArr.some(
      (user) => user.email === args.data.email
    );
    if (emailToken) {
      throw new Error("Email is token.");
    }

    const user = {
      id: uuidv4(),
      ...args.data,
    };

    db.usersArr.push(user);
    return user;
  },
  UpdateUser(parent, args, { db }, info) {
    const { id, data } = args;
    const user = db.usersArr.find((user) => user.id === id);
    if (!user) {
      throw new Error("User not exsisit");
    }
    if (typeof data.email === "string") {
      const emailToken = db.usersArr.some((user) => user.email === data.email);
      if (emailToken) {
        throw new Error("Email is token.");
      }
      user.email = data.email;
    }
    if (typeof data.name === "string") {
      user.name = data.name;
    }
    if (typeof data.age !== "undefined") {
      user.age = data.age;
    }
    return user;
  },

  deleteUser(parent, args, { db }, info) {
    const userIndex = db.usersArr.findIndex((user) => user.id === args.id);
    if (userIndex === -1) {
      throw new Error("user not found");
    }
    const deleteUser = db.usersArr.splice(userIndex, 1);
    db.postsArr.filter((post) => {
      const match = post.auther === args.id;

      if (match) {
        db.CommentsArr.filter((comment) => comment.post !== post.id);
      }
      return !match;
    });
    db.CommentsArr.filter((comment) => comment.auther !== args.id);
    return deleteUser[0];
  },
  createPost(parent, args, { db, pubSub }, info) {
    const userExsisit = db.usersArr.some(
      (user) => user.id === args.data.auther
    );
    if (!userExsisit) {
      throw new Error("User not Exsisit.");
    }
    const post = {
      id: uuidv4(),
      ...args.data,
    };
    db.postsArr.push(post);
    pubSub.publish("post", { post: { mutation: "CREATED", data: post } });
    return post;
  },

  UpdatePost(parent, args, { db, pubSub }, info) {
    const { id, data } = args;
    const post = db.postsArr.find((post) => post.id === id);
    const originalPost = { ...post };

    if (!post) {
      throw new Error("Post not exsisit");
    }

    if (typeof data.title === "string") {
      post.title = data.title;
    }
    if (typeof data.body === "string") {
      post.body = data.body;
    }
    if (typeof data.publish === "boolean") {
      post.publish = data.publish;
    }

    if (originalPost.publish && !post.publish) {
      pubSub.publish("post", {
        post: { mutation: "DELETED", data: originalPost },
      });
    } else if (!originalPost.publish && post.publish) {
      pubSub.publish("post", {
        post: { mutation: "CREATED", data: post },
      });
    } else if (post.publish) {
      pubSub.publish("post", {
        post: { mutation: "UPDATE", data: post },
      });
    }
    return post;
  },

  deletePost(parent, args, { db, pubSub }, info) {
    const postIndex = db.postsArr.findIndex((post) => post.id === args.id);
    if (postIndex === -1) {
      throw new Error("Post not found");
    }
    const [...post] = db.postsArr.splice(postIndex, 1);
    db.CommentsArr = db.CommentsArr.filter(
      (comment) => comment.post !== args.id
    );

    if (post.publish) {
      pubSub.publish("post", {
        post: { mutation: "DELETED", data: post },
      });
    }
    return post;
  },

  createComment(parent, args, { db, pubSub }, info) {
    const userExsisit = db.usersArr.some(
      (user) => user.id === args.data.auther
    );
    const postExsisit = db.postsArr.some(
      (post) => post.id === args.data.post && post.publish
    );

    if (!userExsisit && !postExsisit) {
      throw new Error("comment already Exsisit.");
    }
    const comment = {
      id: uuidv4(),
      ...args.data,
    };
    db.CommentsArr.push(comment);
    pubSub.publish(`comment ${args.data.post}`, {
      comment: {
        mutation: "CREATED",
        data: comment,
      },
    });
    return comment;
  },

  UpdateComment(parent, args, { db, pubSub }, info) {
    const { id, data } = args;
    const comment = db.CommentsArr.find((comment) => comment.id === id);
    if (!comment) {
      throw new Error("Comment not exsisit");
    }

    if (typeof data.text === "string") {
      comment.text = data.name;
    }
    pubSub.publish(`comment ${deletecomment.post}`, {
      comment: {
        mutation: "UPDATED",
        data: deletecomment,
      },
    });
    return comment;
  },

  deleteComment(parent, args, { db, pubSub }, info) {
    const commentIndex = db.CommentsArr.findIndex(
      (comment) => comment.id === args.id
    );
    if (commentIndex === -1) {
      throw new Error("comment not exsisit");
    }
    const [deletecomment] = db.CommentsArr.splice(commentIndex, 1);
    pubSub.publish(`comment ${deletecomment.post}`, {
      comment: {
        mutation: "DELETED",
        data: deletecomment,
      },
    });
    return deletecomment[0];
  },
};
export { Mutation as default };
