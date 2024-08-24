<?php

namespace Nodeloc\LeaderBoard;

use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Extend;
use Flarum\Api\Controller\ListUsersController;
use Illuminate\Database\Eloquent\Builder;

return [
    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js'),

    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/resources/less/forum.less')
        ->route('/users', 'nodeloc_leaderboard', Content\LeaderBoard::class),

    new Extend\Locales(__DIR__.'/resources/locale'),

    (new Extend\ApiSerializer(ForumSerializer::class))
        ->attributes(PermissionBasedForumSettings::class),

    (new Extend\Policy())
        ->globalPolicy(Access\UserPolicy::class),

    (new Extend\View())
        ->namespace('nodeloc.leaderboard', __DIR__.'/resources/views'),
    (new Extend\ApiController(ListUsersController::class))
        ->addSortField('money')
        ->addSortField('lotteryCount')
        ->addSortField('bestAnswerCount')
        ->addSortField('lastCheckinMoney')
        ->addSortField('monthlyDiscussionCount')
        ->addSortField('monthlyCommentCount'),
    (new Extend\Settings())
        ->default('nodeloc-leaderboard.admin.settings.link', false)
        ->default('nodeloc-leaderboard.use-small-cards', false)
        ->default('nodeloc-leaderboard.disable-global-search-source', false)
        ->default('nodeloc-leaderboard.default-sort', 'default')
        ->default('nodeloc-leaderboard.link-group-mentions', true)
        ->serializeToForum('leaderBoardSmallCards', 'nodeloc-leaderboard.use-small-cards', 'boolVal')
        ->serializeToForum('leaderBoardDisableGlobalSearchSource', 'nodeloc-leaderboard.disable-global-search-source', 'boolVal')
        ->serializeToForum('leaderBoardLinkGroupMentions', 'nodeloc-leaderboard.link-group-mentions', 'boolVal'),
];
