import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Title from './styles/Title';
import ItemStyles from './styles/ItemStyles';
// import DeleteItem from './DeleteItem';
// import AddToCart from './AddToCart';

export default class ClassItem extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  };

  render() {
    const { item } = this.props;
    return (
      <ItemStyles>
        <Title>
          <Link
            href={{
              pathname: '/admin/class',
              query: { class_id: item.id },
            }}
          >
            <a>{item.title}</a>
          </Link>
        </Title>
        <p>{item.description}</p>
        <p>{item.level}</p>
    
        <div className="buttonList">
          <Link
            href={{
              pathname: 'update',
              query: { id: item.id },
            }}
          >
            <a>Edit ✏️</a>
            
          </Link>
          <Link
          >
            <a>Delete ✏️</a>
            
          </Link>
        </div>
      </ItemStyles>
    );
  }
}