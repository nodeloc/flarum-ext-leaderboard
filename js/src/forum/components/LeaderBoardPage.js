import app from 'flarum/forum/app';
import Page from 'flarum/common/components/Page';
import ItemList from 'flarum/common/utils/ItemList';
import listItems from 'flarum/common/helpers/listItems';
import IndexPage from 'flarum/forum/components/IndexPage';
import Select from 'flarum/common/components/Select';
import Button from 'flarum/common/components/Button';
import LinkButton from 'flarum/common/components/LinkButton';
import SelectDropdown from 'flarum/common/components/SelectDropdown';
import Dropdown from 'flarum/common/components/Dropdown';
import extractText from 'flarum/common/utils/extractText';
import LeaderBoardList from './LeaderBoardList';
import LeaderBoardState from '../states/LeaderBoardState';
import CheckableButton from './CheckableButton';
import SearchField from './SearchField';
import Separator from 'flarum/common/components/Separator';

/**
 * This page re-uses Flarum's IndexPage CSS classes
 */
export default class LeaderBoardPage extends Page {
  oninit(vnode) {
    super.oninit(vnode);

    this.state = new LeaderBoardState({});
    this.state.refreshParams(app.search.params());

    this.bodyClass = 'User--directory';

    let idSegments = [];
    if (this.params().q) {
      Array.from(this.params().q.matchAll(/group:([\d,]+)/g)).forEach((match) => {
        idSegments.push(match[1]);
      });
    }
    this.enabledGroupFilters = idSegments
      .join(',')
      .split(',')
      .filter((id) => id);

    this.enabledSpecialGroupFilters = [];
    if (app.initializers.has('flarum-suspend') && app.forum.attribute('hasSuspendPermission')) {
      // If there is a special group filter int the params, enable it here
      if (this.params()?.q?.includes('is:suspended')) {
        this.enabledSpecialGroupFilters['flarum-suspend'] = 'is:suspended';
      }
    }

    app.history.push('users', app.translator.trans('nodeloc-leaderboard.forum.header.back_to_user_directory_tooltip'));
  }

  oncreate(vnode) {
    super.oncreate(vnode);

    app.setTitle(extractText(app.translator.trans('nodeloc-leaderboard.forum.page.nav')));
  }

  view() {
    return (
      <div className="IndexPage">
        {IndexPage.prototype.hero()}
        <div className="container">
          <div className="sideNavContainer">
            <nav className="IndexPage-nav sideNav">
              <ul>{listItems(this.sidebarItems().toArray())}</ul>
            </nav>
            <div className="IndexPage-results sideNavOffset">
              <div className="IndexPage-toolbar">
                <ul className="IndexPage-toolbar-view">{listItems(this.viewItems().toArray())}</ul>
                <ul className="IndexPage-toolbar-action">{listItems(this.actionItems().toArray())}</ul>
              </div>
              <LeaderBoardList state={this.state} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  /**
   * Our own sidebar. Re-uses Index.sidebarItems as the base
   * Elements added here will only show up on the user directory page
   *
   * @return {ItemList}
   */
  sidebarItems() {
    const items = IndexPage.prototype.sidebarItems();

    items.setContent(
      'nav',
      SelectDropdown.component(
        {
          buttonClassName: 'Button',
          className: 'App-titleControl',
        },
        this.navItems().toArray()
      )
    );

    return items;
  }

  /**
   * Our own sidebar navigation. Re-uses Index.navItems as the base
   * Elements added here will only show up on the user directory page
   *
   * @return {ItemList}
   */
  navItems() {
    const items = IndexPage.prototype.navItems();
    const params = this.stickyParams();

    items.add(
      'nodeloc-leaderboard',
      LinkButton.component(
        {
          href: app.route('nodeloc_leaderboard', params),
          icon: 'far fa-address-book',
        },
        app.translator.trans('nodeloc-leaderboard.forum.page.nav')
      ),
      85
    );

    return items;
  }

  viewItems() {
    const items = new ItemList();
    const sortMap = this.state.sortMap();

    const sortOptions = {};
    for (const i in sortMap) {
      sortOptions[i] = app.translator.trans('nodeloc-leaderboard.lib.sort.' + i);
    }

    items.add(
      'sort',
      Select.component({
        options: sortOptions,
        value: this.state.getParams().sort || app.forum.attribute('leaderBoardDefaultSort'),
        onchange: this.changeParams.bind(this),
      }),
      100
    );

    return items;
  }

  actionItems() {
    const items = new ItemList();

    items.add(
      'refresh',
      Button.component({
        title: app.translator.trans('nodeloc-leaderboard.forum.page.refresh_tooltip'),
        icon: 'fas fa-sync',
        className: 'Button Button--icon',
        onclick: () => {
          this.state.refresh();
          if (app.session.user) {
            app.store.find('users', app.session.user.id());
            m.redraw();
          }
        },
      })
    );

    return items;
  }

  /**
   * Redirect to the index page using the given sort parameter.
   *
   * @param {String} sort
   */
  changeParams(sort) {
    const params = this.params();

    if (sort === app.forum.attribute('leaderBoardDefaultSort')) {
      delete params.sort;
    } else {
      params.sort = sort;
    }

    this.state.refreshParams(params);

    const routeParams = { ...params };
    delete routeParams.qBuilder;

    m.route.set(app.route('nodeloc_leaderboard', routeParams));
  }

  stickyParams() {
    return {
      sort: m.route.param('sort'),
      q: m.route.param('q'),
    };
  }

  params() {
    return this.stickyParams();
  }
}
