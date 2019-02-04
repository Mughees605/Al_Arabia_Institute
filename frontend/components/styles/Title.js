import styled from 'styled-components';

const Title = styled.h3`
  margin: 0 1rem;
  text-align: center;
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
  margin-top: 10px;
  a {
    background: ${props => props.theme.green};
    display: inline;
    line-height: 1.3;
    font-size: 2rem;
    text-align: center;
    color: white;
    padding: 0 1rem;
  }
`;

export default Title;
