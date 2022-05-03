"use strict";(self.webpackChunkprotego=self.webpackChunkprotego||[]).push([[448],{6448:(D,v,i)=>{i.r(v),i.d(v,{LoginModule:()=>V});var u=i(9808),T=i(406),m=i(1402),P=i(7182),g=i(8951),n=i(3075),q=i(8128),A=i(5144),b=i(1816),o=i(5e3),x=i(4540),a=i(9224),p=i(7322),c=i(7531),f=i(5245),L=i(3290),h=i(7423),w=i(4894);function y(r,s){1&r&&(o.TgZ(0,"mat-error")(1,"mat-icon",13),o._uU(2,"error_outline"),o.qZA(),o._uU(3),o.ALo(4,"translate"),o.qZA()),2&r&&(o.xp6(3),o.hij(" ",o.lcZ(4,1,"protego.login.email.warn1")," "))}function U(r,s){1&r&&(o.TgZ(0,"mat-error")(1,"mat-icon",13),o._uU(2,"error_outline"),o.qZA(),o._uU(3),o.ALo(4,"translate"),o.qZA()),2&r&&(o.xp6(3),o.hij(" ",o.lcZ(4,1,"protego.login.email.warn2")," "))}function J(r,s){1&r&&(o.TgZ(0,"mat-error")(1,"mat-icon",13),o._uU(2,"error_outline"),o.qZA(),o._uU(3),o.ALo(4,"translate"),o.qZA()),2&r&&(o.xp6(3),o.hij(" ",o.lcZ(4,1,"protego.login.required")," "))}const O=function(){return["/login/forgot-password"]};let I=(()=>{class r{constructor(e,t,l,d,_,Z,C){this.authService=e,this.router=t,this.route=l,this.fb=d,this.communicationService=_,this.usersService=Z,this.tokenService=C,this.submitted=!1,this.hide=!0,this.siteKey="6Lf57HQaAAAAAPPcEnDe7TO4PVTyUjN1w3qd91EQ",this.recaptchaComplete=!1}ngOnInit(){this.tokenService.username&&this.router.navigate(["/home"]),this.loginForm=this.fb.group({email:["",[n.kI.required,n.kI.email]],password:["",n.kI.required]}),this.returnUrl=this.route.snapshot.queryParams.returnUrl||"/"}get loginFormControl(){return this.loginForm.controls}onLogin(){this.submitted=!0,this.loginForm.valid&&(this.user=new P.n(this.loginForm.value),this.authService.login(this.user).subscribe({next:e=>{this.userRole=(0,b.Z)(e.auth_token).role,this.getUserPhoto((0,b.Z)(e.auth_token).username),this.router.navigate([this.returnUrl])},error:e=>console.log(e)}))}getUserPhoto(e){this.usersService.getUserPhoto(e).subscribe({next:t=>{this.communicationService.emitChange({username:e,role:this.userRole,profilePhoto:"data:image/gif;base64,"+t})},error:t=>console.log(t)})}resolved(e){this.authService.validateRecaptcha(e).subscribe({next:t=>{t.success&&(this.recaptchaComplete=!0)},error:t=>console.log(t)})}onError(e){console.log("reCAPTCHA error encountered; details:",e)}}return r.\u0275fac=function(e){return new(e||r)(o.Y36(g.e),o.Y36(m.F0),o.Y36(m.gz),o.Y36(n.qu),o.Y36(x.W),o.Y36(A.f),o.Y36(q.B))},r.\u0275cmp=o.Xpm({type:r,selectors:[["login"]],decls:30,vars:28,consts:[[1,"protego-page-container"],[1,"protego-login-form"],[1,"protego-form",3,"formGroup"],[1,"protego-full-width"],["matInput","","type","text","formControlName","email","required","",3,"placeholder"],["align","end"],[4,"ngIf"],["matInput","","formControlName","password","required","",3,"type","placeholder"],[3,"routerLink"],["matSuffix","",2,"cursor","pointer",3,"click"],[1,"protego-recaptcha"],["errorMode","handled",3,"siteKey","resolved","error"],["type","submit","mat-raised-button","","color","primary",1,"protego-button",3,"disabled","click"],[2,"margin-right","2px"]],template:function(e,t){1&e&&(o.TgZ(0,"div",0)(1,"mat-card",1)(2,"form",2)(3,"mat-card-title"),o._uU(4),o.ALo(5,"translate"),o.qZA(),o.TgZ(6,"mat-card-content")(7,"mat-form-field",3),o._UZ(8,"input",4),o.ALo(9,"translate"),o._UZ(10,"mat-hint",5),o.YNc(11,y,5,3,"mat-error",6),o.YNc(12,U,5,3,"mat-error",6),o.qZA(),o.TgZ(13,"mat-form-field",3),o._UZ(14,"input",7),o.ALo(15,"translate"),o.TgZ(16,"mat-hint",5)(17,"a",8),o._uU(18),o.ALo(19,"translate"),o.qZA()(),o.YNc(20,J,5,3,"mat-error",6),o.TgZ(21,"mat-icon",9),o.NdJ("click",function(){return t.hide=!t.hide}),o._uU(22),o.qZA()()()(),o.TgZ(23,"div",10)(24,"re-captcha",11),o.NdJ("resolved",function(d){return t.resolved(d)})("error",function(d){return t.onError(d)}),o.qZA()(),o.TgZ(25,"mat-card-actions")(26,"button",12),o.NdJ("click",function(){return t.onLogin()}),o.ALo(27,"translate"),o._uU(28),o.ALo(29,"translate"),o.qZA()()()()),2&e&&(o.xp6(2),o.Q6J("formGroup",t.loginForm),o.xp6(2),o.Oqu(o.lcZ(5,15,"protego.login.login")),o.xp6(4),o.s9C("placeholder",o.lcZ(9,17,"protego.login.email")),o.xp6(3),o.Q6J("ngIf",(t.loginFormControl.email.touched||t.submitted)&&(null==t.loginFormControl.email.errors?null:t.loginFormControl.email.errors.required)),o.xp6(1),o.Q6J("ngIf",(t.loginFormControl.email.touched||t.submitted)&&(null==t.loginFormControl.email.errors?null:t.loginFormControl.email.errors.email)),o.xp6(2),o.s9C("placeholder",o.lcZ(15,19,"protego.login.password")),o.Q6J("type",t.hide?"password":"text"),o.xp6(3),o.Q6J("routerLink",o.DdM(27,O)),o.xp6(1),o.Oqu(o.lcZ(19,21,"protego.login.forgot.password")),o.xp6(2),o.Q6J("ngIf",(t.loginFormControl.password.touched||t.submitted)&&(null==t.loginFormControl.password.errors?null:t.loginFormControl.password.errors.required)),o.xp6(2),o.Oqu(t.hide?"visibility_off":"visibility"),o.xp6(2),o.s9C("siteKey",t.siteKey),o.xp6(2),o.Q6J("disabled",!t.loginForm.valid||!t.recaptchaComplete),o.uIk("aria-label",o.lcZ(27,23,"protego.login.aria")),o.xp6(2),o.Oqu(o.lcZ(29,25,"protego.login.login")))},directives:[a.a8,n._Y,n.JL,n.sg,a.n5,a.dn,p.KE,c.Nt,n.Fj,n.JJ,n.u,n.Q7,p.bx,u.O5,p.TO,f.Hw,m.yS,p.R9,L.wT,a.hq,h.lW],pipes:[w.X$],styles:[".protego-page-container[_ngcontent-%COMP%]{height:75vh;display:flex;justify-content:center;align-items:center}.protego-login-form[_ngcontent-%COMP%]{min-width:150px;max-width:350px;width:100%}.protego-full-width[_ngcontent-%COMP%]{width:100%;padding-bottom:1em}.protego-recaptcha[_ngcontent-%COMP%]{padding-bottom:1em;padding-left:5px}.protego-button[_ngcontent-%COMP%]{margin-left:1em!important;margin-bottom:1em!important}"]}),r})();var F=i(5899);function k(r,s){1&r&&(o.TgZ(0,"mat-error")(1,"mat-icon",11),o._uU(2,"error_outline"),o.qZA(),o._uU(3),o.ALo(4,"translate"),o.qZA()),2&r&&(o.xp6(3),o.hij(" ",o.lcZ(4,1,"protego.forgot-password.warn1")," "))}function M(r,s){1&r&&(o.TgZ(0,"mat-error")(1,"mat-icon",11),o._uU(2,"error_outline"),o.qZA(),o._uU(3),o.ALo(4,"translate"),o.qZA()),2&r&&(o.xp6(3),o.hij(" ",o.lcZ(4,1,"protego.forgot-password.warn2")," "))}function Y(r,s){1&r&&o._UZ(0,"mat-progress-bar",12)}function N(r,s){if(1&r){const e=o.EpF();o.TgZ(0,"mat-card",3)(1,"form",4)(2,"mat-card-title"),o._uU(3),o.ALo(4,"translate"),o.qZA(),o.TgZ(5,"mat-card-content")(6,"p"),o._uU(7),o.ALo(8,"translate"),o.qZA(),o.TgZ(9,"mat-form-field",5),o._UZ(10,"input",6),o.ALo(11,"translate"),o._UZ(12,"mat-hint",7),o.YNc(13,k,5,3,"mat-error",8),o.YNc(14,M,5,3,"mat-error",8),o.qZA()()(),o.TgZ(15,"mat-card-actions")(16,"button",9),o.NdJ("click",function(){return o.CHM(e),o.oxw().onSubmit()}),o.ALo(17,"translate"),o._uU(18),o.ALo(19,"translate"),o.qZA()(),o.TgZ(20,"mat-card-footer"),o.YNc(21,Y,1,0,"mat-progress-bar",10),o.qZA()()}if(2&r){const e=o.oxw();o.xp6(1),o.Q6J("formGroup",e.passwordForm),o.xp6(2),o.Oqu(o.lcZ(4,10,"protego.forgot-password.reset")),o.xp6(4),o.Oqu(o.lcZ(8,12,"protego.forgot-password.info")),o.xp6(3),o.s9C("placeholder",o.lcZ(11,14,"protego.forgot-password.email")),o.xp6(3),o.Q6J("ngIf",(e.passwordFormControl.email.touched||e.submitted)&&(null==e.passwordFormControl.email.errors?null:e.passwordFormControl.email.errors.required)),o.xp6(1),o.Q6J("ngIf",(e.passwordFormControl.email.touched||e.submitted)&&(null==e.passwordFormControl.email.errors?null:e.passwordFormControl.email.errors.email)),o.xp6(2),o.Q6J("disabled",!e.passwordForm.valid),o.uIk("aria-label",o.lcZ(17,16,"protego.forgot-password.aria1")),o.xp6(2),o.Oqu(o.lcZ(19,18,"protego.forgot-password.send")),o.xp6(3),o.Q6J("ngIf",e.loading)}}const Q=function(){return["/login"]};function S(r,s){1&r&&(o.TgZ(0,"mat-card",3)(1,"mat-card-content")(2,"p"),o._uU(3),o.ALo(4,"translate"),o.qZA()(),o.TgZ(5,"mat-card-actions")(6,"button",13),o.ALo(7,"translate"),o._uU(8),o.ALo(9,"translate"),o.qZA()()()),2&r&&(o.xp6(3),o.Oqu(o.lcZ(4,4,"protego.forgot-password.success")),o.xp6(3),o.Q6J("routerLink",o.DdM(10,Q)),o.uIk("aria-label",o.lcZ(7,6,"protego.forgot-password.aria2")),o.xp6(2),o.Oqu(o.lcZ(9,8,"protego.forgot-password.return")))}let R=(()=>{class r{constructor(e,t){this.authApi=e,this.fb=t,this.linkSent=!1,this.loading=!1}ngOnInit(){this.passwordForm=this.fb.group({email:["",[n.kI.required,n.kI.email]]})}get passwordFormControl(){return this.passwordForm.controls}onSubmit(){this.loading=!0,this.passwordForm.valid&&this.authApi.resetPassword(this.passwordForm.controls.email.value).subscribe({next:()=>{this.linkSent=!0,this.loading=!1},error:e=>console.log(e)})}}return r.\u0275fac=function(e){return new(e||r)(o.Y36(g.e),o.Y36(n.qu))},r.\u0275cmp=o.Xpm({type:r,selectors:[["forgot-password"]],decls:4,vars:2,consts:[[1,"protego-main-wrapper"],["class","protego-login-form",4,"ngIf","ngIfElse"],["elseTemplate",""],[1,"protego-login-form"],[3,"formGroup"],[1,"protego-full-width"],["matInput","","type","text","formControlName","email","required","",3,"placeholder"],["align","end"],[4,"ngIf"],["mat-raised-button","","color","primary",1,"protego-full-width",3,"disabled","click"],["mode","query",4,"ngIf"],[2,"margin-right","2px"],["mode","query"],["mat-raised-button","","color","primary",1,"protego-full-width",3,"routerLink"]],template:function(e,t){if(1&e&&(o.TgZ(0,"div",0),o.YNc(1,N,22,20,"mat-card",1),o.YNc(2,S,10,11,"ng-template",null,2,o.W1O),o.qZA()),2&e){const l=o.MAs(3);o.xp6(1),o.Q6J("ngIf",!t.linkSent)("ngIfElse",l)}},directives:[u.O5,a.a8,n._Y,n.JL,n.sg,a.n5,a.dn,p.KE,c.Nt,n.Fj,n.JJ,n.u,n.Q7,p.bx,p.TO,f.Hw,a.hq,h.lW,a.rt,F.pW,m.rH],pipes:[w.X$],styles:['@charset "UTF-8";.protego-main-wrapper[_ngcontent-%COMP%]{width:350px;margin:auto;padding-top:1em}.protego-login-form[_ngcontent-%COMP%]{min-width:150px;max-width:350px;width:100%}.protego-full-width[_ngcontent-%COMP%]{width:100%}.protego-loading[_ngcontent-%COMP%]{font-size:18pt;width:350px;margin:auto}.protego-loading[_ngcontent-%COMP%]:after{overflow:hidden;display:inline-block;vertical-align:bottom;-webkit-animation:ellipsis steps(4,end) .9s infinite;animation:ellipsis steps(4,end) .9s infinite;content:"\\2026";width:0px}@keyframes ellipsis{to{width:1.25em}}@-webkit-keyframes ellipsis{to{width:1.25em}}.protego-cursor-wait[_ngcontent-%COMP%]{cursor:wait}.protego-text-danger[_ngcontent-%COMP%]{color:red;font-size:10pt;padding:2px;display:block;width:100%}']}),r})();var j=i(8894),E=i(6239);function z(r,s){1&r&&(o.TgZ(0,"mat-error")(1,"mat-icon",10),o._uU(2,"error_outline"),o.qZA(),o._uU(3),o.ALo(4,"translate"),o.qZA()),2&r&&(o.xp6(3),o.hij(" ",o.lcZ(4,1,"protego.reset-password.error1")," "))}function H(r,s){1&r&&(o.TgZ(0,"mat-error")(1,"mat-icon",10),o._uU(2,"error_outline"),o.qZA(),o._uU(3),o.ALo(4,"translate"),o.qZA()),2&r&&(o.xp6(3),o.hij(" ",o.lcZ(4,1,"protego.reset-password.error2")," "))}function K(r,s){1&r&&(o.TgZ(0,"mat-error")(1,"mat-icon",10),o._uU(2,"error_outline"),o.qZA(),o._uU(3),o.ALo(4,"translate"),o.qZA()),2&r&&(o.xp6(3),o.hij(" ",o.lcZ(4,1,"protego.reset-password.error3")," "))}function W(r,s){1&r&&(o.TgZ(0,"mat-error")(1,"mat-icon",10),o._uU(2,"error_outline"),o.qZA(),o._uU(3),o.ALo(4,"translate"),o.qZA()),2&r&&(o.xp6(3),o.hij(" ",o.lcZ(4,1,"protego.reset-password.error4")," "))}function G(r,s){1&r&&o._UZ(0,"mat-progress-bar",11)}const X=[{path:"",component:I,data:{title:"protego.menu.login"}},{path:"forgot-password",component:R,data:{title:"protego.menu.forgot-password"}},{path:"reset-password/:id",component:(()=>{class r{constructor(e,t,l,d,_,Z,C){this.authApi=e,this.usersService=t,this.router=l,this.ar=d,this.fb=_,this.customValidator=Z,this.notificationService=C,this.submitted=!1,this.loading=!1,this.hide1=!0,this.hide2=!0}ngOnInit(){this.ar.params.subscribe(e=>{e.id&&(this.token=e.id,this.getUsername(this.token))}),this.passwordForm=this.fb.group({password:["",n.kI.compose([n.kI.required,this.customValidator.patternValidator()])],confirm_password:["",[n.kI.required]]},{validators:this.customValidator.MatchPassword("password","confirm_password")})}get passwordFormControl(){return this.passwordForm.controls}getUsername(e){this.usersService.getUsername(e).subscribe({next:t=>this.username=t.username,error:t=>console.log(t)})}onSubmit(){this.passwordForm.valid&&(this.loading=!0,this.authApi.updatePassword({token:this.token,password:this.passwordForm.controls.password.value}).subscribe({next:()=>{this.loading=!1,this.submitted=!0,this.notificationService.success("Password updated successfully"),this.router.navigate(["/login"])},error:e=>console.log(e)}))}}return r.\u0275fac=function(e){return new(e||r)(o.Y36(g.e),o.Y36(A.f),o.Y36(m.F0),o.Y36(m.gz),o.Y36(n.qu),o.Y36(j.a),o.Y36(E.g))},r.\u0275cmp=o.Xpm({type:r,selectors:[["reset-password"]],decls:28,vars:21,consts:[[1,"protego-main-wrapper"],[1,"protego-login-form"],[3,"formGroup"],[1,"protego-full-width"],["matInput","","placeholder","Password","formControlName","password","required","","appPassword","",3,"type"],[4,"ngIf"],["matSuffix","",2,"cursor","pointer",3,"click"],["matInput","","placeholder","Confirm Password","formControlName","confirm_password","required","",3,"type"],["mat-raised-button","","color","primary","attr.aria-label","change password",1,"protego-full-width",3,"disabled","click"],["mode","query",4,"ngIf"],[2,"margin-right","2px"],["mode","query"]],template:function(e,t){1&e&&(o.TgZ(0,"div",0)(1,"mat-card",1)(2,"form",2)(3,"mat-card-title"),o._uU(4),o.ALo(5,"translate"),o.qZA(),o.TgZ(6,"mat-card-content")(7,"mat-form-field",3),o._UZ(8,"input",4),o.YNc(9,z,5,3,"mat-error",5),o.YNc(10,H,5,3,"mat-error",5),o.TgZ(11,"mat-icon",6),o.NdJ("click",function(){return t.hide1=!t.hide1}),o._uU(12),o.qZA()(),o.TgZ(13,"mat-form-field",3),o._UZ(14,"input",7),o.YNc(15,K,5,3,"mat-error",5),o.YNc(16,W,5,3,"mat-error",5),o.TgZ(17,"mat-icon",6),o.NdJ("click",function(){return t.hide2=!t.hide2}),o._uU(18),o.qZA()()()(),o.TgZ(19,"p"),o._uU(20),o.ALo(21,"translate"),o.qZA(),o.TgZ(22,"mat-card-actions")(23,"button",8),o.NdJ("click",function(){return t.onSubmit()}),o._uU(24),o.ALo(25,"translate"),o.qZA()(),o.TgZ(26,"mat-card-footer"),o.YNc(27,G,1,0,"mat-progress-bar",9),o.qZA()()()),2&e&&(o.xp6(2),o.Q6J("formGroup",t.passwordForm),o.xp6(2),o.AsE("",o.lcZ(5,15,"protego.reset-password.title")," @",t.username,""),o.xp6(4),o.Q6J("type",t.hide1?"password":"text"),o.xp6(1),o.Q6J("ngIf",(t.passwordFormControl.password.touched||t.submitted)&&(null==t.passwordFormControl.password.errors?null:t.passwordFormControl.password.errors.required)),o.xp6(1),o.Q6J("ngIf",(t.passwordFormControl.password.touched||t.submitted)&&(null==t.passwordFormControl.password.errors?null:t.passwordFormControl.password.errors.invalidPassword)),o.xp6(2),o.Oqu(t.hide1?"visibility_off":"visibility"),o.xp6(2),o.Q6J("type",t.hide2?"password":"text"),o.xp6(1),o.Q6J("ngIf",(t.passwordFormControl.confirm_password.touched||t.submitted)&&(null==t.passwordFormControl.confirm_password.errors?null:t.passwordFormControl.confirm_password.errors.required)),o.xp6(1),o.Q6J("ngIf",(t.passwordFormControl.confirm_password.touched||t.submitted)&&(null==t.passwordFormControl.confirm_password.errors?null:t.passwordFormControl.confirm_password.errors.passwordMismatch)),o.xp6(2),o.Oqu(t.hide2?"visibility_off":"visibility"),o.xp6(2),o.hij("",o.lcZ(21,17,"protego.reset-password.p"),"."),o.xp6(3),o.Q6J("disabled",!t.passwordForm.valid),o.xp6(1),o.Oqu(o.lcZ(25,19,"protego.reset-password.button")),o.xp6(3),o.Q6J("ngIf",t.loading))},directives:[a.a8,n._Y,n.JL,n.sg,a.n5,a.dn,p.KE,c.Nt,n.Fj,n.JJ,n.u,n.Q7,u.O5,p.TO,f.Hw,p.R9,a.hq,h.lW,a.rt,F.pW],pipes:[w.X$],styles:['@charset "UTF-8";.protego-main-wrapper[_ngcontent-%COMP%]{width:350px;margin:auto;padding-top:1em}.protego-login-form[_ngcontent-%COMP%]{min-width:150px;max-width:350px;width:100%}.protego-full-width[_ngcontent-%COMP%]{width:100%;margin-top:1em}.protego-loading[_ngcontent-%COMP%]{font-size:18pt;width:350px;margin:auto}.protego-loading[_ngcontent-%COMP%]:after{overflow:hidden;display:inline-block;vertical-align:bottom;-webkit-animation:ellipsis steps(4,end) .9s infinite;animation:ellipsis steps(4,end) .9s infinite;content:"\\2026";width:0px}@keyframes ellipsis{to{width:1.25em}}@-webkit-keyframes ellipsis{to{width:1.25em}}.protego-cursor-wait[_ngcontent-%COMP%]{cursor:wait}']}),r})(),data:{title:"protego.menu.reset-password"}}];let B=(()=>{class r{}return r.\u0275fac=function(e){return new(e||r)},r.\u0275mod=o.oAB({type:r}),r.\u0275inj=o.cJS({imports:[[m.Bz.forChild(X)],m.Bz]}),r})(),V=(()=>{class r{}return r.\u0275fac=function(e){return new(e||r)},r.\u0275mod=o.oAB({type:r}),r.\u0275inj=o.cJS({imports:[[u.ez,T.m,B]]}),r})()}}]);