import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from '../styles/Form';
import Error from '../ErrorMessage';

const CREATE_CLASS_MUTATION = gql`
  mutation CREATE_CLASS_MUTATION(
    $title: String!
    $description: String!
    $level: String!
  ) {
    createClass(
      title: $title
      description: $description
      level: $level
    ) {
      id
    }
  }
`;

class CreateClass extends Component {
    state = {
        title: '',
        description: '',
        levelsOptions: ['beginner', 'advance'],
        level: 'beginner',
    };
    handleChange = e => {
        const { name, type, value } = e.target;
        const val = type === 'number' ? parseFloat(value) : value;
        this.setState({ [name]: val });
    };


    render() {
        return (
            <Mutation mutation={CREATE_CLASS_MUTATION} variables={this.state}>
                {(CreateClass, { loading, error }) => (
                    <Form
                        onSubmit={async e => {
                            // Stop the form from submitting
                            e.preventDefault();
                            // call the mutation
                            const res = await CreateClass();
                            // change them to the single item page
                            console.log(res);
                            Router.push({
                                pathname: '/item',
                                query: { id: res.data.createClass.id },
                            });
                        }}
                    >
                        <Error error={error} />
                        <fieldset disabled={loading} aria-busy={loading}>
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

                            <label htmlFor="price">
                                Class Level
                                <select
                                    id="level"
                                    name="level"
                                    placeholder="level"
                                    required
                                    value={this.state.level}
                                    onChange={this.handleChange}
                                >
                                    {this.state.levelsOptions.map((level, i) => (
                                        <option key={i} value={level}>{level}</option>
                                    ))}
                                </select>
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

export default CreateClass;
export { CREATE_CLASS_MUTATION };