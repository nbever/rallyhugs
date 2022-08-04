import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Page as MineralPage,
  PageProps as MineralPageProps,
} from '@mineral/core';

export interface PageProps extends Omit<MineralPageProps, 'title'> {
  title: string;
}

export const Page = ({
  title,
  ...restProps
}: PageProps): React.ReactElement => (
  <>
    <Helmet title={title} />
    <MineralPage title={title} {...restProps} />
  </>
);
