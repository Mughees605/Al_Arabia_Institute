import { createUploadLink } from 'apollo-upload-client';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

const uploadLink = createUploadLink({ uri: "http://localhost:4444" });

export const ApolloUploadClient = new ApolloClient({
    link: uploadLink,
    cache: new InMemoryCache()
});
