const Subscription = {
  count: {
    subscribe(parnet, args, { pubSub }, info) {
      let count = 0;
      setInterval(() => {
        count++;
        pubSub.publish("count", { count });
      }, 1000);
      return pubSub.asyncIterator("count");
    },
  },

  comment: {
    subscribe(parnet, { postId }, { db, pubSub }, info) {
      const post = db.postsArr.find(
        (post) => post.id === postId && post.publish
      );
      if (!post) {
        throw new Error("Post not found");
      }
      return pubSub.asyncIterator(`comment ${postId}`);
    },
  },

  post: {
    subscribe(parnet, args, { db, pubSub }, info) {
      return pubSub.asyncIterator(`post`);
    },
  },
};

export { Subscription as default };
