import React from 'react';
import { Query } from 'react-apollo';
import { ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Router from "next/router";
import Error from './ErrorMessage';


const CLASSES_IN_I_AM_AS_MEMBER = gql`
query{
classes {
    id
    title
    description
    level
  }
}
`
const FlexWithSpaceBetween = styled.div`
  display: flex;
  justify-content: space-between
`;

const route = (pathname, query) => {
    Router.push({
        pathname,
        query
    })
}

class Classes extends React.Component {
    render() {
        return (

            <Query
                query={CLASSES_IN_I_AM_AS_MEMBER}
            >
                {({ data, loading, error }) => {
                    if (loading) return <p>Loading...</p>;
                    if (error) return <Error error={error} />;

                    return (
                        <ListGroup>{data.classes.map((item, i) => <ClassItem item={item} key={item.id} />)} </ListGroup>
                    )

                }}
            </Query>


        )
    }
}

export default Classes;


const ClassItem = ({ item }) => (
    <ListGroupItem>
        <FlexWithSpaceBetween>
            <p>{item.title}</p>
            <Button onClick={() => route("/class", { class_id: item.id })}>
                Go To Course
           </Button>
        </FlexWithSpaceBetween>
    </ListGroupItem>
)