import React, { useContext } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Button, Header } from 'semantic-ui-react';
import TextInput from '../form/TextInput';
import { RootStoreContext } from '../../app/stores/rootStore';
import { IUserFormValues } from '../../app/models/user';
import { FORM_ERROR } from 'final-form';
import { combineValidators, isRequired } from 'revalidate';
import ErrorMessage from '../misc/ErrorMessage';

const validate = combineValidators({
  email: isRequired('Email'),
  password: isRequired('Password'),
  username: isRequired('username'),
  displayName: isRequired('DisplayName')
});

const RegisterForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { register } = rootStore.userStore;

  return (
    <FinalForm
      onSubmit={(values: IUserFormValues) =>
        register(values).catch(error => ({
          [FORM_ERROR]: error
        }))
      }
      validate={validate}
      render={({
        handleSubmit,
        submitting,
        submitError,
        invalid,
        pristine,
        dirtySinceLastSubmit
      }) => (
        <Form onSubmit={handleSubmit} error>
          <Header
            as='h2'
            content='Sign up!'
            textAlign='center'
            color='purple'
          />
          <Field name='username' component={TextInput} placeholder='UserName' />
          <Field
            name='displayName'
            component={TextInput}
            placeholder='DisplayName'
          />
          <Field name='email' component={TextInput} placeholder='Email' />
          <Field
            name='password'
            component={TextInput}
            placeholder='Password'
            type='password'
          />
          {submitError && !dirtySinceLastSubmit && (
            <ErrorMessage error={submitError} />
          )}

          <Button
            disabled={(invalid && !dirtySinceLastSubmit) || pristine}
            loading={submitting}
            content='Login'
            positive
            fluid
          />
        </Form>
      )}
    />
  );
};

export default RegisterForm;
