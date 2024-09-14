<?php

namespace Nodeloc\LeaderBoard\Filter;
use Flarum\Filter\FilterState;
use Flarum\Query\QueryCriteria;
use Xypp\LocalizeDate\Helper\CarbonZoneHelper;

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

        if ($sort == '-lastCheckinMoney') {
            $filter->getQuery()->leftJoin('user_checkin_history', 'users.id', '=', 'user_checkin_history.user_id')
                ->where("checkin_time", "<=", $this->carbonZoneHelper->now()->utc())
                ->where("checkin_time", ">=", $this->carbonZoneHelper->now()->setTime(0, 0)->utc())
                ->whereNotNull("checkin_time");
        }
    }
}