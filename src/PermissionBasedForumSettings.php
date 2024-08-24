<?php

/*
 * This file is part of fof/user-directory.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Nodeloc\LeaderBoard;

use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Settings\SettingsRepositoryInterface;

class PermissionBasedForumSettings
{
    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;

    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }

    public function __invoke(ForumSerializer $serializer, $model, array $attributes): array
    {
        // The link is visible if the user can access the user directory AND the link was enabled in extension settings
        $attributes['canSeeLeaderBoardLink'] = $serializer->getActor()->can('seeUserList') && $this->settings->get('nodeloc-leaderboard-link');
        $attributes['leaderBoardDefaultSort'] = $this->settings->get('nodeloc-leaderboard.default-sort') ?: 'default';

        // Only serialize if the actor has permission
        if ($permission = $serializer->getActor()->hasPermission('user.suspend')) {
            $attributes['hasSuspendPermission'] = $permission;
        }

        return $attributes;
    }
}
