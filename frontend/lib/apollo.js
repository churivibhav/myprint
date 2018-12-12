import { HttpLink } from 'apollo-link-http';
import { withData } from 'next-apollo';

const config = {
    link: new HttpLink({
        uri: "http://localhost:1337/graphql",   // must be absolute path
    })
};

export default withData(config);