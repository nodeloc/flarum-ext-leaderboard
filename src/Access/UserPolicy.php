<?php

/*
 * This file is part of fof/user-directory.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Nodeloc\LeaderBoard\Access;

use Flarum\User\Access\AbstractPolicy;
use Flarum\User\User;

class UserPolicy extends AbstractPolicy
{
    public function seeUserList(User $actor)
    {
        return $actor->hasPermission('nodeloc.leaderboard.view') && $actor->hasPermission('searchUsers');
    }
}
