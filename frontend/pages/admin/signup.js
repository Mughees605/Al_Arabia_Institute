import Signup from './../../components/AdminComponents/Signup';
import Signin from './../../components/AdminComponents/Signin';
import RequestReset from './../../components/AdminComponents/RequestReset';
import styled from 'styled-components';

const Columns = styled.div`
display: grid;
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
grid-gap: 20px;
`

const SignupPage = props => (
  <Columns>
    <Signup />
    <Signin />
    <RequestReset />
  </Columns>
);

export default SignupPage;