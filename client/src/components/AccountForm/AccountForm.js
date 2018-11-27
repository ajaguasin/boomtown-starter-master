import { Field, Form } from 'react-final-form';
import {
  LOGIN_MUTATION,
  SIGNUP_MUTATION,
  VIEWER_QUERY
} from '../../apollo/queries';
import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import styles from './styles';
import validate from './helpers/validation';
import { withStyles } from '@material-ui/core/styles';
import { PropTypes } from 'prop-types';

class AccountForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formToggle: true,
      usernameInput: ''
    };
  }

  render() {
    const { classes, loginMutation, signupMutation } = this.props;
    return (
      <Form
        onSubmit={values => {
          const input = {
            variables: { input: values }
          };
          this.state.formToggle
            ? loginMutation(input).catch(error => this.setState({ error }))
            : signupMutation(input).catch(error => this.setState({ error }));
        }}
        validate={validate.bind(this)}
        render={({ handleSubmit, pristine, invalid, values, form }) => (
          <form onSubmit={handleSubmit} className={classes.accountForm}>
            {!this.state.formToggle && (
              <FormControl fullWidth className={classes.formControl}>
                <InputLabel htmlFor="fullname">Username</InputLabel>
                <Field name="fullname">
                  {({ input, meta }) => (
                    <Input
                      id="fullname"
                      type="text"
                      inputProps={{
                        autoComplete: 'off'
                      }}
                      {...input}
                    />
                  )}
                </Field>
              </FormControl>
            )}
            <FormControl fullWidth className={classes.formControl}>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Field name="email">
                {({ input, meta }) => (
                  <Input
                    id="email"
                    type="text"
                    {...input}
                    inputProps={{
                      autoComplete: 'off'
                    }}
                  />
                )}
              </Field>
            </FormControl>
            <FormControl fullWidth className={classes.formControl}>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Field name="password">
                {({ input, meta }) => (
                  <Input
                    id="password"
                    type="password"
                    {...input}
                    inputProps={{
                      autoComplete: 'off'
                    }}
                  />
                )}
              </Field>
            </FormControl>
            <FormControl className={classes.formControl}>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <Button
                  type="submit"
                  className={classes.formButton}
                  variant="contained"
                  size="large"
                  color="secondary"
                  disabled={pristine || invalid}
                >
                  {this.state.formToggle ? 'Enter' : 'Create Account'}
                </Button>
                <Typography>
                  <button
                    className={classes.formToggle}
                    type="button"
                    onClick={() => {
                      form.reset();
                      this.setState({
                        formToggle: !this.state.formToggle
                      });
                    }}
                  >
                    {this.state.formToggle
                      ? 'Create an account.'
                      : 'Login to existing account.'}
                  </button>
                </Typography>
              </Grid>
            </FormControl>
            <Typography className={classes.errorMessage}>
              {/* @TODO: Display sign-up and login errors */}
            </Typography>
          </form>
        )}
      />
    );
  }
}

AccountForm.propTypes = {
  classes: PropTypes.shape({
    accountForm: PropTypes.string.isRequired,
    errorMessage: PropTypes.string.isRequired,
    formButton: PropTypes.string.isRequired,
    formControl: PropTypes.string.isRequired,
    formToggle: PropTypes.string.isRequired
  }),
  loginMutation: PropTypes.func.isRequired,
  signupMutation: PropTypes.func.isRequired
};

const refetchQueries = [
  {
    query: VIEWER_QUERY
  }
];
export default compose(
  graphql(SIGNUP_MUTATION, {
    options: {
      refetchQueries
    },
    name: 'signupMutation'
  }),
  graphql(LOGIN_MUTATION, {
    options: {
      refetchQueries
    },
    name: 'loginMutation'
  }),
  withStyles(styles)
)(AccountForm);
