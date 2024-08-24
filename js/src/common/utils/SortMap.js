/**
 * The sort options.
 * We use a class and not just a POJO/function because we want extensions to be able to extend it
 */
export default class SortMap {
  sortMap() {
    return {
      money       : '-money',
      lotteryCount     : '-lotteryCount',
      bestAnswerCount  : '-bestAnswerCount',
      lastCheckinMoney    : '-lastCheckinMoney',
      monthlyDiscussionCount       : 'monthlyDiscussionCount',
      monthlyCommentCount: 'monthlyCommentCount',
      discussionCount   : '-discussionCount',
      commentCount     : '-commentCount',
    };
  }
}
