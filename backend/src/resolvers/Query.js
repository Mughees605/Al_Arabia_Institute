
const Query = {
    me(parent, args, ctx, info) {
        if (!ctx.request.userId) {
          return null;
        }
        return ctx.db.query.user({
          where: {
            id: ctx.request.userId
          }
        }, info)
      },
     async classesInIamAsMember(parent, args, ctx, info){
        //1 check if the user is loggedin or not
        if (!ctx.request.userId) {
          throw new Error("You must be logged in!")
        }
        //2 get all classes created by him and the classes in which he is as a member
        const classes = await ctx.db.query.classes({
          where : {
            members_some : {
              id_in : ctx.request.userId
            },
          },
        }, info);
        //3 return classes
        return classes
      },
};

module.exports = Query;
