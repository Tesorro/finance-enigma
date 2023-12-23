import { createSelector } from '@reduxjs/toolkit';

import { ISidebarItem } from '../types/sidebar';

import { getUserAuthData } from '@/entities/User';
import AboutIcon from '@/shared/assets/icons/about-20-20.svg';
import ArticleIcon from '@/shared/assets/icons/articles-icon.svg';
import MainIcon from '@/shared/assets/icons/main-20-20.svg';
import {
  getRouteAbout, getRouteArticles, getRouteMain, getRouteProfile,
} from '@/shared/const/router';

export const getSidebarItems = createSelector(
  getUserAuthData,
  (userData) => {
    const sidebarItemList: ISidebarItem[] = [
      {
        path: getRouteMain(),
        title: 'Главная',
        Icon: MainIcon,
      },
      {
        path: getRouteAbout(),
        title: 'О нас',
        Icon: AboutIcon,
      },
    ];
    if (userData) {
      sidebarItemList.push(
        {
          path: getRouteProfile(userData.id),
          title: 'Профиль',
          Icon: AboutIcon,
          authOnly: true,
        },
        {
          path: getRouteArticles(),
          title: 'Статьи',
          Icon: ArticleIcon,
          authOnly: true,
        },
      );
    }
    return sidebarItemList;
  },
);
