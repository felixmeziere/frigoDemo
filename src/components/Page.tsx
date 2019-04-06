/**
 *
 * @format
 */

import React, { ReactNode } from 'react';
import { StyleProp } from 'react-native';
import styled from 'styled-components/native';

interface Props {
  children: ReactNode;
  style: StyleProp<{}>;
}

const PageContainer = styled.View`
  margin-top: 40;
  flex: 1;
  padding-horizontal: 10;
`;

export default (props: Props) => (
  <PageContainer style={props.style}>{props.children}</PageContainer>
);
