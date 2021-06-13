import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Box, Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import { useMutation } from 'urql';
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';

interface registerProps {}

const REGISTER_MUTATION = `
mutation Register($username: String!, $password: String!){
  register(options:{username: $username, password: $password}) {
    errors{
      field
      message
    }
    user{
      id
      username
    }
  }
}
`

const Register: React.FC<registerProps> = ({}) => {
  const [, register] = useMutation(REGISTER_MUTATION);
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={(values) => {
          console.log(values);
          return register(values)
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="username" placeholder="логин" label="Логин" />
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="пароль"
                label="Пароль"
                type="password"
              />
            </Box>
            <Button
              type="submit"
              backgroundColor="teal"
              color="white"
              mt={4}
              isLoading={isSubmitting}
            >
              Регистрация
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
