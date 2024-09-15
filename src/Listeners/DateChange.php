<?php

namespace Nodeloc\LeaderBoard\Listeners;
use Flarum\User\User;
use Xypp\LocalizeDate\Event\DateChangeEvent;

class DateChange
{
    public function __invoke(DateChangeEvent $event)
    {
        if ($event->date->day == 1)
            User::update([
                "monthly_comment_count" => 0,
                "monthly_discussion_count" => 0
            ]);
    }
}