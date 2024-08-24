import app from 'flarum/forum/app';
import AbstractType from './AbstractType';

/* global m */

export default class TextFilter extends AbstractType {
  resourceType() {
    return 'nodeloc-leaderboard-text';
  }

  search(query) {
    if (!query) {
      this.suggestions = [];
      return;
    }

    this.suggestions = [
      app.store.createRecord('nodeloc-leaderboard-text', {
        attributes: {
          text: query,
        },
      }),
    ];
  }

  renderKind() {
    return app.translator.trans('nodeloc-leaderboard.forum.search.kinds.text');
  }

  renderLabel(resource) {
    return m('.LeaderBoardSearchLabel', resource.text());
  }

  applyFilter(params, resource) {
    params.q = params.q ? params.q + ' ' : '';
    params.q += resource.text();
  }

  initializeFromParams(params) {
    if (!params.q) {
      return Promise.resolve([]);
    }

    return Promise.resolve(
      params.q
        .split(' ')
        // Words with : are gambits and we will ignore them
        .filter((word) => word.indexOf(':') === -1)
        .map((word) =>
          app.store.createRecord('nodeloc-leaderboard-text', {
            attributes: {
              text: word,
            },
          })
        )
    );
  }
}
