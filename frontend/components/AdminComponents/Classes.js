import React from 'react';
import { Query } from 'react-apollo';
import ClassItem from './ClassItem';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Error from '../ErrorMessage';


const CLASSES_IN_I_AM_AS_MEMBER = gql`
query{
classesForAdmin {
    id
    title
    description
    level
    user{
        name
    }
  }
}
`
const Center = styled.div`
  text-align: center;
`;

const ClassList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`

class Classes extends React.Component {
    render() {
        return (
            <Center>
                <Query
                    query={CLASSES_IN_I_AM_AS_MEMBER}
                >
                    {({ data, loading, error }) => {
                        if (loading) return <p>Loading...</p>;
                        if (error) return <Error error={error}/>;

                        return (
                            <ClassList>{data.classesForAdmin.map((item, i) => <ClassItem item={item} key={item.id} />)}</ClassList>
                        )

                    }}
                </Query>
            </Center>
        )
    }
}

export default Classes;