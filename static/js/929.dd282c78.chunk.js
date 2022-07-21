"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[929],{8929:function(e,s,a){a.r(s),a.d(s,{DialogsContainer:function(){return R},default:function(){return U}});var n=a(4942),l=a(1413),i=a(3433),t=a(9439),o=a(8786),c=a(9603),r=a(7462),d=a(7106),u=a(1694),g=a.n(u),m=a(5987),h=a(2791),f=a(5179),x=a(1354),_=h.forwardRef((function(e,s){var a,l=e.prefixCls,i=void 0===l?"rc-switch":l,o=e.className,c=e.checked,r=e.defaultChecked,d=e.disabled,u=e.loadingIcon,_=e.checkedChildren,v=e.unCheckedChildren,p=e.onClick,j=e.onChange,Z=e.onKeyDown,N=(0,m.Z)(e,["prefixCls","className","checked","defaultChecked","disabled","loadingIcon","checkedChildren","unCheckedChildren","onClick","onChange","onKeyDown"]),b=(0,f.Z)(!1,{value:c,defaultValue:r}),D=(0,t.Z)(b,2),C=D[0],y=D[1];function w(e,s){var a=C;return d||(y(a=e),null===j||void 0===j||j(a,s)),a}var k=g()(i,o,(a={},(0,n.Z)(a,"".concat(i,"-checked"),C),(0,n.Z)(a,"".concat(i,"-disabled"),d),a));return h.createElement("button",Object.assign({},N,{type:"button",role:"switch","aria-checked":C,disabled:d,className:k,ref:s,onKeyDown:function(e){e.which===x.Z.LEFT?w(!1,e):e.which===x.Z.RIGHT&&w(!0,e),null===Z||void 0===Z||Z(e)},onClick:function(e){var s=w(!C,e);null===p||void 0===p||p(s,e)}}),u,h.createElement("span",{className:"".concat(i,"-inner")},C?_:v))}));_.displayName="Switch";var v=_,p=a(1929),j=a(9125),Z=a(1815),N=a(2833),b=function(e,s){var a={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&s.indexOf(n)<0&&(a[n]=e[n]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var l=0;for(n=Object.getOwnPropertySymbols(e);l<n.length;l++)s.indexOf(n[l])<0&&Object.prototype.propertyIsEnumerable.call(e,n[l])&&(a[n[l]]=e[n[l]])}return a},D=h.forwardRef((function(e,s){var a,l=e.prefixCls,i=e.size,t=e.disabled,o=e.loading,c=e.className,u=void 0===c?"":c,m=b(e,["prefixCls","size","disabled","loading","className"]),f=h.useContext(p.E_),x=f.getPrefixCls,_=f.direction,D=h.useContext(Z.Z),C=h.useContext(j.Z),y=t||C||o,w=x("switch",l),k=h.createElement("div",{className:"".concat(w,"-handle")},o&&h.createElement(d.Z,{className:"".concat(w,"-loading-icon")})),I=g()((a={},(0,n.Z)(a,"".concat(w,"-small"),"small"===(i||D)),(0,n.Z)(a,"".concat(w,"-loading"),o),(0,n.Z)(a,"".concat(w,"-rtl"),"rtl"===_),a),u);return h.createElement(N.Z,{insertExtraNode:!0},h.createElement(v,(0,r.Z)({},m,{prefixCls:w,className:I,disabled:y,ref:s,loadingIcon:k})))}));D.__ANT_SWITCH=!0;var C=D,y=a(3707),w=a(8687),k=a(704),I=function(e){var s=e.dialogsPage.selectedId,a=e.dialogsPage.dialogs.find((function(e){return e.id===s}));return a?a.userName:void 0},T=a(4972),S=a(5889),F=a(501),E={dialogs:"Dialogs_dialogs__oe96H",dialogItems:"Dialogs_dialogItems__VFpmc",selectDialog:"Dialogs_selectDialog__ukFfu",dialog:"Dialogs_dialog__htSTl",selectDialogMode:"Dialogs_selectDialogMode__KS22B",mobileTitle:"Dialogs_mobileTitle__JBZ-q",username:"Dialogs_username__TzJ+p",active:"Dialogs_active__t8cjl",dialogListHead:"Dialogs_dialogListHead__VpNF+",name:"Dialogs_name__ThYtM",messages:"Dialogs_messages__Cg2l+",message:"Dialogs_message__ZEWo0",body:"Dialogs_body__6RDuF",outgoing:"Dialogs_outgoing__-AWT8",image:"Dialogs_image__wl+13",form:"Dialogs_form__2diAn"},M=a(8478),A=a(184),O=function(e){var s=e.id,a=e.userName,l=(e.hasNewMessages,e.lastDialogActivityDate,e.lastUserActivityDate,e.newMessagesCount),i=e.photos,t=e.selectedId,o="/dialogs/".concat(s),c=i.small||M;return(0,A.jsxs)("div",{className:g()(E.dialog,(0,n.Z)({},E.active,s===t)),children:[(0,A.jsx)("div",{className:E.image,children:(0,A.jsx)("img",{src:c,alt:"dialog img"})}),(0,A.jsxs)("div",{className:E.name,children:[(0,A.jsx)(F.OL,{to:o,children:a}),l?(0,A.jsxs)("span",{className:E.newCount,children:["+",l]}):""]})]})},P=function(e){var s=e.senderId===e.selectedId?"incoming":"outgoing";return(0,A.jsxs)("div",{className:E.message+" "+E[s],children:[(0,A.jsx)("div",{className:E.author,children:(0,A.jsx)("div",{className:E.image,children:(0,A.jsx)("img",{src:M,alt:"default img"})})}),(0,A.jsx)("div",{className:E.body,children:e.body})]})},B=(0,T.B)(300),z=(0,k.Z)({form:"DialogsAddMessageForm"})((function(e){return(0,A.jsxs)("form",{onSubmit:e.handleSubmit,className:E.form,children:[(0,A.jsx)("div",{className:"title",children:"Send message"}),(0,S.Gr)("Write your message here..","body",[T.C,B],S.ox,{fieldType:"textarea"}),(0,A.jsx)("div",{className:"submitBlock",children:(0,A.jsx)(y.Z,{type:"primary",htmlType:"submit",children:"Send"})})]})})),H=function(e){var s=e.selectedId,a=e.dialogs,r=e.messages,d=e.newDialog,u=e.sendMessage,m=(0,h.useState)(!s),f=(0,t.Z)(m,2),x=f[0],_=f[1];(0,h.useEffect)((function(){s&&_(!1)}),[s]);var v=(null===d?a:[d].concat((0,i.Z)(a))).map((function(e){return(0,A.jsx)(O,(0,l.Z)({selectedId:s},e),e.id)})),p=r.map((function(e){return(0,A.jsx)(P,(0,l.Z)((0,l.Z)({},e),{},{selectedId:s}))})),j=(0,w.v9)(I);return(0,A.jsxs)("div",{className:E.dialogs,children:[(0,A.jsx)("h1",{children:"\u0421\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u044f"}),(0,A.jsxs)(o.Z,{children:[(0,A.jsxs)(c.Z,{span:24,md:6,children:[(0,A.jsxs)("div",{className:E.dialogListHead,children:["\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u0432\u0441\u0435 \u0434\u0438\u0430\u043b\u043e\u0433\u0438 ",(0,A.jsx)(C,{checked:x,onChange:_}),!x&&(0,A.jsxs)("div",{className:E.mobileTitle,children:["\u0414\u0438\u0430\u043b\u043e\u0433 \u0441 ",(0,A.jsx)("span",{className:E.username,children:j})]})]}),(0,A.jsx)("div",{className:g()(E.dialogItems,(0,n.Z)({},E.selectDialogMode,!0===x)),children:v})]}),(0,A.jsx)(c.Z,{span:24,md:18,children:s?(0,A.jsxs)("div",{className:E.messages,children:[(0,A.jsx)("div",{className:E.list,children:p}),(0,A.jsx)(z,{onSubmit:function(e){null!==s&&u(s,e)},userId:s})]}):(0,A.jsx)("div",{className:E.selectDialog,children:"Please, select dialog!"})})]})]})},W=a(832),G=a(6871),K=["isAuth"],L=function(e){return{isAuth:e.auth.isAuth}},V=a(7781),R=function(e){var s=(0,G.UO)(),a=s.userId?parseInt(s.userId):0,n=[e.setSelectedDialog,e.getDialogs,e.getMessages],l=n[0],i=n[1],t=n[2];return(0,h.useEffect)((function(){l(a),i(a),t(a)}),[a,l,i,t]),(0,h.useEffect)((function(){var e=setInterval((function(){i(a),t(a)}),15e3);return function(){clearTimeout(e)}}),[a,l,i,t]),(0,A.jsx)(H,{dialogs:e.dialogs,newDialog:e.newDialog,messages:e.messages,selectedId:e.selectedId,sendMessage:e.sendMessage})},q={getDialogs:W.AB,createNewDialog:W.Nl,resetNewDialog:W.Xy.resetNewDialog,getMessages:W._U,sendMessage:W.bG,setSelectedDialog:W.Xy.setSelectedDialog},U=(0,V.qC)((function(e){return(0,w.$j)(L)((function(s){s.isAuth;var a=(0,m.Z)(s,K);return s.isAuth?(0,A.jsx)(e,(0,l.Z)({},a)):(0,A.jsx)(G.Fg,{to:"/login"})}))}),(0,w.$j)((function(e){return{dialogs:e.dialogsPage.dialogs,messages:e.dialogsPage.messages,selectedId:e.dialogsPage.selectedId,newDialog:e.dialogsPage.newDialog,auth:e.auth}}),q))(R)},5889:function(e,s,a){a.d(s,{zb:function(){return Z},ox:function(){return p},Gr:function(){return j},fo:function(){return N}});var n=a(1413),l=a(5987),i=a(4587),t=a(9498),o=a(6023),c=a(6139),r="FormControls_checkboxControl__33VzZ",d="FormControls_formControl__Bze--",u="FormControls_error__rGNdT",g="FormControls_errorText__5Si0-",m="FormControls_fieldWrap__e7QgK",h="FormControls_labelTextWrap__nPV0n",f=a(5705),x=a(184),_=["input","meta","fieldType"],v=["field","form","fieldType"],p=function(e){var s=e.input,a=e.meta,c=a.touched,r=a.error,f=e.fieldType,v=(0,l.Z)(e,_),p=c&&r;return(0,x.jsxs)("div",{className:d+" "+(p?u:""),children:[v.label&&"checkbox"!==v.type&&(0,x.jsx)("div",{className:"".concat(h),children:(0,x.jsx)("label",{htmlFor:v.id||"",children:v.label})}),(0,x.jsx)("div",{className:m,children:"input"===f?"checkbox"===v.type?(0,x.jsx)(i.Z,(0,n.Z)((0,n.Z)((0,n.Z)({},s),v),{},{children:v.label})):(0,x.jsx)(t.Z,(0,n.Z)((0,n.Z)({},s),v)):(0,x.jsx)(o.Z,(0,n.Z)((0,n.Z)({},s),v))}),p?(0,x.jsx)("div",{className:g,children:(0,x.jsx)("span",{children:r})}):""]})};function j(e,s,a,l,i){var t=i.wrapClasses||"";return i.type&&"checkbox"===i.type&&(t+=r),(0,x.jsx)("div",{className:t,children:(0,x.jsx)(c.Z,(0,n.Z)({placeholder:e,name:s,validate:a,component:l},i))})}var Z=function(e){var s,a=e.field,c=e.form,r=c.touched,f=c.errors,_=e.fieldType,p=(0,l.Z)(e,v),j=r[a.name]&&f[a.name];return(0,x.jsxs)("div",{className:d+" "+(j?u:""),children:[p.label&&"checkbox"!==p.type&&(0,x.jsx)("div",{className:"".concat(h),children:(0,x.jsx)("label",{htmlFor:p.id||"",children:p.label})}),(0,x.jsx)("div",{className:m,children:"input"===_?"checkbox"===p.type?(0,x.jsx)(i.Z,(0,n.Z)((0,n.Z)((0,n.Z)({},a),p),{},{children:p.label})):(0,x.jsx)(t.Z,(0,n.Z)((0,n.Z)({},a),p)):(0,x.jsx)(o.Z,(0,n.Z)((0,n.Z)({},a),p))}),r[a.name]&&f[a.name]&&(0,x.jsx)("div",{className:g,children:(0,x.jsx)("p",{children:null===(s=f[a.name])||void 0===s?void 0:s.toString()})})]})};function N(e,s,a,l,i){var t=i.wrapClasses||"";return i.type&&"checkbox"===i.type&&(t+=r),(0,x.jsx)("div",{className:t,children:(0,x.jsx)(f.gN,(0,n.Z)({placeholder:e,name:s,validate:a,component:l},i))})}},4972:function(e,s,a){a.d(s,{B:function(){return l},C:function(){return n}});var n=function(e){if(!e||""===e)return"It is required field!"},l=function(e){return function(s){if(s&&s.length>e)return"You have exceeded the maximum message length(".concat(e,")")}}}}]);
//# sourceMappingURL=929.dd282c78.chunk.js.map