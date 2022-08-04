import * as React from 'react';
import {
  useHref,
  useLinkClickHandler,
  LinkProps as RouterLinkProps,
} from 'react-router-dom';
import {
  Link as MineralLink,
  LinkProps as MineralLinkProps,
} from '@mineral/core';

export type LinkProps = MineralLinkProps & RouterLinkProps;

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ onClick, replace = false, state, target, to, ...restProps }, ref) => {
    const href = useHref(to);
    const handleClick = useLinkClickHandler(to, { replace, state, target });

    return (
      <MineralLink
        {...restProps}
        href={href}
        target={target}
        onClick={(event: React.MouseEvent<HTMLAnchorElement>) => {
          onClick?.(event);
          if (!event.defaultPrevented) {
            handleClick(event);
          }
        }}
        ref={ref}
      />
    );
  }
);
