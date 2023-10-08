import { SerializedStyles } from '@emotion/react';
import React, { ReactNode } from 'react';

export interface ContainerType {
  children: ReactNode;
}

export interface StyleType {
  style: SerializedStyles;
}

export interface StyleContainerType {
  children: ReactNode;
  style?: SerializedStyles;
  onClick?: () => void;
}

export interface SectionType extends ContainerType {
  gap?: string;
}

export interface SearchBarType {
  large?: boolean;
}

export interface SortButtonType {
  type: 'recent' | 'popular' | 'global' | 'year' | 'pendingDoc' | 'defaultDoc';
  isSelect?: boolean;
  onClick?: () => void;
}

export interface SelectBoxType {
  type: 'popular' | 'global' | 'year';
}

export interface SortButtonListType {
  main?: boolean;
}

export interface ButtonBoxType extends ContainerType {
  type: 'default' | 'long' | 'verySmall' | 'square';
  submit?: boolean;
  onClick?: () => void;
}

export interface NavItemProps extends ContainerType {
  to: string;
}

export interface LoginInputType {
  type: 'user' | 'pw' | 'email';
  placeholder: string;
  check?: boolean;
  onClick?: () => void;
}

export interface LineType {
  bold?: boolean;
}

export interface TextButtonType {
  type: 'id' | 'pw' | 'login' | 'signUp';
  noLine?: boolean;
}

export interface SignUpLevelType {
  first?: boolean;
}

export interface CheckBoxType extends ContainerType {
  textColumn?: boolean;
  onClick?: () => void;
  check?: boolean;
}

export interface FindInfoType {
  cnt?: number;
  text?: string;
}

export interface MoreButtonType {
  to: string;
}

export interface InputBoxType {
  title?: boolean;
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
