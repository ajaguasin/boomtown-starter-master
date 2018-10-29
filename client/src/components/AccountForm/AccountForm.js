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

class AccountForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formToggle: true,
      usernameInput: '',

      emailInput: '',
      passwordInput: ''
    };
  }

  handleEmailInput = event => {
    this.setState({
      emailInput: event.target.value
    });
  };
  handlePasswordInput = event => {
    this.setState({
      passwordInput: event.target.value
    });
  };

  render() {
    const { classes, loginMutation, signupMutation } = this.props;

    return (
      <Form
        onSubmit={(e, form) => {
          console.log(form);
          console.log(e);

          const user = { variables: { user: form } };
          this.state.formToggle
            ? loginMutation(user).catch(error => this.setState({ error }))
            : signupMutation(user).catch(error => this.setState({ error }));
        }}
        validate={validate.bind(this)}
        render={({ handleSubmit, pristine, invalid }) => (
          <form
            onSubmit={(e, form) => {
              e.preventDefault();
              handleSubmit(form);
            }}
            className={classes.accountForm}
          >
            {!this.state.formToggle && (
              <FormControl fullWidth className={classes.formControl}>
                <InputLabel htmlFor="fullname">Username</InputLabel>
                <Field>
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
              <Field>
                {({ input, meta }) => (
                  <Input
                    id="email"
                    type="text"
                    {...input}
                    inputProps={{
                      autoComplete: 'off'
                    }}
                    value={this.state.emailInput}
                    onChange={event => this.handleEmailInput(event)}
                  />
                )}
              </Field>
            </FormControl>
            <FormControl fullWidth className={classes.formControl}>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Field>
                {({ input, meta }) => (
                  <Input
                    id="password"
                    type="password"
                    {...input}
                    inputProps={{
                      autoComplete: 'off'
                    }}
                    value={this.state.passwordInput}
                    onChange={event => this.handlePasswordInput(event)}
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
                  disabled={
                    false // @TODO: This prop should depend on pristine or valid state of form
                  }
                >
                  {this.state.formToggle ? 'Enter' : 'Create Account'}
                </Button>
                <Typography>
                  <button
                    className={classes.formToggle}
                    type="submit"
                    onClick={() => {
                      // @TODO: Reset the form on submit
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

// @TODO: Use compose to add the login and signup mutations to this components props.
// @TODO: Refetch the VIEWER_QUERY to reload the app and access authenticated routes.

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
