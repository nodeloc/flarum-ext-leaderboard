<?php

namespace Nodeloc\LeaderBoard;

use Flarum\Api\Serializer\UserSerializer;
use Flarum\User\User;

class AddMonthlyCountAttributes
{
    public function __invoke(UserSerializer $serializer, User $user)
    {
        $attributes = [];
        $attributes['monthlyDiscussionCount'] = $user->monthly_discussion_count ;
        $attributes['monthlyCommentCount'] = $user->monthly_comment_count ;
        return $attributes;
    }
}
