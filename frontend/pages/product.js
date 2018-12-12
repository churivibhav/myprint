import gql from 'graphql-tag';
import { withRouter } from 'next/router';
import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import React, { Component } from 'react';
import { Button, Row, Col } from 'reactstrap';

class Product extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            data: { loading, error, product },
            router,
            context,
            isAuthenticated
        } = this.props;

        if (error) return "Error Loading Product";

        if (product) {
            return (
                <React.Fragment>
                    <h1>{product.name}</h1>
                    <Row>
                        <Col xs="9" style={{ padding: 0 }}>
                            <div style={{ display: "inline-block" }} className="h-100">
                                {product.description}
                            </div>
                        </Col>
                    </Row>
                </React.Fragment>
            );
        }

        return <h3>Loading...</h3>;
    }
}

const GET_PRODUCT_INFO = gql`
query($id: ID!) {
    product(id: $id) {
      _id
      name
      description
      images {
        url
      }
    }
  }
`;

export default compose(
    withRouter,
    graphql(GET_PRODUCT_INFO, {
        options: props => {
            variables: {
                id: props.router.query.id
            }
        },
        props: ({ data }) => ({ data })
    })
)(Product);