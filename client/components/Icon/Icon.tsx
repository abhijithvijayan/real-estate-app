/* eslint-disable react/jsx-props-no-spreading, @typescript-eslint/no-explicit-any */
import React from 'react';

import SettingsIcon from './Settings';
import SearchIcon from './Search';
import BurgerIcon from './Burger';
import InboxIcon from './Inbox';
import BellIcon from './Bell';

const icons = {
  bell: BellIcon,
  burger: BurgerIcon,
  inbox: InboxIcon,
  search: SearchIcon,
  settings: SettingsIcon,
};

export type Icons = keyof typeof icons;

type Props = {
  name: Icons;
  title?: string;
  stroke?: string;
  fill?: string;
  hoverFill?: string;
  hoverStroke?: string;
  strokeWidth?: string;
  className?: string;
  style?: any;
  onClick?: (e?: any) => void;
};

const Icon: React.FC<Props> = ({name, ...rest}) => {
  return <div {...rest}>{React.createElement(icons[name])}</div>;
};

export default Icon;
