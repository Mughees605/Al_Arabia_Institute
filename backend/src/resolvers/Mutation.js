const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { hasPermission } = require('./../utils');
const { processUpload } = require('./../modules/fileApi');

const mutations = {
    async signup(parent, args, ctx, info) {
        // lowercase their email
        args.email = args.email.toLowerCase();
        // hash their password
        const password = await bcrypt.hash(args.password, 10);
        // create the user in the database
        const user = await ctx.db.mutation.createUser(
          {
            data: {
              ...args,
              password,
              permissions: { set: ['USER'] },
            },
          },
          info
        );
        // create the JWT token for them
        const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
        // We set the jwt as a cookie on the response
        ctx.response.cookie('token', token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
        });
        // Finalllllly we return the user to the browser
        return user;
      },
      async signin(parent, args, ctx, info){
        const { email , password } = args;
        const user = await ctx.db.query.user({  where: { email } });
        if(!user){
         throw new Error(`No such user found for email ${email}`)
        }
        // check if their password is valid
        const valid = await bcrypt.compare(password, user.password);
        if(!valid){
           throw new Error('Invalid Password!');
        }
        // generate JWT token
        const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
        // set the cookie with the token
        ctx.response.cookie('token', token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 365
        })
        // return user
        return user;
      },
      signout(parent, args, ctx, info){
        ctx.response.clearCookie('token');
        return {
          message : "Good Bye!"
        }
      },
      async createClass(parent, args, ctx, info){
        //1. First check the user is authenticated or not
        if(!ctx.request.userId){
          throw new Error('You must be logged in to do that!');
        }
        //2. Then check if the user have permission to createClass or not
        const hasPermission = ctx.request.user.permissions.some(
          (permission) => ['ADMIN', 'CLASSCREATE'].includes(permission)
        )
        if(!hasPermission){
          throw new Error("You don't have permission to do that!")
        }
        //3. Create the class and add the creator in class members
        const createdClass = await ctx.db.mutation.createClass({
          data: {
            ...args,
            user: {
              connect: {
                id: ctx.request.userId
              }
            },
            members:{
              connect: [{id: ctx.request.userId}]
            }
          }
        })
        //4 return class
        return createdClass
      },
      async uploadFile(parent, { file }, ctx, info) {
        return await processUpload(file, ctx)
      }
};

module.exports = mutations;
