/**
 *
 * @format
 */

import React, { ReactNode } from 'react';
import styled from 'styled-components/native';
import { StyleProp } from 'react-native';

interface Props {
  children: ReactNode;
  style: StyleProp<{}>;
}

const PageContainer = styled.View`
  margin-top: 40;
`;

export default (props: Props) => (
  <PageContainer style={props.style}>{props.children}</PageContainer>
);
