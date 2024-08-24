import app from 'flarum/forum/app';
import Component from 'flarum/common/Component';
import Button from 'flarum/common/components/Button';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import Placeholder from 'flarum/common/components/Placeholder';
import LeaderBoardListItem from './LeaderBoardListItem';

export default class LeaderBoardList extends Component {
    view() {
        const { state } = this.attrs;
        const params = state.getParams();
        const useSmallCards = app.forum.attribute('leaderBoardSmallCards');
        let loading;
        if (state.isLoading()) {
            loading = LoadingIndicator.component();
        } else if (state.moreResults) {
            loading = Button.component(
                {
                    className: 'Button',
                    onclick: state.loadMore.bind(state),
                },
                app.translator.trans('nodeloc-leaderboard.forum.page.load_more_button')
            );
        }

        if (state.empty()) {
            const text = app.translator.trans('nodeloc-leaderboard.forum.page.empty_text');
            return <div className="DiscussionList">{Placeholder.component({ text })}</div>;
        }

        const podiumUsers = state.users.slice(0, 3);
        const remainingUsers = state.users.slice(3);
        // 交换前两名的位置
        if (podiumUsers.length >= 2) {
            [podiumUsers[0], podiumUsers[1]] = [podiumUsers[1], podiumUsers[0]];
        }
        return (
            <div
                className={
                    'LeaderBoardList' +
                    (state.isSearchResults() ? ' LeaderBoardList--searchResults' : '') +
                    (useSmallCards ? ' LeaderBoardList--small-cards' : '')
                }
            >
                <ul className="LeaderboardPodium">
                    {podiumUsers.map((user, index) => {
                        return(
                        <li key={user.id()} data-id={user.id()} className="LeaderboardPodium-item">
                            {LeaderBoardListItem.component({
                                user,
                                params,
                                useSmallCards,
                                position: index + 1,
                                isPodium: true,
                            })}
                        </li>
                        );
                    })}
                </ul>
                <ul className="LeaderboardItemList">
                    {remainingUsers.map((user, index) => {
                        return (<li key={user.id()} data-id={user.id()} className="LeaderboardItemList-item">
                            {LeaderBoardListItem.component({
                                user,
                                params,
                                useSmallCards,
                                position: index + 4,
                                isPodium: false,
                            })}
                        </li>);
                })}
                </ul>
                <div className="LeaderBoardList-loadMore">{loading}</div>
            </div>
        );
    }
}
