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
  type: 'recent' | 'popular' | 'global' | 'year';
  select?: boolean;
}
