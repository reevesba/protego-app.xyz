"use strict";(self.webpackChunkprotego=self.webpackChunkprotego||[]).push([[441],{441:(F,r,o)=>{o.r(r),o.d(r,{SettingsModule:()=>N});var g=o(9808),h=o(406),m=o(1402),p=o(5620),f=o(6275),s=o(5),_=o(8606),t=o(5e3),Z=o(5245),x=o(9444),d=o(7322),C=o(4107),u=o(3075),v=o(508),T=o(2368),A=o(7238),S=o(4894);function M(n,i){if(1&n&&(t.TgZ(0,"mat-option",21),t._uU(1),t.qZA()),2&n){const e=i.$implicit,a=t.oxw().$implicit;t.Q6J("value",a.value)("title",e!==a.label?e:""),t.xp6(1),t.hij(" ",a.label," ")}}const E=function(n){return[n]};function J(n,i){if(1&n&&(t.ynx(0),t.YNc(1,M,2,3,"mat-option",20),t.ALo(2,"translate"),t.BQk()),2&n){const e=i.$implicit;t.xp6(1),t.Q6J("ngForOf",t.VKq(3,E,t.lcZ(2,1,"protego.settings.general.language."+e.value)))}}function O(n,i){if(1&n&&(t.TgZ(0,"mat-option",22),t._uU(1),t.ALo(2,"translate"),t.qZA()),2&n){const e=i.$implicit;t.Q6J("value",e.value),t.xp6(1),t.hij(" ",t.lcZ(2,2,"protego.settings.themes."+e.label)," ")}}function U(n,i){1&n&&t._UZ(0,"mat-slide-toggle",23)}function y(n,i){if(1&n){const e=t.EpF();t.TgZ(0,"mat-slide-toggle",11),t.NdJ("change",function(l){return t.CHM(e),t.oxw(2).onPageAnimationsToggle(l)}),t.qZA()}if(2&n){const e=t.oxw().ngIf;t.Q6J("checked",e.pageAnimations)}}function Q(n,i){if(1&n){const e=t.EpF();t.ynx(0),t.TgZ(1,"div",1)(2,"div",4)(3,"h2"),t._uU(4),t.ALo(5,"translate"),t.qZA(),t.TgZ(6,"div",5)(7,"mat-icon",6),t._UZ(8,"fa-icon",7),t.qZA(),t.TgZ(9,"mat-form-field")(10,"mat-select",8),t.NdJ("selectionChange",function(l){return t.CHM(e),t.oxw().onLanguageSelect(l)}),t.ALo(11,"translate"),t.YNc(12,J,3,5,"ng-container",9),t.qZA()()(),t.TgZ(13,"div",5)(14,"mat-icon",6),t._UZ(15,"fa-icon",10),t.qZA(),t.TgZ(16,"mat-placeholder"),t._uU(17),t.ALo(18,"translate"),t.qZA(),t.TgZ(19,"mat-slide-toggle",11),t.NdJ("change",function(l){return t.CHM(e),t.oxw().onStickyHeaderToggle(l)}),t.qZA()()()(),t.TgZ(20,"div",1)(21,"div",4)(22,"h2"),t._uU(23),t.ALo(24,"translate"),t.qZA(),t.TgZ(25,"div",5)(26,"mat-icon",6),t._UZ(27,"fa-icon",12),t.qZA(),t.TgZ(28,"mat-form-field")(29,"mat-select",13),t.NdJ("selectionChange",function(l){return t.CHM(e),t.oxw().onThemeSelect(l)}),t.ALo(30,"translate"),t.YNc(31,O,3,4,"mat-option",14),t.qZA()()(),t.TgZ(32,"div",5)(33,"mat-icon",6),t._UZ(34,"fa-icon",15),t.qZA(),t.TgZ(35,"mat-placeholder"),t._uU(36),t.ALo(37,"translate"),t.qZA(),t.TgZ(38,"mat-slide-toggle",11),t.NdJ("change",function(l){return t.CHM(e),t.oxw().onAutoNightModeToggle(l)}),t.qZA()()(),t.TgZ(39,"div",4)(40,"h2"),t._uU(41),t.ALo(42,"translate"),t.qZA(),t.TgZ(43,"div",5)(44,"mat-icon",6)(45,"mat-icon",6),t._UZ(46,"fa-icon",16),t.qZA()(),t.TgZ(47,"mat-placeholder"),t._uU(48),t.ALo(49,"translate"),t.qZA(),t.YNc(50,U,1,0,"mat-slide-toggle",17),t.YNc(51,y,1,1,"mat-slide-toggle",18),t.qZA(),t.TgZ(52,"div",5)(53,"mat-icon",6),t._UZ(54,"fa-icon",19),t.qZA(),t.TgZ(55,"mat-placeholder"),t._uU(56),t.ALo(57,"translate"),t.qZA(),t.TgZ(58,"mat-slide-toggle",11),t.NdJ("change",function(l){return t.CHM(e),t.oxw().onElementsAnimationsToggle(l)}),t.qZA()()()(),t.BQk()}if(2&n){const e=i.ngIf,a=t.oxw();t.xp6(2),t.Q6J("ngClass",a.routeAnimationsElements),t.xp6(2),t.Oqu(t.lcZ(5,21,"protego.settings.general.title")),t.xp6(6),t.Q6J("placeholder",t.lcZ(11,23,"protego.settings.general.placeholder"))("ngModel",e.language),t.xp6(2),t.Q6J("ngForOf",a.languages),t.xp6(5),t.hij("",t.lcZ(18,25,"protego.settings.themes.sticky-header")," "),t.xp6(2),t.Q6J("checked",e.stickyHeader),t.xp6(2),t.Q6J("ngClass",a.routeAnimationsElements),t.xp6(2),t.Oqu(t.lcZ(24,27,"protego.settings.themes.title")),t.xp6(6),t.Q6J("placeholder",t.lcZ(30,29,"protego.settings.themes.placeholder"))("ngModel",e.theme),t.xp6(2),t.Q6J("ngForOf",a.themes),t.xp6(5),t.hij("",t.lcZ(37,31,"protego.settings.themes.night-mode")," "),t.xp6(2),t.Q6J("checked",e.autoNightMode),t.xp6(1),t.Q6J("ngClass",a.routeAnimationsElements),t.xp6(2),t.Oqu(t.lcZ(42,33,"protego.settings.animations.title")),t.xp6(7),t.hij("",t.lcZ(49,35,"protego.settings.animations.page")," "),t.xp6(2),t.Q6J("ngIf",e.pageAnimationsDisabled),t.xp6(1),t.Q6J("ngIf",!e.pageAnimationsDisabled),t.xp6(5),t.hij("",t.lcZ(57,37,"protego.settings.animations.elements")," "),t.xp6(2),t.Q6J("checked",e.elementsAnimations)}}const L=[{path:"",component:(()=>{class n{constructor(e){this.store=e,this.routeAnimationsElements=f.rd,this.themes=[{value:"DEFAULT-THEME",label:"blue"},{value:"LIGHT-THEME",label:"light"},{value:"NATURE-THEME",label:"nature"},{value:"DARK-THEME",label:"dark"},{value:"WILDCAT-THEME",label:"wildcat"}],this.languages=[{value:"en",label:"English"},{value:"de",label:"Deutsch"},{value:"sk",label:"Sloven\u010dina"},{value:"fr",label:"Fran\xe7ais"},{value:"es",label:"Espa\xf1ol"},{value:"pt-br",label:"Portugu\xeas"},{value:"zh",label:"\u7b80\u4f53\u4e2d\u6587"}]}ngOnInit(){this.settings$=this.store.pipe((0,p.Ys)(_.vi))}onLanguageSelect({value:e}){this.store.dispatch((0,s.tH)({language:e}))}onThemeSelect({value:e}){this.store.dispatch((0,s.qA)({theme:e}))}onAutoNightModeToggle({checked:e}){this.store.dispatch((0,s.E3)({autoNightMode:e}))}onStickyHeaderToggle({checked:e}){this.store.dispatch((0,s.ZV)({stickyHeader:e}))}onPageAnimationsToggle({checked:e}){this.store.dispatch((0,s.oI)({pageAnimations:e}))}onElementsAnimationsToggle({checked:e}){this.store.dispatch((0,s.TO)({elementsAnimations:e}))}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(p.yh))},n.\u0275cmp=t.Xpm({type:n,selectors:[["protego-settings"]],decls:9,vars:6,consts:[[1,"container"],[1,"row"],[1,"col-sm-12"],[4,"ngIf"],[1,"col-md-6","group",3,"ngClass"],[1,"icon-form-field"],["color","accent"],["icon","language","color","accent"],["name","language",3,"placeholder","ngModel","selectionChange"],[4,"ngFor","ngForOf"],["icon","bars","color","accent"],[3,"checked","change"],["icon","paint-brush","color","accent"],["name","themes",3,"placeholder","ngModel","selectionChange"],[3,"value",4,"ngFor","ngForOf"],["icon","lightbulb","color","accent"],["icon","window-maximize"],["matTooltip","Sorry, this feature is disabled in IE, EDGE and Safari","matTooltipPosition","before","disabled","",4,"ngIf"],[3,"checked","change",4,"ngIf"],["icon","stream","color","accent"],[3,"value","title",4,"ngFor","ngForOf"],[3,"value","title"],[3,"value"],["matTooltip","Sorry, this feature is disabled in IE, EDGE and Safari","matTooltipPosition","before","disabled",""]],template:function(e,a){1&e&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"h1"),t._uU(4),t.ALo(5,"translate"),t.qZA()()(),t._UZ(6,"br"),t.YNc(7,Q,59,39,"ng-container",3),t.ALo(8,"async"),t.qZA()),2&e&&(t.xp6(4),t.Oqu(t.lcZ(5,2,"protego.settings.title")),t.xp6(3),t.Q6J("ngIf",t.lcZ(8,4,a.settings$)))},directives:[g.O5,g.mk,Z.Hw,x.BN,d.KE,C.gD,u.JJ,u.On,g.sg,v.ey,d.UY,T.Rr,A.gM],pipes:[S.X$,g.Ov],styles:[".container[_ngcontent-%COMP%]{margin-top:20px}h1[_ngcontent-%COMP%]{margin:0 0 20px;text-transform:uppercase}h2[_ngcontent-%COMP%]{margin:0 0 10px;text-transform:uppercase}.group[_ngcontent-%COMP%]{margin:0 0 40px}.icon-form-field[_ngcontent-%COMP%]{position:relative;display:flex;height:65.5px;align-items:center}.icon-form-field[_ngcontent-%COMP%]   mat-placeholder[_ngcontent-%COMP%]{flex:2 1 auto}mat-icon[_ngcontent-%COMP%]{margin:0 6px 6px 0;font-size:20px}mat-form-field[_ngcontent-%COMP%]{flex:1 0 auto}"],changeDetection:0}),n})(),data:{title:"protego.menu.settings"}}];let H=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[[m.Bz.forChild(L)],m.Bz]}),n})(),N=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[[g.ez,h.m,H]]}),n})()}}]);