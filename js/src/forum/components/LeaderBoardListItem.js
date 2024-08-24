import Component from 'flarum/common/Component';
import UserCard from 'flarum/forum/components/UserCard';
import SmallUserCard from './SmallUserCard';
import LeaderBoardUserCard from './LeaderBoardUserCard';

export default class LeaderBoardListItem extends Component {
  view(vnode) {
    const { user, useSmallCards, position,params } = this.attrs;

    const attributes = {
      user,
      position,
      params,
      className: `UserCard--directory${useSmallCards ? ' UserCard--small' : ''}`,
      controlsButtonClassName: 'Button Button--icon Button--flat',
    };

    return <div className="LeaderboardListItem">{position>3 ? SmallUserCard.component(attributes) : LeaderBoardUserCard.component(attributes)}</div>;
  }
}
