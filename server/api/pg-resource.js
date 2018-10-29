const strs = require('stringstream');

function tagsQueryString(tags, itemid, result) {
  const length = tags.length;
  return length === 0
    ? `${result};`
    : tags.shift() &&
        tagsQueryString(
          tags,
          itemid,
          `${result}($${tags.length + 1}, ${itemid})${length === 1 ? '' : ','}`
        );
}

module.exports = postgres => {
  return {
    async createUser({ email, fullname, bio, password }) {
      const newUserInsert = {
        text:
          'INSERT INTO "public"."users"("email", "fullname", "bio", "password") VALUES($1, $2, $3, $4) RETURNING "id", "email", "fullname", "bio", "password";',
        values: [email, fullname, bio, password]
      };
      try {
        const user = await postgres.query(newUserInsert);
        return user.rows[0];
      } catch (e) {
        switch (true) {
          case /users_fullname_key/.test(e.message):
            throw 'An account with this username already exists.';
          case /users_email_key/.test(e.message):
            throw 'An account with this email already exists.';
          default:
            throw 'There was a problem creating your account.';
        }
      }
    },
    async getUserAndPasswordForVerification(email) {
      const findUserQuery = {
        text:
          'SELECT id, password, fullname ,email FROM users WHERE users.email = $1',
        values: [email]
      };
      try {
        const user = await postgres.query(findUserQuery);
        if (!user) throw 'User was not found.';
        return user.rows[0];
      } catch (e) {
        throw 'User was not found.';
      }
    },
    async getUserById(id) {
      const findUserQuery = {
        text: `SELECT users.id, users.fullname, users.email, users.bio FROM users WHERE users.id = $1;`,
        values: [id]
      };

      try {
        const user = await postgres.query(findUserQuery);
        if (!user) throw 'User was not found.';
        return user.rows[0]; //
      } catch (e) {
        throw 'User was not found.';
      }
      // -------------------------------
    },
    async getItems(idToOmit) {
      try {
        const items = await postgres.query({
          text: `SELECT * FROM items WHERE items.ownerid <> $1 AND items.borrowerid IS NULL`,
          values: idToOmit ? [idToOmit] : []
        });
        return items.rows;
      } catch (error) {
        throw 'Items not found';
      }
    },
    async getItem(id) {
      return postgres.query({
        text: `SELECT * FROM items WHERE items.id = $1 `,
        values: [id]
      });
    },
    async getItemsForUser(rootID) {
      try {
        const items = await postgres.query({
          text: `SELECT * FROM items WHERE items.ownerid = $1`,
          values: [rootID]
        });
        return items.rows;
      } catch (error) {
        throw 'Items for user cannot be found';
      }
    },
    async getBorrowedItemsForUser(rootID) {
      try {
        const items = await postgres.query({
          text: `SELECT * FROM items WHERE items.borrowerid = $1`,
          values: [rootID]
        });
        return items.rows;
      } catch (error) {
        throw 'Borrowed items cannot be found';
      }
    },
    async getTags() {
      try {
        const tags = await postgres.query('SELECT * from tags');
        if (!tags) throw 'No tags found';
        return tags.rows;
      } catch (error) {
        throw error;
      }
    },
    async getTagsForItem(rootID) {
      try {
        const tagsQuery = {
          text: `SELECT itemtags.tagid, tags.title, tags.id from itemtags INNER JOIN tags ON (itemtags.tagid = tags.id) where itemid = $1`, // @TODO: Advanced queries
          values: [rootID]
        };
        const tags = await postgres.query(tagsQuery);
        return tags.rows;
      } catch (error) {}
    },
    async saveNewItem({ item, image, user }) {
      return new Promise((resolve, reject) => {
        postgres.connect((err, client, done) => {
          try {
            client.query('BEGIN', async err => {
              const { title, description, tags } = item;

              const itemQuery = {
                text:
                  'INSERT INTO items(title, description, ownerid) VALUES($1, $2, $3) RETURNING *',
                values: [title, description, user.id]
              };

              const newItem = await client.query(itemQuery);
              console.log(newItem);

              const tagIds = tags.map(tag => parseInt(tag));

              const tagItemPair = tagsQueryString(
                tagIds,
                newItem.rows[0].id,
                ''
              );

              const tagRelationships = {
                text: `INSERT INTO itemtags (tagid, itemid) VALUES ${tagItemPair}`,
                values: [...tags]
              };

              await client.query(tagRelationships);

              client.query('COMMIT', err => {
                if (err) {
                  throw err;
                }
                done();
                resolve(newItem.rows[0]);
              });
            });
          } catch (e) {
            // Something went wrong
            client.query('ROLLBACK', err => {
              if (err) {
                throw err;
              }
              // release the client back to the pool
              done();
            });
            switch (true) {
              case /uploads_itemid_key/.test(e.message):
                throw 'This item already has an image.';
              default:
                throw e;
            }
          }
        });
      });
    }
  };
};
