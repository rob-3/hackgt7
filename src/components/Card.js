import styled from 'styled-components/native';

export default Card = styled.View(({width = '80%', height='30%'}) => `
  width: ${width};
  height: ${height};
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background: #FFFEFE;
  box-shadow: 0px 1px 2px rgba(58, 58, 68, 0.2);
  border-radius: 5px;
`);
