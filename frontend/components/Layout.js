import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { unsetToken } from '../lib/auth';
import { Container, Nav, NavItem } from 'reactstrap';
import defaultPage from '../hocs/defaultPage';
import Cookie from 'js-cookie';

class Layout extends React.Component {
    constructor(props) { super(props); }

    static async getInitialProps({ req }) {
        let pageProps = {};
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }
        return { pageProps, isAuthenticated };
    }

    render() {
        const { isAuthenticated, children } = this.props;
        const title = "ABC Demo";
        return (
            <div>
                <Head>
                    <title>{ title }</title>
                    <meta
                        name="viewport"
                        content="initial-scale=1.0, width=device-width"
                    />
                    <link
                        rel="stylesheet"
                        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
                        integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
                        crossOrigin="anonymous"
                    />

                </Head>
                <header>
                    <Nav className="navbar navbar-dark bg-dark">
                        <NavItem>
                            <Link href="/">
                                <a className="navbar-brand">Home</a>
                            </Link>
                        </NavItem>
                        { isAuthenticated ? (
                            <React.Fragment>
                                <NavItem className="ml-auto">
                                    <span style={{ color: "white", marginRight: 30 }}>
                                        {this.props.loggedUser}
                                    </span>
                                </NavItem>
                                <NavItem className="ml-auto">
                                    <Link href="/">
                                        <a className="logout" onClick={unsetToken}>
                                        Logout
                                        </a>
                                    </Link>
                                </NavItem>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <NavItem className="ml-auto">
                                    <Link href="/signin">
                                        <a className="nav-link">Sign In</a>
                                    </Link>
                                </NavItem>
                                <NavItem>
                            <Link href="/signup">
                                <a className="nav-link">Sign Up</a>
                            </Link>
                        </NavItem>
                            </React.Fragment>                            
                        )}
                    </Nav>
                </header>
                <Container>{children}</Container>
            </div>
        );
    }
}

export default Layout;