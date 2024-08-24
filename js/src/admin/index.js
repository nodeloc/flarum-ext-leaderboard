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
      setting: 'nodeloc-leaderboard.use-small-cards',
      label: app.translator.trans('nodeloc-leaderboard.admin.settings.use-small-cards'),
      type: 'boolean',
    })
    .registerSetting({
      setting: 'nodeloc-leaderboard.disable-global-search-source',
      label: app.translator.trans('nodeloc-leaderboard.admin.settings.disable-global-search-source'),
      type: 'boolean',
    })
    .registerSetting({
      setting: 'nodeloc-leaderboard.link-group-mentions',
      label: app.translator.trans('nodeloc-leaderboard.admin.settings.link-group-mentions'),
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
        icon: 'far fa-address-book',
        label: app.translator.trans('nodeloc-leaderboard.admin.permissions.view_user_directory'),
        permission: 'nodeloc.leaderboard.view',
        allowGuest: true,
      },
      'view'
    );
});
