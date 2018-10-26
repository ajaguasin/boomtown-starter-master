import React, { Component } from 'react';
import { Form, Field, FormSpy } from 'react-final-form';
import {
  Button,
  TextField,
  withStyles,
  Checkbox,
  MenuItem,
  Input,
  InputLabel,
  Select,
  ListItemText
} from '@material-ui/core';
import styles from './styles';
import { connect } from 'react-redux';
import {
  updateNewItem,
  resetNewItem,
  resetNewItemImage
} from '../../redux/modules/ShareItemPreview';

class ShareItemForm extends Component {
  constructor(props) {
    super(props);

    this.fileInput = React.createRef();

    this.state = {
      fileSelected: '',
      done: false,
      selectedTags: []
    };
  }

  generateTagsText(tags, selected) {
    return tags
      .map(t => (selected.indexOf(t.id) > -1 ? t.title : false))
      .filter(e => e)
      .join(', ');
  }

  getBase64Url() {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = e => {
        resolve(
          `data:${this.state.fileSelected.type};base64, ${btoa(
            e.target.result
          )}`
        );
      };
      reader.readAsBinaryString(this.state.fileSelected);
    });
  }

  applyTags(tags) {
    return (
      tags &&
      tags
        .filter(t => this.state.selectedTags.indexOf(t.id) > -1)
        .map(t => ({ title: t.title, id: t.id }))
    );
  }

  resetFileInput() {
    this.props.resetNewItemImage();
    this.setState({ fileSelected: '' });
    this.fileInput.current.value = '';
  }

  dispatchUpdate(values, tags, updateNewItem) {
    if (!values.imageurl && this.state.fileSelected) {
      this.getBase64Url().then(imageurl => {
        updateNewItem({
          imageurl
        });
      });
    }
    updateNewItem({
      ...values,
      tags: this.applyTags(tags)
    });
  }

  handleSelectTag(event) {
    this.setState({ selectedTags: event.target.value });
  }

  handleSelectFile(event) {
    console.log(this.fileInput.current);
    this.setState({
      fileSelected: this.fileInput.current.files[0]
    });
  }

  // submitTheForm(e, form) {
  //   console.log(form);
  //   !form.invalid && form.reset();
  // }

  render() {
    const { classes, tags, updateNewItem } = this.props;
    return (
      <Form
        // validate={
        // values => this.validate(values)
        // }
        onSubmit={(e, form) => this.submitTheForm(e, form)}
        render={({ handleSubmit, invalid, pristine }) => (
          <form
          // onSubmit={e => handleSubmit(e)}
          >
            <FormSpy
              subscription={{ values: true }}
              component={({ values }) => {
                if (values) {
                  this.dispatchUpdate(values, tags.tags, updateNewItem);
                }
                return '';
              }}
            />
            <h1 className={classes.h1}>Share. Borrow. Prosper.</h1>
            <fieldset className={classes.fieldset}>
              <Field
                name="imageurl"
                render={({ input, meta }) => (
                  <React.Fragment>
                    {!this.state.fileSelected ? (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => this.fileInput.current.click()}
                        className={classes.button}
                        {...input}
                      >
                        Select an image
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => this.resetFileInput()}
                        className={classes.button}
                        {...input}
                      >
                        Reset image
                      </Button>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      ref={this.fileInput}
                      onChange={event => this.handleSelectFile(event)}
                      hidden
                    />
                  </React.Fragment>
                )}
              />

              <Field
                name="title"
                render={({ input, meta }) => (
                  <TextField
                    className={classes.textField}
                    id="itemNameInput"
                    type="text"
                    placeholder="Name your item"
                    inputProps={{ ...input }}
                  />
                )}
              />

              <Field
                name="description"
                render={({ input, meta }) => (
                  <TextField
                    className={classes.textField}
                    id="descriptionInput"
                    type="text"
                    placeholder="Describe your item"
                    inputProps={{ ...input }}
                  />
                )}
              />

              <Field name="tags">
                {({ input, meta }) => (
                  <React.Fragment>
                    <InputLabel
                      htmlFor="select-multiple-checkbox"
                      className={classes.label}
                    >
                      Tag
                    </InputLabel>
                    <Select
                      multiple
                      className={classes.textField}
                      renderValue={selectedTags => {
                        return this.generateTagsText(tags.tags, selectedTags);
                      }}
                      // label="Add some tags"
                      input={<Input id="select-multiple-checkbox" />}
                      value={this.state.selectedTags}
                      onChange={event => this.handleSelectTag(event)}
                      label="Add some tags"
                    >
                      {tags.tags.map((tag, index) => (
                        <MenuItem key={index} value={tag.id}>
                          <Checkbox
                            checked={
                              this.state.selectedTags.indexOf(tag.id) > -1
                            }
                          />
                          <ListItemText primary={tag.title} />
                        </MenuItem>
                      ))}
                    </Select>
                  </React.Fragment>
                )}
              </Field>

              <Button
                id="submit"
                type="submit"
                variant="outlined"
                disabled={pristine || invalid}
              >
                Share
              </Button>
            </fieldset>
          </form>
        )}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateNewItem(item) {
    dispatch(updateNewItem(item));
  },
  resetNewItem(item) {
    dispatch(resetNewItem());
  },
  resetNewItemImage() {
    dispatch(resetNewItemImage());
  }
});

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(ShareItemForm));
