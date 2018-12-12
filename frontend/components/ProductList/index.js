import gql from 'graphql-tag';
import Link from 'next/link';
import { graphql } from 'react-apollo';
import { Button, Card, CardBody, CardColumns, CardImg, CardSubtitle } from 'reactstrap';
import { CardText, CardTitle, Col, Row } from 'reactstrap';

const ProductList = (
    { data: {loading, error, products}, search },
    req
) => {
    if (error) return "Error loading products";

    if(products && products.length) {
        const searchQuery = products.filter(query => 
            query.name.toLowerCase().includes(search)
            );
        if (searchQuery.length != 0) {
            return (
                <div>
                    <div className="h-100">
                    {searchQuery.map(res => (
                        <Card 
                            style={{ width: "30%", margin: "0 10px" }}
                            className="h-100"
                            key={res._id}
                        >
                            <CardImg 
                                top={true}
                                style={{ height: 250 }}
                                src={`http://localhost:1337${res.images[0].url}`}
                            />
                            <CardBody>
                                <CardTitle>{res.name}</CardTitle>
                                <CardText>{res.description}</CardText>
                            </CardBody>
                            <div className="card-footer">
                                <Link
                                    as={`/products/${res._id}`}
                                    href={`/products/id=${res._id}`}
                                >
                                    <a className="btn btn-primary">View</a>
                                </Link>
                            </div>
                        </Card>
                    ))}
                    </div>
                    <style jsx global>
                    {`
                        a { color: white; }
                        a:link { text-decoration: none; color: white; }
                        a:hover { color: white; }
                        .card-columns { column-count:3; }
                    `}
                    </style>
                </div>
            );
        } else {
            return <h3>No products found!</h3>;
        }
    }
    return <h3>Loading...</h3>
};

const query = gql`
    {
        products {
            _id
            name
            description
            images {
                url
            }
        }
    }
`;

ProductList.getInitialProps = ({ req }) => {
    return { stars: 0 };
  };

export default graphql(query, {
    props: ({ data }) => ({ data })
})(ProductList);