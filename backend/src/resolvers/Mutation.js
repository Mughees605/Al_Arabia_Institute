const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
};

module.exports = mutations;
