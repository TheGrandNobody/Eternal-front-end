import React from 'react';
import styled from 'styled-components';


const SubLinkContainer = styled.li`
  &: hover {
    background: #e9ecef;
  } ;
`;

const DropDownContent = styled.ul`
  background: #c35c6c;
  border-radius: 5px;
  display: none;
  position: absolute;
  right: -50px;
`;
const DropDownBtn = styled.a`
  cursor: pointer;
`;

const DropDown = styled.li`
  position: relative;
  display: inline-block;
  &:hover ${DropDownContent} {
    display: flex;
    flex-direction: column;

  }
`;

function DropDownComponent({ optionsToMap, name = ''}) {
  return (
    <DropDown className='nav-item dropdown mx-4'>
      <DropDownBtn className={'nav-link dropdown-toggle'}>{name}</DropDownBtn>
      <DropDownContent className='dropdown-menu'>
        {optionsToMap.map((item, index) => (
          <SubLinkContainer key={index}>
            <a className='dropdown-item' href={item.link}>
              {' '}
              {item.title}
            </a>
          </SubLinkContainer>
        ))}

      </DropDownContent>
    </DropDown>
  );
}

export default DropDownComponent;
