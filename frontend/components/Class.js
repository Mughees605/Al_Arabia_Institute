import React from 'react';
import Link from 'next/link';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import Table from './styles/Table';
import SickButton from './styles/SickButton';
import Error from './ErrorMessage';

const CLASS_QUERY = gql`
query CLASS_QUERY($class_id: ID!){
  class(where:{
      id: $class_id
  }) {
    title
    description
    recordings{
        title
        description
        file_link
        class{
            title
        }
    }
  }
}
`

const Center = styled.div`
  text-align: center;
`;

export default class Class extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            body: [{ name: "First", Class: "Al Arabia", download: 'link' }, { name: "Third", Class: "Al Arabia", download: 'link' }, { name: "Third", Class: "Al Arabia", download: 'link' }]
        }
    }


    render() {
        return (
            <Query
                query={CLASS_QUERY}
                variables={{
                    class_id: this.props.class_id
                }}
            >
                {({ loading, error, data }) => {

                    if (loading) return "Loading"
                    if (error) return "Error"
                    return (

                        <div>
                            <Error error={error} />
                            <div>
                                {/* added check which is not in tutorials code */}
                                <>
                                    <div style={{ display: "flex" }}>
                                        <h2 >Class {data.class.title} Recordings</h2>
                                        <div style={{ marginLeft: "auto", order: 2, marginTop: "25px" }}>
                                            <Link
                                                href={{
                                                    pathname: '/admin/upload',
                                                    query: { class_id: this.props.class_id },
                                                }}
                                            >
                                                <SickButton
                                                    type="button"
                                                >
                                                    Upload
                                                </SickButton>
                                            </Link>
                                        </div>
                                    </div>

                                    <Table>
                                        <thead>
                                            <tr>
                                                <th>Class</th>
                                                <th>Title</th>
                                                <th>Description</th>
                                                <th>Download</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                data.class.recordings && data.class.recordings.length ?
                                                    data.class.recordings.map((recording, i) => {
                                                        return (
                                                            <Recording
                                                                recording={recording}
                                                                key={i}
                                                            />
                                                        )
                                                    })
                                                    :
                                                    <tr>
                                                        <td colSpan="4">
                                                            <Center>
                                                                You dont have any recordings in this class
                                                            </Center>
                                                        </td>
                                                    </tr>
                                            }
                                        </tbody>
                                    </Table>
                                </>

                            </div>
                        </div>

                    )
                }}
            </Query>

        )
    }
}

class Recording extends React.Component {
    render() {
        const recording = this.props.recording
        return (
            <tr>
                <td>{recording.class.title}</td>
                <td>{recording.title}</td>
                <td>{recording.description}</td>
                <td>{recording.file_link}</td>
            </tr>
        )
    }
}

export { CLASS_QUERY };