import { extend } from 'flarum/common/extend';
import app from 'flarum/forum/app';
import UsersSearchSource from 'flarum/common/components/UsersSearchSource';
import LinkButton from 'flarum/common/components/LinkButton';
import IndexPage from 'flarum/forum/components/IndexPage';
import CommentPost from 'flarum/forum/components/CommentPost';
import LeaderBoardPage from './components/LeaderBoardPage';
import LeaderBoardList from './components/LeaderBoardList';
import LeaderBoardListItem from './components/LeaderBoardListItem';
import LeaderBoardState from './states/LeaderBoardState';
import SortMap from '../common/utils/SortMap';
import CheckableButton from './components/CheckableButton';
import Text from './models/Text';

// Allow other extensions to extend the page
export { LeaderBoardPage, LeaderBoardList, LeaderBoardListItem, LeaderBoardState, SortMap, CheckableButton };

app.initializers.add('nodeloc-leaderboard', (app) => {
  app.routes.nodeloc_leaderboard = {
    path: '/leaderboard',
    component: LeaderBoardPage,
  };

  app.store.models['nodeloc-leaderboard-text'] = Text;

  extend(IndexPage.prototype, 'navItems', (items) => {
    if (app.forum.attribute('canSeeLeaderBoardLink')) {
      items.add(
        'nodeloc-leaderboard',
        LinkButton.component(
          {
            href: app.route('nodeloc_leaderboard'),
            icon: 'fas fa-sort-amount-up',
          },
          app.translator.trans('nodeloc-leaderboard.forum.page.nav')
        ),
        85
      );
    }
  });

});

export * from './components';
export * from './searchTypes';
