import styled from 'styled-components/native';

export default Card = styled.View(({width = '80%', height='30%', rounded = true, align = 'center', direction = 'column', justify="space-evenly"}) => `
  width: ${width};
  height: ${height};
  display: flex;
  flex-direction: ${direction};
  align-items: ${align};
  justify-content: ${justify};
  background: #FFFEFE;
  box-shadow: 0px 1px 2px rgba(58, 58, 68, 0.2);
  ${rounded && 'border-radius: 5px'};
`);
