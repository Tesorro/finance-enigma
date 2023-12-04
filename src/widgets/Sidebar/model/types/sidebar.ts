import React from 'react';

export interface ISidebarItem {
  path: string;
  title: string;
  Icon: React.VFC<React.SVGProps<SVGSVGElement>>;
  authOnly?: boolean;
}
