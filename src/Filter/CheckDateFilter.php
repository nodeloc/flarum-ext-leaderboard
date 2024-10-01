<?php

namespace Nodeloc\LeaderBoard\Filter;
use Flarum\Filter\FilterState;
use Flarum\Query\QueryCriteria;
use Xypp\LocalizeDate\Helper\CarbonZoneHelper;
use Illuminate\Database\Capsule\Manager as DB;

class CheckDateFilter
{
    protected CarbonZoneHelper $carbonZoneHelper;
    public function __construct(CarbonZoneHelper $carbonZoneHelper)
    {
        $this->carbonZoneHelper = $carbonZoneHelper;
    }
    public function __invoke(FilterState $filter, QueryCriteria $queryCriteria)
    {
        $sort = $_REQUEST['user-directory.sort'] ?? 'username';
        $tablePrefix = DB::getTablePrefix();

        if ($sort == '-lastCheckinMoney') {
            $filter->getQuery()->leftJoin('user_checkin_history', 'users.id', '=', 'user_checkin_history.user_id')
                ->where("checkin_time", "<=", $this->carbonZoneHelper->now()->utc())
                ->where("checkin_time", ">=", $this->carbonZoneHelper->now()->setTime(0, 0)->utc())
                ->whereNotNull("checkin_time");
        } else if ($sort == '-monthlyCommentCount') {
            $filter->getQuery()->selectRaw($tablePrefix . 'users.*, COALESCE(COUNT(' . $tablePrefix . 'posts.id), 0) as monthly_comment_count')
                ->leftJoin('posts', function ($join) use ($tablePrefix) {
                    $join->on('users.id', '=', 'posts.user_id')
                        ->whereBetween('posts.created_at', [
                            $this->carbonZoneHelper->now()->setDay(1)->setTime(0, 0)->utc(),
                            $this->carbonZoneHelper->now()->utc(),
                        ])
                        ->where('posts.number', '>', 1);
                })
                ->groupBy('users.id');
        } else if ($sort == '-monthlyDiscussionCount') {
            $filter->getQuery()->selectRaw($tablePrefix . 'users.*, COALESCE(COUNT(' . $tablePrefix . 'discussions.id), 0) as monthly_discussion_count')
                ->leftJoin('discussions', function ($join) use ($tablePrefix) {
                    $join->on('users.id', '=', 'discussions.user_id')
                        ->whereBetween('discussions.created_at', [
                            $this->carbonZoneHelper->now()->setDay(1)->setTime(0, 0)->utc(),
                            $this->carbonZoneHelper->now()->utc(),
                        ]);
                })
                ->groupBy('users.id');
        } else if ($sort == '-lastMonthlyCommentCount') {
            $filter->getQuery()->selectRaw($tablePrefix . 'users.*, COALESCE(COUNT(' . $tablePrefix . 'posts.id), 0) as last_monthly_comment_count')
                ->leftJoin('posts', function ($join) use ($tablePrefix) {
                    $join->on('users.id', '=', 'posts.user_id')
                        ->whereBetween('posts.created_at', [
                            $this->carbonZoneHelper->now()->subMonth()->setDay(1)->setTime(0, 0)->utc(),
                            $this->carbonZoneHelper->now()->subMonth()->lastOfMonth()->setTime(23, 59)->utc(),
                        ])
                        ->where('posts.number', '>', 1);
                })
                ->groupBy('users.id');
        } else if ($sort == '-lastMonthlyDiscussionCount') {
            $filter->getQuery()->selectRaw($tablePrefix . 'users.*, COALESCE(COUNT(' . $tablePrefix . 'discussions.id), 0) as last_monthly_discussion_count')
                ->leftJoin('discussions', function ($join) use ($tablePrefix) {
                    $join->on('users.id', '=', 'discussions.user_id')
                        ->whereBetween('discussions.created_at', [
                            $this->carbonZoneHelper->now()->subMonth()->setDay(1)->setTime(0, 0)->utc(),
                            $this->carbonZoneHelper->now()->subMonth()->lastOfMonth()->setTime(23, 59)->utc(),
                        ]);
                })
                ->groupBy('users.id');
        }
    }
}