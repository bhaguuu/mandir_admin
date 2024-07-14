"use strict";(self.webpackChunkadmin_dashboard_template_dashwind=self.webpackChunkadmin_dashboard_template_dashwind||[]).push([[490],{9396:function(e,t,a){a.d(t,{A:function(){return d}});var n=a(4165),s=a(1413),r=a(5861),c=a(3144),i=a(5671),l=a(1243),o=(0,c.Z)((function e(t){var a=this;(0,i.Z)(this,e),this.getData=function(){var e=(0,r.Z)((0,n.Z)().mark((function e(t,r,c){return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("".concat(a.baseurl,"/").concat(t)),r&&(a.headers=(0,s.Z)((0,s.Z)({},a.headers),{},{authorization:"Bearer ".concat(r)})),e.abrupt("return",l.Z.get("".concat(a.baseurl,"/").concat(t),{headers:a.headers,params:c}).then((function(e){return{data:e.data,error:!1}})).catch((function(e){return console.log(e,"ERROR"),{data:e,error:!0}})));case 3:case"end":return e.stop()}}),e)})));return function(t,a,n){return e.apply(this,arguments)}}(),this.deleteData=function(){var e=(0,r.Z)((0,n.Z)().mark((function e(t,r,c){return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c&&(a.headers=(0,s.Z)((0,s.Z)({},a.headers),{},{authorization:"Bearer ".concat(c)})),console.log(a.headers),e.abrupt("return",l.Z.delete("".concat(a.baseurl,"/").concat(t),r,{headers:a.headers}).then((function(e){return{data:"Data Deleted",error:!1}})).catch((function(e){return console.log(e.response.data,"redss"),{data:e,error:!0}})));case 3:case"end":return e.stop()}}),e)})));return function(t,a,n){return e.apply(this,arguments)}}(),this.postData=function(){var e=(0,r.Z)((0,n.Z)().mark((function e(t,r,c,i){return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c&&(i&&(a.headers={contentType:i}),a.headers=(0,s.Z)((0,s.Z)({},a.headers),{},{authorization:"Bearer ".concat(c)})),e.abrupt("return",l.Z.post("".concat(a.baseurl,"/").concat(t),r,{headers:a.headers}).then((function(e){return{data:e.data,error:!1}})).catch((function(e){return console.log(e,"ss"),{data:e.message,error:!0}})));case 2:case"end":return e.stop()}}),e)})));return function(t,a,n,s){return e.apply(this,arguments)}}(),this.putData=function(){var e=(0,r.Z)((0,n.Z)().mark((function e(t,r,c){return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c&&(a.headers=(0,s.Z)((0,s.Z)({},a.headers),{},{authorization:"Bearer ".concat(c)})),e.abrupt("return",l.Z.put("".concat(a.baseurl,"/").concat(t),r,{headers:a.headers}).then((function(e){return console.log(e.data,"Dats updates"),{data:e.data,error:!1}})).catch((function(e){return console.log(e.response.data,"error"),{data:e.response.data,error:!0}})));case 2:case"end":return e.stop()}}),e)})));return function(t,a,n){return e.apply(this,arguments)}}(),this.baseurl=t,this.headers={contentType:"application/json"}})),d=new o("http://139.144.1.59:8080")},5524:function(e,t,a){var n=a(9439),s=a(2791),r=a(184);t.Z=function(e){var t=e.labelTitle,a=e.labelStyle,c=e.type,i=e.containerStyle,l=e.defaultValue,o=e.placeholder,d=e.updateFormValue,u=e.updateType,h=e.maxLength,p=(0,s.useState)(l),m=(0,n.Z)(p,2),f=m[0],x=m[1],E=(0,s.useState)(""),T=(0,n.Z)(E,2),b=T[0],N=T[1];return(0,r.jsxs)("div",{className:"form-control w-full ".concat(i),children:[(0,r.jsx)("label",{className:"label",children:(0,r.jsx)("span",{className:"label-text text-base-content "+a,children:t})}),(0,r.jsx)("input",{maxLength:h,style:{},type:c||"text",value:"file"==c?b.name:f,placeholder:o||"",onChange:function(e){var t;"file"===c&&N(e.target.value),t="file"==c?e.target.files[0]:e.target.value,x("file"===c?"":t),d({updateType:u,value:t})},className:"input  input-bordered w-full "})]})}},9697:function(e,t,a){var n=a(184);t.Z=function(e){var t=e.styleClass,a=e.children;return(0,n.jsx)("p",{className:"text-center  text-error ".concat(t),children:a})}},6041:function(e,t,a){a.d(t,{i:function(){return n}});var n={LOGIN:"admin/admin-login",GET_USER:"get-users",ADD_NEW_USER:"add-user",DELETE_USER:"delete-user",UPDATE_STAUS_USER:"user-status",GET_EVENTS:"events/list",ADD_EVENTS:"events/add",DELETE_STATUS_EVENT:"events/delete-status",UPDATE_ACTIVE_STATUS_EVENT:"events/change-status",GET_SINGLE_EVENT:"events/details",ADD_NEWS:"news/add",GET_NEWS:"news/list",DELETE_UPDATE_NEWS:"news/delete-status",NEWS_DETAIL:"news/details",UPDATE_NEWS_STATUS:"news/change-status",EXCEL_UPLOAD:"get-file",EDIT_USER:"edit-user",EDIT_EVENT:"events/edit",EDIT_NEWS:"news/edit",SEARHC_USER:"user/search",SEARHC_EVENT:"events/search",SEARHC_NEWS:"news/search",ADD_ABOUT:"add-content",GET_ABOUT:"get-content",ADD_ADVERTISMENT:"admin/add-ads",ADD_CONTENT:"app/add-content",GET_ADS:"admin/get-ads",GET_CONTENT:"app/get-content",DELETE_ADS:"delete-ad",UPDATE_ADS_STATUS:"ad-status",EDIT_ADS:"edit-ad"}},2124:function(e,t,a){a(4623);var n=a(184),s=a(4753);t.Z=function(){return(0,n.jsx)("div",{className:"hero min-h-full rounded-l-xl",children:(0,n.jsx)("div",{className:"hero-content",children:(0,n.jsx)("div",{className:"text-center mt-0",children:(0,n.jsx)("img",{src:s,alt:"Dashwind Admin Template",className:"w-100 inline-block"})})})})}},4856:function(e,t,a){var n=a(4942),s=a(1413),r=a(4165),c=a(5861),i=a(9439),l=a(2791),o=a(2124),d=a(9697),u=a(5524),h=a(9396),p=a(6041),m=a(6887),f=(a(8060),a(9085)),x=(a(5462),a(184));t.Z=function(){var e=(0,l.useState)(!1),t=(0,i.Z)(e,2),a=t[0],E=t[1],T=(0,l.useState)(""),b=(0,i.Z)(T,2),N=b[0],v=b[1],S=(0,l.useState)({password:"",emailId:""}),Z=(0,i.Z)(S,2),_=Z[0],w=Z[1],D=function(){var e=(0,c.Z)((0,r.Z)().mark((function e(t){var a;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,t.preventDefault(),v(""),""!==_.emailId.trim()){e.next=5;break}throw"Email Id is required!";case 5:if(""!==_.password.trim()){e.next=9;break}throw"Password is required!";case 9:return E(!0),e.next=12,h.A.postData(p.i.LOGIN,{email:_.emailId,password:_.password});case 12:if(a=e.sent,console.log(a),200!=a.data.status){e.next=19;break}localStorage.setItem(m.i.TOKEN_DETAIL,a.data.data),window.location.href="/",e.next=20;break;case 19:throw a.data.message;case 20:e.next=26;break;case 22:e.prev=22,e.t0=e.catch(0),(0,f.Am)(e.t0),console.log(e.t0);case 26:return e.prev=26,E(!1),e.finish(26);case 29:case"end":return e.stop()}}),e,null,[[0,22,26,29]])})));return function(t){return e.apply(this,arguments)}}(),g=function(e){var t=e.updateType,a=e.value;v(""),w((0,s.Z)((0,s.Z)({},_),{},(0,n.Z)({},t,a)))};return(0,x.jsxs)("div",{className:"min-h-screen bg-base-200 flex items-center",children:[(0,x.jsx)("div",{className:"card mx-auto w-full max-w-5xl  shadow-xl",children:(0,x.jsxs)("div",{className:"grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl",children:[(0,x.jsx)("div",{className:"",children:(0,x.jsx)(o.Z,{})}),(0,x.jsxs)("div",{className:"py-24 px-10",children:[(0,x.jsx)("h2",{className:"text-2xl font-semibold mb-2 text-center",children:"Login"}),(0,x.jsxs)("form",{onSubmit:function(e){return D(e)},children:[(0,x.jsxs)("div",{className:"mb-4",children:[(0,x.jsx)(u.Z,{type:"emailId",defaultValue:_.emailId,updateType:"emailId",containerStyle:"mt-4",labelTitle:"Email Id",updateFormValue:g}),(0,x.jsx)(u.Z,{defaultValue:_.password,type:"password",updateType:"password",containerStyle:"mt-4",labelTitle:"Password",updateFormValue:g})]}),(0,x.jsx)(d.Z,{styleClass:"mt-8",children:N}),(0,x.jsx)("button",{type:"submit",className:"btn mt-2 w-full btn-primary"+(a?" loading":""),children:"Login"})]})]})]})}),(0,x.jsx)(f.Ix,{})]})}},4623:function(e,t,a){var n=a(184);t.Z=function(){return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("h1",{className:"text-2xl mt-8 font-bold",children:"Admin Dashboard Starter Kit"}),(0,n.jsxs)("p",{className:"py-2 mt-4",children:["\u2713 ",(0,n.jsx)("span",{className:"font-semibold",children:"Light/dark"})," mode toggle"]}),(0,n.jsxs)("p",{className:"py-2 ",children:["\u2713 ",(0,n.jsx)("span",{className:"font-semibold",children:"Redux toolkit"})," and other utility libraries configured"]}),(0,n.jsxs)("p",{className:"py-2",children:["\u2713 ",(0,n.jsx)("span",{className:"font-semibold",children:"Calendar, Modal, Sidebar "})," components"]}),(0,n.jsxs)("p",{className:"py-2  ",children:["\u2713 User-friendly ",(0,n.jsx)("span",{className:"font-semibold",children:"documentation"})]}),(0,n.jsxs)("p",{className:"py-2  mb-4",children:["\u2713 ",(0,n.jsx)("span",{className:"font-semibold",children:"Daisy UI"})," components, ",(0,n.jsx)("span",{className:"font-semibold",children:"Tailwind CSS"})," support"]})]})}},3490:function(e,t,a){a.r(t);a(2791);var n=a(4856),s=a(184);t.default=function(){return(0,s.jsx)("div",{className:"",children:(0,s.jsx)(n.Z,{})})}},4753:function(e,t,a){e.exports=a.p+"static/media/main.525fdcab6c12bfcb9112.jpeg"}}]);
//# sourceMappingURL=490.fa9447db.chunk.js.map