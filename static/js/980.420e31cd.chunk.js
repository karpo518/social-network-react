"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[980],{3980:function(n,e,r){r.r(e),r.d(e,{default:function(){return W}});var t=r(5671),o=r(3144),i=r(136),s=r(5716),a=r(8687),u=r(2903),l=r(5987),c=r(8911),f=r(4942),p=r(885),g=r(2791),d=r(1694),h=r.n(d),m="Paginator_selectedPage__L4qmB",v="Paginator_pagination__wEWr9",_="Paginator_beforePortion__x-U0z",P="Paginator_afterPortion__f+4NW",y=r(184),j=function(n){for(var e=n.totalItemsCount,r=n.pageSize,t=n.currentPage,o=n.onPageChanged,i=n.portionSize,s=void 0===i?10:i,a=function(n){return Math.floor(n/s)+1},u=Math.ceil(e/r),l=[],c=1;c<=u;c++)l.push(c);var d=Math.ceil(u/s),j=(0,g.useState)(a(t)),C=(0,p.Z)(j,2),x=C[0],w=C[1],b=(x-1)*s+1,U=(x-1)*s+s,N=function(n){w(n)},k=function(n){o(n);var e=a(n);e!==x&&w(e)};return(0,y.jsxs)("div",{className:v,children:[x>1&&(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)("span",{onClick:function(){return k(1)},children:"1"},"1"),(0,y.jsx)("span",{onClick:function(){return N(x-1)},className:_,children:"<<"})]}),l.filter((function(n){return n>=b&&n<=U})).map((function(n){return(0,y.jsx)("span",{onClick:function(){return k(n)},className:h()((0,f.Z)({},m,t===n)),children:n},n)})),x<d&&(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)("span",{onClick:function(){return N(x+1)},className:P,children:">>"}),(0,y.jsx)("span",{onClick:function(){return k(u)},children:u},u)]})]})},C={user:"User_user__vm1W0",imageCol:"User_imageCol__zWKZj",mainCol:"User_mainCol__yLpQ+",image:"User_image__-QAvZ",btn:"User_btn__NQ8ct",btnFollow:"User_btnFollow__uXb79",name:"User_name__Sid3D",mainLeft:"User_mainLeft__AkKBC",mainRight:"User_mainRight__nLT7o",location:"User_location__774Ci",status:"User_status__9rxXe",preloader:"User_preloader__63gEQ"},x=r(8478),w=r(3504),b=function(n){var e=n.user,r=n.follow,t=n.unfollow,o=n.followingInProgress;return(0,y.jsxs)("div",{className:C.user,children:[(0,y.jsxs)("div",{className:C.imageCol,children:[(0,y.jsx)(w.OL,{to:"/profile/"+e.id,children:(0,y.jsx)("img",{className:C.image,src:null!=e.photos.small?e.photos.small:x,alt:"Profile avatar"})}),(0,y.jsx)("div",{children:e.followed?(0,y.jsx)("button",{onClick:function(){t(e.id)},className:"".concat(C.btn," ").concat(C.btnFollow),disabled:o.some((function(n){return n===e.id})),children:"Unfollow"}):(0,y.jsx)("button",{onClick:function(){r(e.id)},className:"".concat(C.btn," ").concat(C.btnUnfollow),disabled:o.some((function(n){return n===e.id})),children:"Follow"})})]}),(0,y.jsxs)("div",{className:C.mainCol,children:[(0,y.jsxs)("div",{className:C.mainLeft,children:[(0,y.jsx)("div",{className:C.name,children:e.name}),(0,y.jsx)("div",{className:C.status,children:e.status})]}),(0,y.jsx)("div",{className:C.mainRight,children:(0,y.jsxs)("div",{className:C.location,children:[(0,y.jsxs)("div",{className:C.city,children:[(0,y.jsx)("span",{children:"user.location.city"}),","]}),(0,y.jsx)("div",{className:C.country,children:(0,y.jsx)("span",{children:"user.location.country"})})]})})]})]},e.id)},U=["currentPage","onPageChanged","totalUsersCount","pageSize"],N=function(n){var e=n.currentPage,r=n.onPageChanged,t=n.totalUsersCount,o=n.pageSize,i=(0,l.Z)(n,U);return(0,y.jsxs)("div",{children:[(0,y.jsx)(j,{totalItemsCount:t,pageSize:o,onPageChanged:r,currentPage:e}),(0,y.jsx)("div",{children:i.isFetching?(0,y.jsx)(c.Z,{}):i.users.map((function(n){return(0,y.jsx)(b,{user:n,follow:i.follow,unfollow:i.unfollow,followingInProgress:i.followingInProgress},n.id)}))})]})},k=r(7781),S="NOT_FOUND";var z=function(n,e){return n===e};function F(n,e){var r="object"===typeof e?e:{equalityCheck:e},t=r.equalityCheck,o=void 0===t?z:t,i=r.maxSize,s=void 0===i?1:i,a=r.resultEqualityCheck,u=function(n){return function(e,r){if(null===e||null===r||e.length!==r.length)return!1;for(var t=e.length,o=0;o<t;o++)if(!n(e[o],r[o]))return!1;return!0}}(o),l=1===s?function(n){var e;return{get:function(r){return e&&n(e.key,r)?e.value:S},put:function(n,r){e={key:n,value:r}},getEntries:function(){return e?[e]:[]},clear:function(){e=void 0}}}(u):function(n,e){var r=[];function t(n){var t=r.findIndex((function(r){return e(n,r.key)}));if(t>-1){var o=r[t];return t>0&&(r.splice(t,1),r.unshift(o)),o.value}return S}return{get:t,put:function(e,o){t(e)===S&&(r.unshift({key:e,value:o}),r.length>n&&r.pop())},getEntries:function(){return r},clear:function(){r=[]}}}(s,u);function c(){var e=l.get(arguments);if(e===S){if(e=n.apply(null,arguments),a){var r=l.getEntries(),t=r.find((function(n){return a(n.value,e)}));t&&(e=t.value)}l.put(arguments,e)}return e}return c.clearCache=function(){return l.clear()},c}function Z(n){var e=Array.isArray(n[0])?n[0]:n;if(!e.every((function(n){return"function"===typeof n}))){var r=e.map((function(n){return"function"===typeof n?"function "+(n.name||"unnamed")+"()":typeof n})).join(", ");throw new Error("createSelector expects all input-selectors to be functions, but received the following types: ["+r+"]")}return e}function O(n){for(var e=arguments.length,r=new Array(e>1?e-1:0),t=1;t<e;t++)r[t-1]=arguments[t];var o=function(){for(var e=arguments.length,t=new Array(e),o=0;o<e;o++)t[o]=arguments[o];var i,s=0,a={memoizeOptions:void 0},u=t.pop();if("object"===typeof u&&(a=u,u=t.pop()),"function"!==typeof u)throw new Error("createSelector expects an output function after the inputs, but received: ["+typeof u+"]");var l=a,c=l.memoizeOptions,f=void 0===c?r:c,p=Array.isArray(f)?f:[f],g=Z(t),d=n.apply(void 0,[function(){return s++,u.apply(null,arguments)}].concat(p)),h=n((function(){for(var n=[],e=g.length,r=0;r<e;r++)n.push(g[r].apply(null,arguments));return i=d.apply(null,n)}));return Object.assign(h,{resultFunc:u,memoizedResultFunc:d,dependencies:g,lastResult:function(){return i},recomputations:function(){return s},resetRecomputations:function(){return s=0}}),h};return o}var I=O(F),A=I([function(n){return n.usersPage.users}],(function(n){return n.filter((function(n){return!0}))})),E=function(n){return n.usersPage.pageSize},L=function(n){return n.usersPage.totalUsersCount},R=function(n){return n.usersPage.currentPage},q=function(n){return n.usersPage.isFetching},D=function(n){return n.usersPage.followingInProgress},M=function(n){(0,i.Z)(r,n);var e=(0,s.Z)(r);function r(){var n;(0,t.Z)(this,r);for(var o=arguments.length,i=new Array(o),s=0;s<o;s++)i[s]=arguments[s];return(n=e.call.apply(e,[this].concat(i))).componentDidMount=function(){var e=n.props,r=e.currentPage,t=e.pageSize;1!==r?n.props.setCurrentPage(1):n.props.loadUsers(r,t)},n.onPageChanged=function(e){n.props.setCurrentPage(e)},n}return(0,o.Z)(r,[{key:"componentDidUpdate",value:function(n){n.currentPage!==this.props.currentPage&&this.props.loadUsers(this.props.currentPage,this.props.pageSize)}},{key:"render",value:function(){return(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)("h2",{children:this.props.pageTitle}),(0,y.jsx)(N,{totalUsersCount:this.props.totalUsersCount,pageSize:this.props.pageSize,currentPage:this.props.currentPage,onPageChanged:this.onPageChanged,follow:this.props.follow,unfollow:this.props.unfollow,isFetching:this.props.isFetching,followingInProgress:this.props.followingInProgress,users:this.props.users})]})}}]),r}(g.Component),Q={follow:u.ZN,unfollow:u.fv,setCurrentPage:u.D4,loadUsers:u.p_},W=(0,k.qC)((0,a.$j)((function(n){return{users:A(n),pageSize:E(n),totalUsersCount:L(n),currentPage:R(n),isFetching:q(n),followingInProgress:D(n)}}),Q))(M)},5987:function(n,e,r){r.d(e,{Z:function(){return o}});var t=r(3366);function o(n,e){if(null==n)return{};var r,o,i=(0,t.Z)(n,e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(n);for(o=0;o<s.length;o++)r=s[o],e.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(n,r)&&(i[r]=n[r])}return i}}}]);
//# sourceMappingURL=980.420e31cd.chunk.js.map