import * as React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import {
  Home as HomeIcon,
  Tag as TagIcon,
  User as CustomerIcon,
  MagnifyingGlass as SearchIcon,
  Plus as AddIcon,
} from '@mineral/icons';
import {
  Divider,
  SideNavMenu,
  SideNavMenuItem,
  SideNavMenuItemProps,
  NAV_ITEM_ACTIVE_CLASSNAME,
} from '@mineral/core';

const BaseNavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ className, ...restProps }, ref) => (
    <NavLink
      {...restProps}
      className={({ isActive }) =>
        [className, isActive ? NAV_ITEM_ACTIVE_CLASSNAME : null]
          .filter(Boolean)
          .join(' ')
      }
      ref={ref}
    />
  ),
);

const SideNavMenuLink: React.FC<
  SideNavMenuItemProps & Omit<NavLinkProps, 'children'>
> = (props) => <SideNavMenuItem component={BaseNavLink} {...props} />;

export const Navigation: React.FC = () => (
  <SideNavMenu>
    <SideNavMenuLink label="Home" to="/" icon={<HomeIcon />} />
    <SideNavMenuLink label="Add" to="/add" icon={<AddIcon />} />
    <SideNavMenuLink label="Search" to="/search" icon={<SearchIcon />} />
    <Divider />
    <SideNavMenuLink
      label="Customers"
      to="/customers"
      icon={<CustomerIcon />}
    />
    <SideNavMenuLink label="Tags" to="/tags" icon={<TagIcon />} />
  </SideNavMenu>
);
