"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[752],{752:function(e,t,s){s.r(t),s.d(t,{default:function(){return J}});var o=s(5671),a=s(3144),r=s(136),n=s(5716),i=s(8683),l=s(8687),c=s(6070),u=s(2791),d=s(704),p=s(5304),f=s(816),m={postsBlock:"MyPosts_postsBlock__lB-pf",posts:"MyPosts_posts__GSiZ2"},h="Post_item__Yu4oG",x="Post_likesCount__LXQiZ",_=s(184),v=function(e){return(0,_.jsxs)("div",{className:h,children:[(0,_.jsx)("img",{src:"https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_960_720.png",alt:"author img"}),e.message,(0,_.jsx)("div",{children:(0,_.jsxs)("span",{className:x,children:[e.likesCount," like(s)"]})})]})},j=(0,p.B)(300),b=u.memo((function(e){var t=e.posts.map((function(e){return(0,_.jsx)(v,{className:m.post,message:e.message,likesCount:e.likesCount},e.id)}));return(0,_.jsxs)("div",{className:m.postsBlock,children:[(0,_.jsx)("h3",{children:"My Posts"}),(0,_.jsx)(g,{onSubmit:function(t){e.sendPost(t.newPostBody)}}),(0,_.jsx)("div",{className:m.posts,children:t})]})})),g=(0,d.Z)({form:"ProfileAddPostForm"})((function(e){return(0,_.jsxs)("form",{onSubmit:e.handleSubmit,children:[(0,f.G)("Write your message here..","newPostBody",[p.C,j],f.o,{fieldType:"textarea"}),(0,_.jsx)("div",{children:(0,_.jsx)("button",{children:"Add post"})})]})})),P=b,N=(0,l.$j)((function(e){return{posts:e.profilePage.posts,newPostText:e.profilePage.newPostText}}),{updateNewPostText:c.x1,sendPost:c.D2})(P),I=s(885),k=s(8911),y=s(8478),C={image:"ProfileInfo_image__Kkyc5",avatar:"ProfileInfo_avatar__1VFcV",descriptionBlock:"ProfileInfo_descriptionBlock__XBXuJ",aboutItem:"ProfileInfo_aboutItem__J2FXl",aboutTitle:"ProfileInfo_aboutTitle__zMikE",contactsBlock:"ProfileInfo_contactsBlock__cVFdA",contactList:"ProfileInfo_contactList__7p7ua",description:"ProfileInfo_description__u7GZ5",fullName:"ProfileInfo_fullName__3fR7R",updateAvatarBtn:"ProfileInfo_updateAvatarBtn__PZG2t",ownerImage:"ProfileInfo_ownerImage__bj3Hg",startChatWrap:"ProfileInfo_startChatWrap__8wLSp",profileDataForm:"ProfileInfo_profileDataForm__b+zKy",form:"ProfileInfo_form__OSgA8",fieldItem:"ProfileInfo_fieldItem__bAs7p",editDataWrap:"ProfileInfo_editDataWrap__hRuvJ",saveDataWrap:"ProfileInfo_saveDataWrap__ij-9O",contactFieldWrap:"ProfileInfo_contactFieldWrap__-jneh",errors:"ProfileInfo_errors__dIyFr"},F=s(3504),S=function(e){var t=(0,u.useState)(!1),s=(0,I.Z)(t,2),o=s[0],a=s[1],r=(0,u.useState)(e.status),n=(0,I.Z)(r,2),i=n[0],l=n[1];(0,u.useEffect)((function(){l(e.status)}),[e.status]);return(0,_.jsx)("div",{className:C.statusBlock,children:o?(0,_.jsx)("div",{children:(0,_.jsx)("input",{autoFocus:!0,onBlur:function(){a(!1),e.updateStatus(i)},onChange:function(e){l(e.currentTarget.value)},type:"text",value:i})}):(0,_.jsx)("div",{children:(0,_.jsx)("span",{onDoubleClick:function(){a(!0)},children:i})})})},Z=s(6139),T=(0,d.Z)({form:"edit-profile",enableReinitialize:!0,destroyOnUnmount:!1})((function(e){var t=Object.keys(e.profile.contacts);return(0,_.jsxs)("form",{onSubmit:e.handleSubmit,className:"".concat(C.form," ").concat(C.profileDataForm),children:[(0,_.jsx)("div",{className:C.saveDataWrap,children:(0,_.jsx)("button",{children:"Save"})}),e.error&&(0,_.jsxs)("div",{className:C.errors,children:[" ",e.error]}),(0,_.jsx)("div",{className:C.fieldItem,children:(0,_.jsx)(Z.Z,{name:"fullName",component:"input",type:"text",placeholder:"Full Name"})}),(0,_.jsx)("div",{className:C.fieldItem,children:(0,f.G)("About me","aboutMe",[],f.o,{type:"text",fieldType:"textarea",label:"About me"})}),(0,_.jsx)("div",{className:C.fieldItem,children:(0,f.G)(null,"lookingForAJob",[],f.o,{type:"checkbox",fieldType:"input",label:"Looking for a job",id:"lookingForAJob"})}),(0,_.jsx)("div",{className:C.fieldItem,children:(0,f.G)("Details","lookingForAJobDescription",[],f.o,{type:"text",fieldType:"textarea",label:"My professional skills"})}),(0,_.jsxs)("div",{className:C.aboutItem,children:[(0,_.jsx)("div",{className:C.aboutTitle,children:"Contacts: "}),(0,_.jsx)("div",{className:C.contactList,children:t.map((function(e){return(0,_.jsx)("div",{className:C.contactFieldWrap,children:(0,f.G)(e,"contacts.".concat(e),[],f.o,{type:"text",fieldType:"input",label:e})})}))})]})]})})),D=function(e){var t=e.contactTitle,s=e.contactValue;return(0,_.jsxs)("li",{children:[(0,_.jsxs)("span",{className:C.aboutTitle,children:[t,":"]}),(0,_.jsx)("a",{href:"".concat(s),target:"_blank",rel:"noreferrer",children:"".concat(s)})]})},A=function(e){var t=e.profile,s=e.status,o=e.isOwner,a=e.updateStatus,r=e.activateEditMode,n=Object.keys(t.contacts).filter((function(e){return t.contacts[e]}));return(0,_.jsxs)("div",{className:C.description,children:[o&&(0,_.jsx)("div",{className:C.editDataWrap,children:(0,_.jsx)("button",{onClick:r,children:"Edit"})}),(0,_.jsx)("div",{className:C.aboutItem,children:(0,_.jsx)("div",{className:C.fullName,children:t.fullName})}),(0,_.jsx)("div",{className:C.aboutItem,children:(0,_.jsx)(S,{status:s,updateStatus:a})}),(0,_.jsxs)("div",{className:C.aboutItem,children:[(0,_.jsx)("span",{className:C.aboutTitle,children:"About me: "}),t.aboutMe?t.aboutMe:"-"]}),(0,_.jsxs)("div",{className:C.aboutItem,children:[(0,_.jsx)("span",{className:C.aboutTitle,children:"Looking for a job:"}),t.lookingForAJob?"yes":"no"]}),(0,_.jsxs)("div",{className:C.aboutItem,children:[(0,_.jsx)("div",{className:C.aboutTitle,children:"My professional skills:"}),t.lookingForAJobDescription?t.lookingForAJobDescription:"-"]}),n.length>0&&(0,_.jsxs)("div",{className:C.aboutItem,children:[(0,_.jsx)("div",{className:C.aboutTitle,children:"\u041a\u043e\u043d\u0442\u0430\u043a\u0442\u044b: "}),(0,_.jsx)("ul",{className:C.contactList,children:n.map((function(e){return(0,_.jsx)(D,{contactTitle:e,contactValue:t.contacts[e]},e)}))})]})]})},B=function(e){var t=e.profile,s=e.status,o=e.updateStatus,a=e.isOwner,r=e.savePhoto,n=e.saveProfile,i=u.useRef(null),l=(0,u.useState)(!1),c=(0,I.Z)(l,2),d=c[0],p=c[1];if(!t)return(0,_.jsx)(k.Z,{});return(0,_.jsx)("div",{children:(0,_.jsxs)("div",{className:C.descriptionBlock,children:[(0,_.jsxs)("div",{children:[(0,_.jsx)("img",{className:C.avatar+(a?" ".concat(C.ownerImage):""),src:null!=t.photos.large?t.photos.large:y,alt:"Profile avatar",title:a?"Click for uploading":"",onClick:function(){i.current.click()}}),a&&(0,_.jsx)("input",{className:C.updateAvatarBtn,ref:i,type:"file",onChange:function(e){e.target.files.length&&r(e.target.files[0])}})]}),!a&&(0,_.jsx)("div",{className:C.startChatWrap,children:(0,_.jsx)(F.OL,{to:"/dialogs/".concat(t.userId),children:"Send message"})}),d?(0,_.jsx)(T,{initialValues:t,profile:t,status:s,updateStatus:o,onSubmit:function(e){n(e).then((function(){return p(!1)}))}}):(0,_.jsx)(A,{profile:t,status:s,isOwner:a,updateStatus:o,activateEditMode:function(){p(!0)}})]})})},w=function(e){return(0,_.jsxs)("div",{children:[(0,_.jsx)(B,{isOwner:e.isOwner,profile:e.profile,status:e.status,updateStatus:e.updateStatus,savePhoto:e.savePhoto,saveProfile:e.saveProfile}),(0,_.jsx)(N,{store:e.store})]})},W=s(6871),O=s(7781),M=s(1548);var G=function(e){(0,r.Z)(s,e);var t=(0,n.Z)(s);function s(){var e;(0,o.Z)(this,s);for(var a=arguments.length,r=new Array(a),n=0;n<a;n++)r[n]=arguments[n];return(e=t.call.apply(t,[this].concat(r))).getProfileData=function(){var t=null;e.props.router.params.userId?t=e.props.router.params.userId:e.props.auth.id?t=e.props.auth.id:e.props.router.navigate("/login"),t&&(e.props.getUserProfile(t),e.props.getStatus(t))},e.componentDidMount=function(){e.getProfileData()},e}return(0,a.Z)(s,[{key:"componentDidUpdate",value:function(e){e.router.params.userId!==this.props.router.params.userId&&(console.log([e.router.params.userId,this.props.router.params.userId]),this.getProfileData())}},{key:"render",value:function(){return(0,_.jsx)(_.Fragment,{children:this.props.profile?(0,_.jsx)(w,{isOwner:!this.props.router.params.userId,profile:this.props.profile,status:this.props.status,updateStatus:this.props.updateStatus,savePhoto:this.props.savePhoto,saveProfile:this.props.saveProfile}):(0,_.jsx)("div",{children:"\u041d\u0435\u0442 \u0434\u0430\u043d\u043d\u044b\u0445 \u0434\u043b\u044f \u043e\u0442\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u044f"})})}}]),s}(u.Component),J=(0,O.qC)((0,l.$j)((function(e){return{profile:e.profilePage.profile,status:e.profilePage.status,auth:e.auth}}),{getUserProfile:c.et,getStatus:c.lR,updateStatus:c.Nf,savePhoto:c.Ju,saveProfile:c.Ii}),(function(e){return function(t){var s=(0,W.TH)(),o=(0,W.s0)(),a=(0,W.UO)();return(0,_.jsx)(e,(0,i.Z)((0,i.Z)({},t),{},{router:{location:s,navigate:o,params:a}}))}}),M.D)(G)},816:function(e,t,s){s.d(t,{o:function(){return h},G:function(){return x}});var o=s(8683),a=s(5987),r=s(6139),n="FormControls_checkboxControl__33VzZ",i="FormControls_formControl__Bze--",l="FormControls_error__rGNdT",c="FormControls_errorText__5Si0-",u="FormControls_fieldWrap__e7QgK",d="FormControls_labelCheckboxWrap__kXX0d",p="FormControls_labelTextWrap__nPV0n",f=s(184),m=["input","meta","fieldType"],h=function(e){var t=e.input,s=e.meta,r=s.touched,n=s.error,h=e.fieldType,x=(0,a.Z)(e,m),_=r&&n;return(0,f.jsxs)("div",{className:i+" "+(_?l:""),children:[x.label&&"checkbox"!==x.type&&(0,f.jsx)("div",{className:"".concat(p),children:(0,f.jsx)("label",{htmlFor:x.id||"",children:x.label})}),(0,f.jsx)("div",{className:u,children:"input"===h?(0,f.jsx)("input",(0,o.Z)((0,o.Z)({},t),x)):(0,f.jsx)("textarea",(0,o.Z)((0,o.Z)({},t),x))}),x.label&&"checkbox"===x.type&&(0,f.jsx)("div",{className:d,children:(0,f.jsx)("label",{htmlFor:x.id||"",children:x.label})}),_?(0,f.jsx)("div",{className:c,children:(0,f.jsx)("span",{children:n})}):""]})},x=function(e,t,s,a,i){var l=i.wrapClasses||"";return i.type&&"checkbox"===i.type&&(l+=n),(0,f.jsx)("div",{className:l,children:(0,f.jsx)(r.Z,(0,o.Z)({placeholder:e,name:t,validate:s,component:a},i))})}},1548:function(e,t,s){s.d(t,{D:function(){return l}});var o=s(8683),a=s(8687),r=s(6871),n=s(184),i=function(e){return{isAuth:e.auth.isAuth}},l=function(e){return(0,a.$j)(i)((function(t){return t.isAuth?(0,n.jsx)(e,(0,o.Z)({},t)):(0,n.jsx)(r.Fg,{to:"/login"})}))}},5304:function(e,t,s){s.d(t,{B:function(){return a},C:function(){return o}});var o=function(e){if(console.log("required"),!e||""===e)return"It is required field!"},a=function(e){return function(t){if(t&&t.length>e)return"You have exceeded the maximum message length(".concat(e,")")}}}}]);
//# sourceMappingURL=752.ec1593ac.chunk.js.map