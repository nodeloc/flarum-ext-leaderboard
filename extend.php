<?php

namespace Nodeloc\LeaderBoard;

use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Api\Serializer\UserSerializer;
use Flarum\Extend;
use Flarum\Post\Event\Posted;
use Flarum\Discussion\Event\Started;
use Flarum\Post\Event\Deleted as PostDeleted;
use Flarum\Discussion\Event\Deleted as DiscussionDeleted;
use Flarum\Api\Controller\ListUsersController;
use Flarum\User\Filter\UserFilterer;
use Illuminate\Database\Eloquent\Builder;
use Nodeloc\LeaderBoard\Listeners\DateChange;
use Xypp\LocalizeDate\Event\DateChangeEvent;

return [
    (new Extend\Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js'),

    (new Extend\Frontend('forum'))
        ->js(__DIR__ . '/js/dist/forum.js')
        ->css(__DIR__ . '/resources/less/forum.less')
        ->route('/leaderboard', 'nodeloc_leaderboard', Content\LeaderBoard::class),

    new Extend\Locales(__DIR__ . '/resources/locale'),

    (new Extend\ApiSerializer(ForumSerializer::class))
        ->attributes(PermissionBasedForumSettings::class),
    (new Extend\ApiSerializer(UserSerializer::class))
        ->attributes(AddMonthlyCountAttributes::class),
    (new Extend\Policy())
        ->globalPolicy(Access\UserPolicy::class),
    (new Extend\Event())
        ->listen(Posted::class, [Listeners\UpdateCount::class, 'postWasPosted'])
        ->listen(Started::class, [Listeners\UpdateCount::class, 'discussionWasStarted'])
        ->listen(PostDeleted::class, [Listeners\UpdateCount::class, 'postWasDeleted'])
        ->listen(DiscussionDeleted::class, [Listeners\UpdateCount::class, 'discussionWasDeleted'])
        ->listen(DateChangeEvent::class, DateChange::class),
    (new Extend\View())
        ->namespace('nodeloc.leaderboard', __DIR__ . '/resources/views'),
    (new Extend\ApiController(ListUsersController::class))
        ->addSortField('money')
        ->addSortField('lotteryCount')
        ->addSortField('bestAnswerCount')
        ->addSortField('lastCheckinMoney')
        ->addSortField('monthlyDiscussionCount')
        ->addSortField('monthlyCommentCount')
        ->addSortField('lastMonthlyDiscussionCount')
        ->addSortField('lastMonthlyCommentCount'),
    (new Extend\Settings())
        ->default('nodeloc-leaderboard.admin.settings.link', false)
        ->default('nodeloc-leaderboard.default-sort', 'default'),

    (new Extend\Middleware('api'))
        ->add(Middleware\BeforeMiddleware::class),
    (new Extend\Filter(UserFilterer::class))
        ->addFilterMutator(Filter\CheckDateFilter::class),
];
