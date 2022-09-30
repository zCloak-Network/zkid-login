import styled from '@emotion/styled';
import React from 'react';

const Wrapper = styled.button({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  outline: 'none',
  background: 'transparent',
  color: '#fff',
  border: '1px solid #FFFFFF',
  borderRadius: 8,
  fontSize: '16px',
  lineHeight: 1,
  padding: 12,
  cursor: 'pointer'
});

export type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Button = React.memo(function Button(props: ButtonProps) {
  return <Wrapper {...props} />;
});

export default Button;
