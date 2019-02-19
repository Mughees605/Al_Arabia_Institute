import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from './styles/Form';
import Error from './ErrorMessage';

const UPLOAD_RECORDING_MUTATION = gql`
  mutation UPLOAD_RECORDING_MUTATION(
    $title: String!
    $description: String!
    $file_link: String!
    $class_id: ID!
  ) {
    createRecording(
      title: $title
      description: $description
      file_link: $file_link
      class_id: $class_id
    ) {
      id
    }
  }
`;

class UploadRecording extends Component {
    state = {
        title: '',
        description: '',
        file_link: ''
    };
    handleChange = e => {
        const { name, type, value } = e.target;
        const val = type === 'number' ? parseFloat(value) : value;
        this.setState({ [name]: val });
    };
    uploadFile = async e => {
        console.log('Upload file')
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'sickfits');

        const res = await fetch('https://api.cloudinary.com/v1_1/dwra2lvow/image/upload',
            {
                method: 'POST',
                body: data
            });

        const file = await res.json();
        console.log(file);
        this.setState({
            image: file.secure_url,
            largeImage: file.eager[0].secure_url
        })
    }
    render() {
        return (
            <Mutation mutation={UPLOAD_RECORDING_MUTATION} variables={this.state}>
                {(createItem, { loading, error }) => (
                    <Form
                        onSubmit={async e => {
                            // Stop the form from submitting
                            e.preventDefault();
                            // call the mutation
                            const res = await createItem();
                            // change them to the single item page
                            console.log(res);
                            Router.push({
                                pathname: '/item',
                                query: { id: res.data.createItem.id },
                            });
                        }}
                    >
                        <Error error={error} />
                        <fieldset disabled={loading} aria-busy={loading}>
                            <label htmlFor="file">
                                File
                                  <input
                                    type="file"
                                    id="file"
                                    name="file"
                                    placeholder="Title"
                                    required
                                    onChange={this.uploadFile}
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