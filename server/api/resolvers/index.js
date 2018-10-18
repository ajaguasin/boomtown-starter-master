const { ApolloError } = require('apollo-server-express');

// @TODO: Uncomment these lines later when we add auth
// const jwt = require("jsonwebtoken")
// const authMutations = require("./auth")
// -------------------------------
const { UploadScalar, DateScalar } = require('../custom-types');

module.exports = app => {
  return {
    // Upload: UploadScalar,
    // Date: DateScalar,

    Query: {
      viewer() {
        /**
         * @TODO: Authentication - Server
         *
         *  If you're here, you have successfully completed the sign-up and login resolvers
         *  and have added the JWT from the HTTP cookie to your resolver's context.
         *
         *  The viewer is what we're calling the current user signed into your application.
         *  When the user signed in with their username and password, an JWT was created with
         *  the user's information cryptographically encoded inside.
         *
         *  To provide information about the user's session to the app, decode and return
         *  the token's stored user here. If there is no token, the user has signed out,
         *  in which case you'll return null
         */
        return null;
      },
      async user(parent, { id }, { pgResource }, info) {
        try {
          const user = await pgResource.getUserById(id);
          return user;
        } catch (e) {
          throw new ApolloError(e);
        }
      },
      async items(parent, { filter }, { pgResource }, info) {
        try {
          const item = await pgResource.getItems(filter);
          return item;
        } catch (e) {
          throw new ApolloError(e);
        }
      },
      async item(parent, { id }, { pgResource }) {
        const item = await pgResource.getItem(id);
        return item.rows[0];
      },
      async tags(parent, { id }, { pgResource }) {
        try {
          const tags = await pgResource.getTags();
          return tags;
        } catch (error) {
          throw new ApolloError(error);
        }
      }
    },

    User: {
      items(parent, _, { pgResource }) {
        try {
          const lentItemsfromID = pgResource.getItemsForUser(parent.id);
          return lentItemsfromID;
        } catch (error) {
          throw new ApolloError(error);
        }
      },
      borrowed(parent, _, { pgResource }) {
        try {
          const borrowedItemsfromID = pgResource.getBorrowedItemsForUser(
            parent.id
          );
          return borrowedItemsfromID;
        } catch (error) {
          throw new ApolloError(error);
        }
      }
    },

    Item: {
      async ownerid(parent, _, { pgResource }) {
        try {
          const user = await pgResource.getUserById(parent.ownerid);
          return user;
        } catch (error) {
          throw new ApolloError(error);
        }
      },
      async tags(parent, _, { pgResource }) {
        try {
          const tagsForItem = await pgResource.getTagsForItem(parent.id);
          return tagsForItem;
        } catch (error) {
          throw new ApolloError(error);
        }
      },
      async borrower(parent, _, { pgResource }) {
        try {
          const user = await pgResource.getUserById(parent.borrowerid);
          return user; //Returns borrower or null
        } catch (error) {
          throw new ApolloError(error);
        }
      }
      // async imageurl({ imageurl, imageid, mimetype, data }) {
      //   if (imageurl) return imageurl
      //   if (imageid) {
      //     return `data:${mimetype};base64, ${data}`
      //   }
      // }
      // -------------------------------
    },

    Mutation: {
      // @TODO: Uncomment this later when we add auth
      // ...authMutations(app),
      // -------------------------------

      async addItem(parent, args, context, info) {
        /**
         *  @TODO: Destructuring
         *
         *  The 'args' and 'context' parameters of this resolver can be destructured
         *  to make things more readable and avoid duplication.
         *
         *  When you're finished with this resolver, destructure all necessary
         *  parameters in all of your resolver functions.
         *
         *  Again, you may look at the user resolver for an example of what
         *  destructuring should look like.
         */

        image = await image;
        const user = await jwt.decode(context.token, app.get('JWT_SECRET'));
        const newItem = await context.pgResource.saveNewItem({
          item: args.item,
          image: args.image,
          user
        });
        return newItem;
      }
    }
  };
};
