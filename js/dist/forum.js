(()=>{var t={313:t=>{"use strict";t.exports=flarum.extensions["ziiven-decoration-store"]}},e={};function o(r){var a=e[r];if(void 0!==a)return a.exports;var n=e[r]={exports:{}};return t[r](n,n.exports,o),n.exports}o.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return o.d(e,{a:e}),e},o.d=(t,e)=>{for(var r in e)o.o(e,r)&&!o.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},o.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),o.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var r={};(()=>{"use strict";o.r(r),o.d(r,{CheckableButton:()=>H,LeaderBoardList:()=>W,LeaderBoardListItem:()=>F,LeaderBoardPage:()=>G,LeaderBoardState:()=>K,SortMap:()=>E,components:()=>X,searchTypes:()=>Y});const t=flarum.core.compat["common/extend"],e=flarum.core.compat["forum/app"];var a=o.n(e);flarum.core.compat["common/components/UsersSearchSource"];const n=flarum.core.compat["common/components/LinkButton"];var s=o.n(n);const i=flarum.core.compat["forum/components/IndexPage"];var u=o.n(i);function c(){return c=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var o=arguments[e];for(var r in o)Object.prototype.hasOwnProperty.call(o,r)&&(t[r]=o[r])}return t},c.apply(this,arguments)}function l(t,e){return l=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},l(t,e)}function d(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,l(t,e)}flarum.core.compat["forum/components/CommentPost"];const p=flarum.core.compat["common/components/Page"];var f=o.n(p);const h=flarum.core.compat["common/utils/ItemList"];var v=o.n(h);const y=flarum.core.compat["common/helpers/listItems"];var b=o.n(y);const C=flarum.core.compat["common/components/Select"];var g=o.n(C);const L=flarum.core.compat["common/components/Button"];var P=o.n(L);const B=flarum.core.compat["common/components/SelectDropdown"];var I=o.n(B);const N=flarum.core.compat["common/utils/extractText"];var w=o.n(N);const x=flarum.core.compat["common/Component"];var k=o.n(x);const S=flarum.core.compat["common/components/LoadingIndicator"];var M=o.n(S);const _=flarum.core.compat["common/components/Placeholder"];var q=o.n(_);flarum.core.compat["forum/components/UserCard"];const O=flarum.core.compat["common/helpers/icon"];var j=o.n(O);const A=flarum.core.compat["helpers/avatar"];var D=o.n(A);const R=flarum.core.compat["helpers/username"];var U=o.n(R),T=function(t){function e(){return t.apply(this,arguments)||this}return d(e,t),e.prototype.view=function(){var t,e,r=this.attrs.user,n=this.attrs.params.sort||"money",s=a().route.user(r),i=r.attribute(n)||"0",u=this.attrs.position;if("ziiven-decoration-store"in flarum.extensions){var c=o(313).components;t=c.avatarWithFrame,e=c.usernameWithColor}var l="";1===u?l="first":2===u?l="second":3===u&&(l="third");var d="fa-solid fa-chart-simple";return["money","lastCheckinMoney"].includes(n)?d="fa-solid fa-bolt":"bestAnswerCount"===n?d="fa-solid fa-check-double":["monthlyDiscussionCount","discussionCount"].includes(n)?d="fa-solid fa-pencil":["monthlyCommentCount","commentCount"].includes(n)?d="fa-regular fa-comment":["lotteryCount"].includes(n)&&(d="fa-solid fa-gift"),m("a",{href:s},m("span",{className:"LeaderboardListItem-position "+l},u),t?t(r):D()(r),m("div",{className:"LeaderboardListItem-username"},m("div",null,e?e(r):U()(r))),m("span",{className:"LeaderboardListItem-count",title:"","aria-label":i+" Points","data-original-title":i+" Points"},j()(d),i))},e}(k()),z=function(t){function e(){return t.apply(this,arguments)||this}return d(e,t),e.prototype.view=function(){var t,e,r=this.attrs.user,n=this.attrs.params.sort||"money",s=a().route.user(r),i=r.attribute(n)||"0",u=this.attrs.position;if("ziiven-decoration-store"in flarum.extensions){var c=o(313).components;t=c.avatarWithFrame,e=c.usernameWithColor}var l="",d=u;1===u?(l="second",d=2):2===u?(l="first",d=1):3===u&&(l="third");var p="fa-solid fa-chart-simple";return["money","lastCheckinMoney"].includes(n)?p="fa-solid fa-bolt":"bestAnswerCount"===n?p="fa-solid fa-check-double":["monthlyDiscussionCount","discussionCount"].includes(n)?p="fa-solid fa-pencil":["monthlyCommentCount","commentCount"].includes(n)?p="fa-regular fa-comment":["lotteryCount"].includes(n)&&(p="fa-solid fa-gift"),m("a",{href:s},t?t(r):D()(r),m("div",{className:"LeaderboardListItem-username"},m("div",null,e?e(r):U()(r))),m("span",{className:"LeaderboardListItem-count",title:"","aria-label":i+" Points","data-original-title":i+" Points"},j()(p),i),m("span",{className:"LeaderboardListItem-position "+l},d))},e}(k()),F=function(t){function e(){return t.apply(this,arguments)||this}return d(e,t),e.prototype.view=function(t){var e=this.attrs,o=e.user,r=e.useSmallCards,a=e.position,n={user:o,position:a,params:e.params,className:"UserCard--directory"+(r?" UserCard--small":""),controlsButtonClassName:"Button Button--icon Button--flat"};return m("div",{className:"LeaderboardListItem"},a>3?T.component(n):z.component(n))},e}(k()),W=function(t){function e(){return t.apply(this,arguments)||this}return d(e,t),e.prototype.view=function(){var t,e=this.attrs.state,o=e.getParams(),r=a().forum.attribute("leaderBoardSmallCards");if(e.isLoading()?t=M().component():e.moreResults&&(t=P().component({className:"Button",onclick:e.loadMore.bind(e)},a().translator.trans("nodeloc-leaderboard.forum.page.load_more_button"))),e.empty()){var n=a().translator.trans("nodeloc-leaderboard.forum.page.empty_text");return m("div",{className:"DiscussionList"},q().component({text:n}))}var s=e.users.slice(0,3),i=e.users.slice(3);if(s.length>=2){var u=[s[1],s[0]];s[0]=u[0],s[1]=u[1]}return m("div",{className:"LeaderBoardList"+(e.isSearchResults()?" LeaderBoardList--searchResults":"")+(r?" LeaderBoardList--small-cards":"")},m("ul",{className:"LeaderboardPodium"},s.map((function(t,e){return m("li",{key:t.id(),"data-id":t.id(),className:"LeaderboardPodium-item"},F.component({user:t,params:o,useSmallCards:r,position:e+1,isPodium:!0}))}))),m("ul",{className:"LeaderboardItemList"},i.map((function(t,e){return m("li",{key:t.id(),"data-id":t.id(),className:"LeaderboardItemList-item"},F.component({user:t,params:o,useSmallCards:r,position:e+4,isPodium:!1}))}))),m("div",{className:"LeaderBoardList-loadMore"},t))},e}(k()),E=function(){function t(){}return t.prototype.sortMap=function(){return{money:"-money",lotteryCount:"-lotteryCount",bestAnswerCount:"-bestAnswerCount",lastCheckinMoney:"-lastCheckinMoney",monthlyDiscussionCount:"-monthlyDiscussionCount",monthlyCommentCount:"-monthlyCommentCount",lastMonthlyDiscussionCount:"-lastMonthlyDiscussionCount",lastMonthlyCommentCount:"-lastMonthlyCommentCount",discussionCount:"-discussionCount",commentCount:"-commentCount"}},t}(),K=function(){function t(t,e){void 0===t&&(t={}),void 0===e&&(e=window.app),this.params=t,this.app=e,this.users=[],this.moreResults=!1,this.loading=!1,this.qBuilder={}}var e=t.prototype;return e.requestParams=function(){var t={include:[],filter:{}},e=this.params.sort||app.forum.attribute("leaderBoardDefaultSort");return t.sort=this.sortMap()[e],this.params.q&&(t.filter.q=this.params.q),t},e.sortMap=function(){return c({default:""},(new E).sortMap())},e.getParams=function(){return this.params},e.clear=function(){this.users=[],m.redraw()},e.refreshParams=function(t){var e=this;this.hasUsers()&&!Object.keys(t).some((function(o){return e.getParams()[o]!==t[o]}))||(this.params=t,t.qBuilder&&(Object.assign(this.qBuilder,t.qBuilder||{}),this.params.q=Object.values(this.qBuilder).join(" ").trim()),this.params.q,this.refresh())},e.refresh=function(){var t=this;return this.loading=!0,this.clear(),this.loadResults().then((function(e){t.users=[],t.parseResults(e)}),(function(){t.loading=!1,m.redraw()}))},e.loadResults=function(t){var e=this.app.preloadedApiDocument();if(e)return Promise.resolve(e);var o=this.requestParams();return o.page={offset:t},o.include=o.include.join(","),this.app.store.find("users",o)},e.loadMore=function(){this.loading=!0,this.loadResults(this.users.length).then(this.parseResults.bind(this))},e.parseResults=function(t){var e;return(e=this.users).push.apply(e,t),this.loading=!1,this.moreResults=!!t.payload.links&&!!t.payload.links.next,m.redraw(),t},e.hasUsers=function(){return this.users.length>0},e.isLoading=function(){return this.loading},e.isSearchResults=function(){return!!this.params.q},e.empty=function(){return!this.hasUsers()&&!this.isLoading()},t}(),G=function(t){function e(){return t.apply(this,arguments)||this}d(e,t);var o=e.prototype;return o.oninit=function(e){t.prototype.oninit.call(this,e),this.state=new K({}),this.state.refreshParams(a().search.params()),this.bodyClass="Leader--Board";var o=[];this.params().q&&Array.from(this.params().q.matchAll(/group:([\d,]+)/g)).forEach((function(t){o.push(t[1])})),a().history.push("leaderboard",a().translator.trans("nodeloc-leaderboard.forum.header.back_to_leader_board_tooltip"))},o.oncreate=function(e){t.prototype.oncreate.call(this,e),a().setTitle(w()(a().translator.trans("nodeloc-leaderboard.forum.page.nav")))},o.view=function(){return m("div",{className:"IndexPage"},u().prototype.hero(),m("div",{className:"container"},m("div",{className:"sideNavContainer"},m("nav",{className:"IndexPage-nav sideNav"},m("ul",null,b()(this.sidebarItems().toArray()))),m("div",{className:"IndexPage-results sideNavOffset"},m("div",{className:"IndexPage-toolbar"},m("ul",{className:"IndexPage-toolbar-view"},b()(this.viewItems().toArray())),m("ul",{className:"IndexPage-toolbar-action"},b()(this.actionItems().toArray()))),m(W,{state:this.state})))))},o.sidebarItems=function(){var t=u().prototype.sidebarItems();return t.setContent("nav",I().component({buttonClassName:"Button",className:"App-titleControl"},this.navItems().toArray())),t},o.navItems=function(){var t=u().prototype.navItems(),e=this.stickyParams();return t.add("nodeloc-leaderboard",s().component({href:a().route("nodeloc_leaderboard",e),icon:"fas fa-sort-amount-up"},a().translator.trans("nodeloc-leaderboard.forum.page.nav")),85),t},o.viewItems=function(){var t=new(v()),e=this.state.sortMap(),o={};for(var r in e)o[r]=a().translator.trans("nodeloc-leaderboard.lib.sort."+r);return t.add("sort",g().component({options:o,value:this.state.getParams().sort||a().forum.attribute("leaderBoardDefaultSort"),onchange:this.changeParams.bind(this)}),100),t},o.actionItems=function(){var t=this,e=new(v());return e.add("refresh",P().component({title:a().translator.trans("nodeloc-leaderboard.forum.page.refresh_tooltip"),icon:"fas fa-sync",className:"Button Button--icon",onclick:function(){t.state.refresh(),a().session.user&&(a().store.find("users",a().session.user.id()),m.redraw())}})),e},o.changeParams=function(t){var e=this.params();t===a().forum.attribute("leaderBoardDefaultSort")?delete e.sort:e.sort=t,this.state.refreshParams(e);var o=c({},e);delete o.qBuilder,m.route.set(a().route("nodeloc_leaderboard",o))},o.stickyParams=function(){return{sort:m.route.param("sort"),q:m.route.param("q")}},o.params=function(){return this.stickyParams()},e}(f()),H=function(t){function e(){return t.apply(this,arguments)||this}return d(e,t),e.prototype.getButtonContent=function(e){var o=t.prototype.getButtonContent.call(this,e);return this.attrs.checked&&o.push(j()("fas fa-check",{className:"Button-icon ButtonCheck"})),o},e}(P());const J=flarum.core.compat["common/Model"];var Q=o.n(J),V=function(t){function e(){for(var e,o=arguments.length,r=new Array(o),a=0;a<o;a++)r[a]=arguments[a];return(e=t.call.apply(t,[this].concat(r))||this).text=Q().attribute("text"),e}return d(e,t),e}(Q()),X={CheckableButton:H,SmallUserCard:T,LeaderBoardList:W,LeaderBoardListItem:F,LeaderBoardPage:G,LeaderBoardUserCard:z},Y={AbstractType:function(){function t(){this.suggestions=[],this.loading=!1}var e=t.prototype;return e.resourceType=function(){},e.search=function(t){},e.renderKind=function(t){},e.renderLabel=function(t){},e.applyFilter=function(t,e){},e.initializeFromParams=function(t){},t}()};a().initializers.add("nodeloc-leaderboard",(function(e){e.routes.nodeloc_leaderboard={path:"/leaderboard",component:G},e.store.models["nodeloc-leaderboard-text"]=V,(0,t.extend)(u().prototype,"navItems",(function(t){e.forum.attribute("canSeeLeaderBoardLink")&&t.add("nodeloc-leaderboard",s().component({href:e.route("nodeloc_leaderboard"),icon:"fas fa-sort-amount-up"},e.translator.trans("nodeloc-leaderboard.forum.page.nav")),85)}))}))})(),module.exports=r})();
//# sourceMappingURL=forum.js.map