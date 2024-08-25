<?php

namespace Nodeloc\LeaderBoard;

use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Extend;
use Flarum\Post\Event\Posted;
use Flarum\Discussion\Event\Started;
use Flarum\Api\Controller\ListUsersController;
use Illuminate\Database\Eloquent\Builder;

return [
    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js'),

    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/resources/less/forum.less')
        ->route('/leaderboard', 'nodeloc_leaderboard', Content\LeaderBoard::class),

    new Extend\Locales(__DIR__.'/resources/locale'),

    (new Extend\ApiSerializer(ForumSerializer::class))
        ->attributes(PermissionBasedForumSettings::class),

    (new Extend\Policy())
        ->globalPolicy(Access\UserPolicy::class),
    (new Extend\Event())
        ->listen(Posted::class, [Listeners\UpdateCount::class, 'postWasPosted'])
        ->listen(Started::class, [Listeners\UpdateCount::class, 'discussionWasStarted']),
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
        ->default('nodeloc-leaderboard.default-sort', 'default'),
];
