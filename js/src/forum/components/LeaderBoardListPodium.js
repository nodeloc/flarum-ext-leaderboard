import Component from 'flarum/common/Component';
import UserCard from 'flarum/forum/components/UserCard';
import SmallUserCard from './SmallUserCard';
import LeaderBoardUserCard from './LeaderBoardUserCard';

export default class LeaderBoardListItem extends Component {
  view(vnode) {
    const { user, useSmallCards } = this.attrs;

    const attributes = {
      user,
      className: `UserCard--directory${useSmallCards ? ' UserCard--small' : ''}`,
      controlsButtonClassName: 'Button Button--icon Button--flat',
    };

    return <div className="LeaderboardListItem">{useSmallCards ? SmallUserCard.component(attributes) : LeaderBoardUserCard.component(attributes)}</div>;
  }
}
