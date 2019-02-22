import Router from 'next/router';
import NProgress from 'nprogress';
import Nav from './Nav';
import { Navbar } from 'react-bootstrap';
Router.onRouteChangeStart = () => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};


const Header = () => (

  <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Navbar.Brand href="#home">Al Arabia Institute</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav />
    </Navbar.Collapse>
  </Navbar>
);

export default Header;