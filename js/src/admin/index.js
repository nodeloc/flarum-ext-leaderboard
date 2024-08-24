import app from 'flarum/admin/app';
import SortMap from '../common/utils/SortMap';

export { SortMap };

app.initializers.add('nodeloc-leaderboard', (app) => {
  const sortOptions = {
    '': app.translator.trans('nodeloc-leaderboard.lib.sort.not_specified'),
  };

  Object.keys(new SortMap().sortMap()).forEach((sort) => {
    sortOptions[sort] = app.translator.trans('nodeloc-leaderboard.lib.sort.' + sort);
  });

  app.extensionData
    .for('nodeloc-leaderboard')
    .registerSetting({
      setting: 'nodeloc-leaderboard-link',
      label: app.translator.trans('nodeloc-leaderboard.admin.settings.link'),
      type: 'boolean',
    })
      .registerSetting({
          setting: 'nodeloc-leaderboard.default-sort',
          label: app.translator.trans('nodeloc-leaderboard.admin.settings.default-sort'),
          options: sortOptions,
          type: 'select',
          default: '',
      })
    .registerPermission(
      {
        icon: 'fas fa-sort-amount-up',
        label: app.translator.trans('nodeloc-leaderboard.admin.permissions.view_leader_board'),
        permission: 'nodeloc.leaderboard.view',
        allowGuest: true,
      },
      'view'
    );
});
