import { SerializedStyles } from '@emotion/react';
import { ReactNode } from 'react';

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
  key: string;
  type: 'recent' | 'popular' | 'global' | 'year';
  isSelect: boolean;
  onClick: () => void;
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
