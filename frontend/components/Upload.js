import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from './styles/Form';
import Error from './ErrorMessage';
import storage from './../lib/firebase';
import { CLASS_QUERY } from './Class';

const UPLOAD_RECORDING_MUTATION = gql`
  mutation UPLOAD_RECORDING_MUTATION(
    $title: String!
    $description: String!
    $file_link: String!
    $class_id: ID!
  ) {
    uploadRecording(
      title: $title
      description: $description
      file_link: $file_link
      class_id: $class_id
    ) {
      id
      title
      description
    }
  }
`;
// TODO WILL USE THIS UPLOAD MUTATION AFTER AWS ACCOUNT VERIFICATION//
// const UPLOAD_File = gql`
//   mutation uploadFile(
//     $file: Upload!
//     $class_id: ID!
//   ) {
//     uploadFile(
//       file: $file
//       class_id: $class_id
//     ) {
//       id
//     }
//   }
// `

class UploadRecording extends Component {
    state = {
        title: '',
        description: '',
        file_link: '',
        uploading: false
    };
    handleChange = e => {
        const { name, type, value } = e.target;
        const val = type === 'number' ? parseFloat(value) : value;
        this.setState({ [name]: val });
    };
    uploadFile = async (e) => {
        try {
            this.setState({ uploading: true, file_link: '' });

            const files = e.target.files;
            const file = files[0];
            // creating firebase storage reference
            const storageRef = storage.ref();
            // file path need to saved in firebase storage with class_id and file name
            const mainFile = storageRef.child(`${this.props.class_id}/${file.name}`);

            await mainFile.put(file)

            const url = await mainFile.getDownloadURL();

            this.setState({ uploading: false, file_link: url });
            alert(`File successfully uploaded \n ${url}`);

        } catch (error) {
            this.setState({ uploading: false });
            alert('error uploading files')
        }

    }
    render() {
        return (
            <Mutation
                mutation={UPLOAD_RECORDING_MUTATION}
                variables={{
                    title: this.state.title,
                    description: this.state.description,
                    file_link: this.state.file_link,
                    class_id: this.props.class_id
                }}
                refetchQueries={
                    [{
                        query: CLASS_QUERY,
                        variables: {
                            class_id: this.props.class_id
                        }
                    }]
                }
            >
                {(uploadRecording, { loading, error }) => (
                    <Form
                        onSubmit={async e => {
                            // Stop the form from submitting
                            e.preventDefault();
                            // call the mutation
                            await uploadRecording();
                            // change them to the single item page
                            Router.push({
                                pathname: '/admin/class',
                                query: { class_id: this.props.class_id },
                            });
                        }}
                    >
                        <Error error={error} />
                        <fieldset disabled={loading || this.state.uploading} aria-busy={loading || this.state.uploading}>

                            <label htmlFor="file">
                                File
                                 <input
                                    type="file"
                                    id="file"
                                    name="file"
                                    placeholder="Title"
                                    required
                                    onChange={(e) => this.uploadFile(e)}
                                />
                            </label>

                            <label htmlFor="title">
                                Title
                                  <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder="Title"
                                    required
                                    value={this.state.title}
                                    onChange={this.handleChange}
                                />
                            </label>

                            <label htmlFor="description">
                                Description
                             <textarea
                                    id="description"
                                    name="description"
                                    placeholder="Enter A Description"
                                    required
                                    value={this.state.description}
                                    onChange={this.handleChange}
                                />
                            </label>
                            <button type="submit">Submit</button>
                        </fieldset>
                    </Form>
                )}
            </Mutation>
        );
    }
}

export default UploadRecording;
export { UPLOAD_RECORDING_MUTATION };