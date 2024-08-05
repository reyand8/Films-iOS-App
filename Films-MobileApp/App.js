import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigation from "./navigation/AppNavigation";
import {ApolloClient, ApolloProvider, from, HttpLink, InMemoryCache} from "@apollo/client";



export default function App() {
  const httpLink = new HttpLink({uri: 'http://localhost:4000/graphql'});

  const client = new ApolloClient({
    link: from([httpLink]),
    cache: new InMemoryCache(),
    connectToDevTools: true,
  });

  return (
      <ApolloProvider client={client}>
        <AppNavigation/>
      </ApolloProvider>
  );
}