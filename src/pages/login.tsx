import { Box, Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';

const Login: React.FC<{}> = ({}) => {
  const [, login] = useLoginMutation();
  const router = useRouter();

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login({ options: values });
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
            router.push('/');
          }
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
              Войти
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Login;
