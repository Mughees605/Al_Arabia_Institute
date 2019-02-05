import { Query } from 'react-apollo';
import { CURRENT_USER_QUERY } from './User';

const AdminGate = props => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data, loading }) => {
      if (loading) return <p>Loading...</p>;
      if (data.me && !data.me.permissions.includes("ADMIN")) {
        return (
          <div>
            <p>You Dont have Admin Priviliges</p>
          </div>
        );
      }
      return props.children;
    }}
  </Query>
);

export default AdminGate;