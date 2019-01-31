import Link from 'next/link';
import NavStyles from './styles/NavStyles';



const Nav = () => (
        <NavStyles>
            <Link href="/items">
                <a>Classes</a>
            </Link>
            <Link href="/me">
                <a>Account</a>
            </Link>
            <Link href="/me">
                <a>SignOut</a>
            </Link>
            <Link href="/signup">
                <a>Sign In</a>
            </Link>

        </NavStyles>

);

export default Nav;