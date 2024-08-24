import ItemList from 'flarum/common/utils/ItemList';
import icon from 'flarum/common/helpers/icon';
import app from 'flarum/forum/app';
import Component from 'flarum/common/Component';
import avatar from "flarum/helpers/avatar";
import username from "flarum/helpers/username";

export default class LeaderBoardUserCard extends Component {
    /**
     * Allowing to add additonal items unique to the user directory.
     *
     * @return {ItemList<import('mithril').Children>}
     */
    view() {
        const user = this.attrs.user;
        const sort = this.attrs.params.sort;
        const userProfileLink = app.route.user(user);

        const points = user.attribute(sort) || '0';
        const position = this.attrs.position;

        let avatarWithFrame, usernameWithColor;
        if('ziiven-decoration-store' in flarum.extensions){
            const { components } = require('@ziiven-decoration-store');
            avatarWithFrame = components.avatarWithFrame;
            usernameWithColor = components.usernameWithColor;
        }
        // 根据 position 的值来设置类名
        let positionClass = '';
        let displayPosition = position;
        if (position === 1) {
            positionClass = 'second';
            displayPosition = 2;
        } else if (position === 2) {
            positionClass = 'first';
            displayPosition = 1;
        } else if (position === 3) {
            positionClass = 'third';
        }
        // 根据 sort 字段选择图标
        let iconClass = 'fa-solid fa-chart-simple';
        if (['money', 'lastCheckinMoney'].includes(sort)) {
            iconClass = 'fa-solid fa-bolt';
        } else if (sort === 'bestAnswerCount') {
            iconClass = 'fa-solid fa-check-double';
        } else if (['monthlyDiscussionCount', 'discussionCount'].includes(sort)) {
            iconClass = 'fa-solid fa-pencil';
        } else if (['monthlyCommentCount', 'commentCount'].includes(sort)) {
            iconClass = 'fa-regular fa-comment';
        } else if (['lotteryCount'].includes(sort)) {
            iconClass = 'fa-solid fa-gift';
        }
        return (
            <a href={userProfileLink}>
                {avatarWithFrame?avatarWithFrame(user):avatar(user)}
                <div className="LeaderboardListItem-username">
                    <div>
                        {usernameWithColor?usernameWithColor(user):username(user)}
                    </div>
                </div>
                <span
                    className="LeaderboardListItem-count"
                    title=""
                    aria-label={`${points} Points`}
                    data-original-title={`${points} Points`}
                >
                 {icon(iconClass)}
                 {points}
                </span>
                <span className={`LeaderboardListItem-position ${positionClass}`}>{displayPosition}</span>
            </a>
        );
    }
}
