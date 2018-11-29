const { ApolloError } = require('apollo-server-express');

const jwt = require('jsonwebtoken');
const authMutations = require('./auth');
// -------------------------------
const { UploadScalar, DateScalar } = require('../custom-types');

module.exports = app => {
  return {
    Query: {
      viewer(parent, args, context, info) {
        if (context.token) {
          return jwt.decode(context.token, app.get('JWT_SECRET'));
        }
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
        try {
          const item = await pgResource.getItem(id);
          return item.rows[0];
        } catch (e) {
          throw new ApolloError(e);
        }
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
      async owner(parent, _, { pgResource }) {
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
    },

    Mutation: {
      ...authMutations(app),

      async addItem(parent, args, context, info) {
        const user = await jwt.decode(context.token, app.get('JWT_SECRET'));

        const newItem = await context.pgResource.saveNewItem({
          item: args.item,
          user: user,
          tags: args.item.tags
        });
        return newItem;
      }
    }
  };
};
