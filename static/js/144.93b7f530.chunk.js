"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[144],{8144:function(n,e,r){r.r(e),r.d(e,{default:function(){return D}});var t=r(5671),o=r(3144),i=r(136),s=r(5716),a=r(8687),u=r(2338),l=r(5987),c=r(8911),f=r(885),p=r(2791),g="Paginator_selectedPage__L4qmB",d="Paginator_pagination__wEWr9",h="Paginator_beforePortion__x-U0z",m="Paginator_afterPortion__f+4NW",v=r(184),_=function(n){for(var e=n.totalItemsCount,r=n.pageSize,t=n.currentPage,o=n.onPageChanged,i=n.portionSize,s=void 0===i?10:i,a=function(n){return Math.floor(n/s)+1},u=Math.ceil(e/r),l=[],c=1;c<=u;c++)l.push(c);var _=Math.ceil(u/s),P=(0,p.useState)(a(t)),y=(0,f.Z)(P,2),j=y[0],C=y[1],w=(j-1)*s+1,x=(j-1)*s+s,b=function(n){C(n)},U=function(n){o(n);var e=a(n);console.log(e,j),e!==j&&C(e)};return(0,v.jsxs)("div",{className:d,children:[j>1&&(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)("span",{onClick:function(){return U(1)},children:"1"},"1"),(0,v.jsx)("span",{onClick:function(){return b(j-1)},className:h,children:"<<"})]}),l.filter((function(n){return n>=w&&n<=x})).map((function(n){return(0,v.jsx)("span",{onClick:function(){return U(n)},className:t===n?g:"",children:n},n)})),j<_&&(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)("span",{onClick:function(){return b(j+1)},className:m,children:">>"}),(0,v.jsx)("span",{onClick:function(){return U(u)},children:u},u)]})]})},P={user:"User_user__vm1W0",imageCol:"User_imageCol__zWKZj",mainCol:"User_mainCol__yLpQ+",image:"User_image__-QAvZ",btn:"User_btn__NQ8ct",btnFollow:"User_btnFollow__uXb79",name:"User_name__Sid3D",mainLeft:"User_mainLeft__AkKBC",mainRight:"User_mainRight__nLT7o",location:"User_location__774Ci",status:"User_status__9rxXe",preloader:"User_preloader__63gEQ"},y=r(8478),j=r(3504),C=function(n){var e=n.user,r=n.follow,t=n.unfollow,o=n.followingInProgress;return(0,v.jsxs)("div",{className:P.user,children:[(0,v.jsxs)("div",{className:P.imageCol,children:[(0,v.jsx)(j.OL,{to:"/profile/"+e.id,children:(0,v.jsx)("img",{className:P.image,src:null!=e.photos.small?e.photos.small:y,alt:"Profile avatar"})}),(0,v.jsx)("div",{children:e.followed?(0,v.jsx)("button",{onClick:function(){t(e.id)},className:"".concat(P.btn," ").concat(P.btnFollow),disabled:o.some((function(n){return n===e.id})),children:"Unfollow"}):(0,v.jsx)("button",{onClick:function(){r(e.id)},className:"".concat(P.btn," ").concat(P.btnUnfollow),disabled:o.some((function(n){return n===e.id})),children:"Follow"})})]}),(0,v.jsxs)("div",{className:P.mainCol,children:[(0,v.jsxs)("div",{className:P.mainLeft,children:[(0,v.jsx)("div",{className:P.name,children:e.name}),(0,v.jsx)("div",{className:P.status,children:e.status})]}),(0,v.jsx)("div",{className:P.mainRight,children:(0,v.jsxs)("div",{className:P.location,children:[(0,v.jsxs)("div",{className:P.city,children:[(0,v.jsx)("span",{children:"user.location.city"}),","]}),(0,v.jsx)("div",{className:P.country,children:(0,v.jsx)("span",{children:"user.location.country"})})]})})]})]},e.id)},w=["currentPage","onPageChanged","totalUsersCount","pageSize"],x=function(n){var e=n.currentPage,r=n.onPageChanged,t=n.totalUsersCount,o=n.pageSize,i=(0,l.Z)(n,w);return(0,v.jsxs)("div",{children:[(0,v.jsx)(_,{totalItemsCount:t,pageSize:o,onPageChanged:r,currentPage:e}),(0,v.jsx)("div",{children:i.isFetching?(0,v.jsx)(c.Z,{}):i.users.map((function(n){return(0,v.jsx)(C,{user:n,follow:i.follow,unfollow:i.unfollow,followingInProgress:i.followingInProgress},n.id)}))})]})},b=r(7781),U="NOT_FOUND";var N=function(n,e){return n===e};function k(n,e){var r="object"===typeof e?e:{equalityCheck:e},t=r.equalityCheck,o=void 0===t?N:t,i=r.maxSize,s=void 0===i?1:i,a=r.resultEqualityCheck,u=function(n){return function(e,r){if(null===e||null===r||e.length!==r.length)return!1;for(var t=e.length,o=0;o<t;o++)if(!n(e[o],r[o]))return!1;return!0}}(o),l=1===s?function(n){var e;return{get:function(r){return e&&n(e.key,r)?e.value:U},put:function(n,r){e={key:n,value:r}},getEntries:function(){return e?[e]:[]},clear:function(){e=void 0}}}(u):function(n,e){var r=[];function t(n){var t=r.findIndex((function(r){return e(n,r.key)}));if(t>-1){var o=r[t];return t>0&&(r.splice(t,1),r.unshift(o)),o.value}return U}return{get:t,put:function(e,o){t(e)===U&&(r.unshift({key:e,value:o}),r.length>n&&r.pop())},getEntries:function(){return r},clear:function(){r=[]}}}(s,u);function c(){var e=l.get(arguments);if(e===U){if(e=n.apply(null,arguments),a){var r=l.getEntries(),t=r.find((function(n){return a(n.value,e)}));t&&(e=t.value)}l.put(arguments,e)}return e}return c.clearCache=function(){return l.clear()},c}function z(n){var e=Array.isArray(n[0])?n[0]:n;if(!e.every((function(n){return"function"===typeof n}))){var r=e.map((function(n){return"function"===typeof n?"function "+(n.name||"unnamed")+"()":typeof n})).join(", ");throw new Error("createSelector expects all input-selectors to be functions, but received the following types: ["+r+"]")}return e}function S(n){for(var e=arguments.length,r=new Array(e>1?e-1:0),t=1;t<e;t++)r[t-1]=arguments[t];var o=function(){for(var e=arguments.length,t=new Array(e),o=0;o<e;o++)t[o]=arguments[o];var i,s=0,a={memoizeOptions:void 0},u=t.pop();if("object"===typeof u&&(a=u,u=t.pop()),"function"!==typeof u)throw new Error("createSelector expects an output function after the inputs, but received: ["+typeof u+"]");var l=a,c=l.memoizeOptions,f=void 0===c?r:c,p=Array.isArray(f)?f:[f],g=z(t),d=n.apply(void 0,[function(){return s++,u.apply(null,arguments)}].concat(p)),h=n((function(){for(var n=[],e=g.length,r=0;r<e;r++)n.push(g[r].apply(null,arguments));return i=d.apply(null,n)}));return Object.assign(h,{resultFunc:u,memoizedResultFunc:d,dependencies:g,lastResult:function(){return i},recomputations:function(){return s},resetRecomputations:function(){return s=0}}),h};return o}var F=S(k),I=F([function(n){return n.usersPage.users}],(function(n){return n.filter((function(n){return!0}))})),O=function(n){return n.usersPage.pageSize},Z=function(n){return n.usersPage.totalUsersCount},A=function(n){return n.usersPage.currentPage},E=function(n){return n.usersPage.isFetching},L=function(n){return n.usersPage.followingInProgress},R=function(n){(0,i.Z)(r,n);var e=(0,s.Z)(r);function r(){var n;(0,t.Z)(this,r);for(var o=arguments.length,i=new Array(o),s=0;s<o;s++)i[s]=arguments[s];return(n=e.call.apply(e,[this].concat(i))).componentDidMount=function(){var e=n.props,r=e.currentPage,t=e.pageSize;1!==r?n.props.setCurrentPage(1):n.props.loadUsers(r,t)},n.onPageChanged=function(e){n.props.setCurrentPage(e)},n}return(0,o.Z)(r,[{key:"componentDidUpdate",value:function(n){n.currentPage!==this.props.currentPage&&this.props.loadUsers(this.props.currentPage,this.props.pageSize)}},{key:"render",value:function(){return(0,v.jsx)(v.Fragment,{children:(0,v.jsx)(x,{totalUsersCount:this.props.totalUsersCount,pageSize:this.props.pageSize,currentPage:this.props.currentPage,onPageChanged:this.onPageChanged,follow:this.props.follow,unfollow:this.props.unfollow,isFetching:this.props.isFetching,followingInProgress:this.props.followingInProgress,users:this.props.users})})}}]),r}(p.Component),q={follow:u.ZN,unfollow:u.fv,setCurrentPage:u.D4,toggleIsFollowingInProgress:u.z3,loadUsers:u.p_},D=(0,b.qC)((0,a.$j)((function(n){return{users:I(n),pageSize:O(n),totalUsersCount:Z(n),currentPage:A(n),isFetching:E(n),followingInProgress:L(n)}}),q))(R)},5987:function(n,e,r){r.d(e,{Z:function(){return o}});var t=r(3366);function o(n,e){if(null==n)return{};var r,o,i=(0,t.Z)(n,e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(n);for(o=0;o<s.length;o++)r=s[o],e.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(n,r)&&(i[r]=n[r])}return i}}}]);
//# sourceMappingURL=144.93b7f530.chunk.js.map