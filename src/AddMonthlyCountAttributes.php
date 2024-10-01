<?php

namespace Nodeloc\LeaderBoard;

use Flarum\Api\Serializer\UserSerializer;
use Flarum\User\User;

class AddMonthlyCountAttributes
{
    public function __invoke(UserSerializer $serializer, User $user)
    {
        $attributes = [];
        $attributes['monthlyDiscussionCount'] = $user->monthly_discussion_count ?? 0;
        $attributes['monthlyCommentCount'] = $user->monthly_comment_count ?? 0;
        $attributes['lastMonthlyDiscussionCount'] = $user->last_monthly_discussion_count ?? 0;
        $attributes['lastMonthlyCommentCount'] = $user->last_monthly_comment_count ?? 0;
        return $attributes;
    }
}
