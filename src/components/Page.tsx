/**
 *
 * @format
 */

import React, { ReactNode } from 'react';
import { StyleProp } from 'react-native';
import styled from 'styled-components/native';
import { DARK_PAGE_BACKGROUND } from 'services';

interface IProps {
  children: ReactNode;
  style: StyleProp<{}>;
}

const PageContainer = styled.View`
  padding-top: 20;
  flex: 1;
  padding-horizontal: 16;
  background-color: ${DARK_PAGE_BACKGROUND};
`;

export default (props: IProps) => (
  <PageContainer style={props.style}>{props.children}</PageContainer>
);
