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
                                <a>Home</a>
                            </Link>
                            <Link href="/me">
                                <a>Account</a>
                            </Link>

                            { // if user have admin permission the do this
                                me.permissions.includes("ADMIN") && (
                                    <>
                                        <Link href="/admin/classes">
                                            <a>Classes</a>
                                        </Link>
                                        <Link href="/admin/createclass">
                                            <a>Create Class</a>
                                        </Link>
                                    </>
                                )
                            }
                            <Signout />
                        </>
                    )
                }
                {!me && (
                    <>
                        <Link href="/">
                            <a>Home</a>
                        </Link>
                    </>
                )}
            </NavStyles>

        )}
    </User>


);

export default Nav;