const styles = theme => ({
  profilePage: {
    minHeight: '100vh',
    background: '#212121',
    padding: '80px',
    flexGrow: '1',
    overflow: 'auto',
    fontFamily: 'Helvetica'
  },

  profileCard: {
    marginBottom: '48px'
  },

  borrowedItems: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '-12px'
  },

  borrowedItem: {
    height: '100%',
    padding: '12px',
    display: 'flex'
  },

  borrowedItemCard: {
    alignItems: 'stretch'
  }
});

export default styles;
