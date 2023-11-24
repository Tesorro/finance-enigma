import React from 'react';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import AboutIcon from 'shared/assets/icons/about-20-20.svg';
import MainIcon from 'shared/assets/icons/main-20-20.svg';
import ArticleIcon from 'shared/assets/icons/articles-icon.svg';

export interface ISidebarItem {
  path: string;
  title: string;
  Icon: React.VFC<React.SVGProps<SVGSVGElement>>;
  authOnly?: boolean;
}

export const SidebarItemList: ISidebarItem[] = [
  {
    path: RoutePath.main,
    title: 'Главная',
    Icon: MainIcon,
  },
  {
    path: RoutePath.about,
    title: 'О нас',
    Icon: AboutIcon,
  },
  {
    path: RoutePath.profile,
    title: 'Профиль',
    Icon: AboutIcon,
    authOnly: true,
  },
  {
    path: RoutePath.articles,
    title: 'Статьи',
    Icon: ArticleIcon,
    authOnly: true,
  },
];
