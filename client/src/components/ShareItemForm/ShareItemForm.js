import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import {
  Button,
  TextField,
  withStyles,
  ListItemText,
  Checkbox,
  MenuItem
} from '@material-ui/core';
import styles from './styles';

class ShareItemForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [0]
    };
  }

  submitTheForm(e, form) {
    console.log(form);
    !form.invalid && form.reset();
  }
  validate(values) {
    // const errors = {};
    // if (!values.Input1 || values.Input1.length < 4) {
    //   errors.Input1 = true;
    // }
    // if (!values.Input2 || values.Input2.length < 4) {
    //   errors.Input2 = true;
    // }
    // return errors;
  }
  render() {
    const { classes, tags } = this.props;
    return (
      <Form
        validate={values => this.validate(values)}
        onSubmit={(e, form) => this.submitTheForm(e, form)}
        render={({ handleSubmit, invalid, pristine }) => (
          <form onSubmit={e => handleSubmit(e)}>
            <h1 className={classes.h1}>Share. Borrow. Prosper.</h1>
            <fieldset className={classes.fieldset}>
              <Field
                name="ImageField"
                render={({ input, meta }) => (
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                  >
                    Select an image
                  </Button>
                )}
              />

              <Field
                name="ItemNameField"
                render={({ input, meta }) => (
                  <TextField
                    className={classes.textField}
                    id="itemNameInput"
                    name="ItemName"
                    type="text"
                    placeholder="Name your item"
                    {...input}
                  />
                )}
              />

              <Field
                name="DescriptionField"
                render={({ input, meta }) => (
                  <TextField
                    className={classes.textField}
                    id="descriptionInput"
                    name="ItemDescription"
                    type="text"
                    placeholder="Describe your item"
                    {...input}
                  />
                )}
              />

              <Field
                name="TagField"
                render={({ input, meta }) => (
                  <TextField
                    select
                    className={classes.textField}
                    label="Add some tags"
                    value={tags.tags}
                    SelectProps={{
                      multiple: true
                    }}
                  >
                    {console.log(tags.tags)}
                    {tags.tags.map((tag, index) => (
                      <MenuItem key={index} value={tag.title}>
                        <Checkbox />
                        {tag.title}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />

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

export default withStyles(styles)(ShareItemForm);
