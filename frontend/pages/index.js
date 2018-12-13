import ProductList from '../components/ProductList/index';
import React, { Component } from 'react';
import { Alert, Button, Col, Input, InputGroup, InputGroupAddon, Row } from 'reactstrap';
import defaultPage from '../hocs/defaultPage';

class Index extends Component {
    constructor(props) {
        super(props);
        // this state will be passed to ProductsList
        this.state = {
            query: ""
        };
    }

    onChange(e) {
        this.setState({ query: e.target.value.toLowerCase() });
    }

    render() {
        return (
            <div className="container-fluid">
                <Row>
                    <Col>
                        <div className="search">
                            <InputGroup>
                                <InputGroupAddon addonType="append">
                                    Search
                                </InputGroupAddon>
                                <Input onChange={this.onChange.bind(this)}/>
                            </InputGroup>
                        </div>
                        <ProductList search={this.state.query} />
                    </Col>
                </Row>
                <style jsx>{`
                    .search {
                        margin: 20px;
                        width: 500px;
                    }
                `}</style>
            </div>
        );
    }
}

export default defaultPage(Index);