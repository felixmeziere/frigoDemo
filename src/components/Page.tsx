/**
 *
 * @format
 */
import React, { ReactNode } from 'react';
import { StyleProp } from 'react-native';
import { DARK_PAGE_BACKGROUND } from 'services';
import styled from 'styled-components/native';

interface IProps {
  children: ReactNode;
  style?: StyleProp<{}>;
}

const PageContainer = styled.View`
  background-color: ${DARK_PAGE_BACKGROUND};
  flex: 1;
  padding-horizontal: 16;
  padding-top: 20;
`;

export default (props: IProps) => (
  <PageContainer style={props.style}>{props.children}</PageContainer>
);
