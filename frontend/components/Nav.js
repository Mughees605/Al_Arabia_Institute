import Router from 'next/router';
import { Nav, Form, Button, FormControl } from 'react-bootstrap';
import User from './User';
import Signout from './AdminComponents/Signout';

const route = (pathname) => {
    Router.push({
        pathname
    })
}


const NavItem = () => (
    <User>
        {({ data: { me } }) => (
            <>
                <Nav className="mr-auto">
                    {
                        /// USER IS LOGGED IN WITH ADMIN ACCOUNT////
                        me && (
                            <>
                                { // if user have admin permission the do this
                                    me.permissions.includes("ADMIN") && (
                                        <>
                                            <Nav.Link onClick={() => route("/admin/classes")}>
                                                Classes
                                            </Nav.Link>
                                            <Nav.Link onClick={() => route("/admin/createclass")}>
                                                Create Class
                                            </Nav.Link>
                                            <Nav.Link onClick={() => route("/admin/books")}>
                                                Books
                                            </Nav.Link>
                                            <Nav.Link onClick={() => route("/me")}>
                                                <a>Account</a>
                                            </Nav.Link>
                                        </>
                                    )
                                }
                            </>

                        )
                    }
                    {

                        /////// USER IS NOT LOGGED IN//////////
                        !me && (
                            <>
                                <Nav.Link onClick={() => route("/")}>
                                    Notes (coming soon)
                                 </Nav.Link>
                                <Nav.Link onClick={() => route("/classes")}>
                                    Arabic Grammar
                                 </Nav.Link>
                                {/* <Nav.Link onClick={() => route("/contact-us")}>
                                    Contact Us
                                </Nav.Link> */}
                            </>
                        )
                    }
                </Nav>

                {/* // SHOW ITEMS ON RIGHT */}
                <Nav>
                    {me && (
                        <>
                            <Signout />
                        </>
                    )}
                    {
                        !me && (
                            <Form inline>
                                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                                <Button variant="outline-light">Search</Button>
                            </Form>
                        )
                    }
                </Nav>
            </>
        )}
    </User>


);

export default NavItem;