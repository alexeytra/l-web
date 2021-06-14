import { Box, Button, Flex, Link } from '@chakra-ui/react';
import React from 'react';
import NextLink from 'next/link';
import { useMeQuery } from '../generated/graphql';

export const NavBar: React.FC<{}> = ({}) => {
  const [{ data, fetching }] = useMeQuery();
  let body = null;
  if (fetching) {
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link color="white">Войти</Link>
        </NextLink>
        <NextLink href="/register">
          <Link color="white" ml={2}>
            Зарегистрироваться
          </Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <Flex>
        <Box color="white">{data.me.username}</Box>
        <Button variant="link" ml={2}>Выйти</Button>
      </Flex>
    );
  }
  return (
    <Flex bg="tomato" p={4}>
      <Box ml={'auto'}>{body}</Box>
    </Flex>
  );
};
