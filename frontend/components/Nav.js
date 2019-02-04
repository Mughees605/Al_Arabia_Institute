import Link from 'next/link';
import NavStyles from './styles/NavStyles';
import User from './User';
import Signout from './Signout';

const Nav = () => (
    <User>
        {({ data: { me } }) => (
            <NavStyles>
                {
                    me && (
                        <>
                            <Link href="/">
                                <a>Classes</a>
                            </Link>
                            <Link href="/me">
                                <a>Account</a>
                            </Link>
                            <Link href="/createclass">
                                <a>Create Class</a>
                            </Link>
                            <Signout />
                        </>
                    )
                }
                {!me && (
                    <Link href="/signup">
                        <a>Sign In</a>
                    </Link>
                )}
            </NavStyles>

        )}
    </User>


);

export default Nav;