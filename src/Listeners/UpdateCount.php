<?php

namespace Nodeloc\LeaderBoard\Listeners;

use Illuminate\Support\Arr;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Contracts\Events\Dispatcher;
use Flarum\Locale\Translator;
use Flarum\User\User;
use Flarum\Post\Event\Posted;
use Flarum\Post\Event\Restored as PostRestored;
use Flarum\Post\Event\Hidden as PostHidden;
use Flarum\Post\Event\Deleted as PostDeleted;
use Flarum\Discussion\Event\Started;
use Flarum\Discussion\Event\Restored as DiscussionRestored;
use Flarum\Discussion\Event\Hidden as DiscussionHidden;
use Flarum\Discussion\Event\Deleted as DiscussionDeleted;
use Flarum\User\Event\Saving;
use Flarum\Likes\Event\PostWasLiked;
use Flarum\Likes\Event\PostWasUnliked;
use Flarum\Dislikes\Event\PostWasDisliked;
use Flarum\Dislikes\Event\PostWasUndisliked;
use AntoineFr\Money\Event\MoneyUpdated;
use Carbon\Carbon;
use Illuminate\Database\Capsule\Manager as Capsule;


class UpdateCount
{
    protected $settings;
    protected $events;

    protected $translator;


    public function __construct(SettingsRepositoryInterface $settings, Dispatcher $events, Translator $translator)
    {
        $this->settings = $settings;
        $this->events = $events;
        $this->translator = $translator;
    }


    public function postWasPosted(Posted $event)
    {
        if ($event->post['number'] > 1) {
            $user = $event->actor;
            $user ->increment('monthly_comment_count', 1);
            $user->save();
        }
    }
    public function postWasDeleted(PostDeleted $event)
    {
        if ($event->post['number'] > 1) {
            $user = $event->actor;
            $user ->decrement('monthly_comment_count', 1);
            $user->save();
        }
    }
    public function discussionWasStarted(Started $event)
    {
        $user = $event->actor;
        $user ->increment('monthly_discussion_count', 1);
        $user->save();
    }
    public function discussionWasDeleted(DiscussionDeleted $event)
    {
        $user = $event->actor;
        $user ->decrement('monthly_discussion_count', 1);
        $user->save();
    }
}
