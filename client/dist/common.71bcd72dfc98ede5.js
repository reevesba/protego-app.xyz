"use strict";(self.webpackChunkprotego=self.webpackChunkprotego||[]).push([[592],{7182:(s,c,e)=>{e.d(c,{n:()=>l});class l{constructor(o){Object.assign(this,o)}}},5980:(s,c,e)=>{e.d(c,{y:()=>A});var l=e(3075),_=e(8966),o=e(5e3),g=e(9808),u=e(7322),m=e(7531),p=e(5245),f=e(7423),d=e(4894);function x(a,r){1&a&&(o.TgZ(0,"mat-error")(1,"mat-icon",10),o._uU(2,"error_outline"),o.qZA(),o._uU(3),o.ALo(4,"translate"),o.qZA()),2&a&&(o.xp6(3),o.hij(" ",o.lcZ(4,1,"protego.dialog-box1.info2")," "))}function D(a,r){if(1&a){const t=o.EpF();o.TgZ(0,"mat-form-field")(1,"input",9),o.NdJ("keyup",function(i){return o.CHM(t),o.oxw().updateField1(i)}),o.qZA(),o.YNc(2,x,5,3,"mat-error",4),o.qZA()}if(2&a){const t=o.oxw();o.xp6(1),o.Q6J("placeholder",t.label1),o.xp6(1),o.Q6J("ngIf",(t.formControl.value1.touched||t.submitted)&&(null==t.formControl.value1.errors?null:t.formControl.value1.errors.required))}}function h(a,r){1&a&&(o.TgZ(0,"mat-error")(1,"mat-icon",10),o._uU(2,"error_outline"),o.qZA(),o._uU(3),o.ALo(4,"translate"),o.qZA()),2&a&&(o.xp6(3),o.hij(" ",o.lcZ(4,1,"protego.dialog-box1.info3")," "))}function C(a,r){if(1&a){const t=o.EpF();o.TgZ(0,"mat-form-field")(1,"input",11),o.NdJ("keyup",function(i){return o.CHM(t),o.oxw().updateField2(i)}),o.qZA(),o.YNc(2,h,5,3,"mat-error",4),o.qZA()}if(2&a){const t=o.oxw();o.xp6(1),o.Q6J("placeholder",t.label2),o.xp6(1),o.Q6J("ngIf",(t.formControl.value2.touched||t.submitted)&&(null==t.formControl.value2.errors?null:t.formControl.value2.errors.required))}}function v(a,r){if(1&a&&(o.TgZ(0,"b",12),o._uU(1),o.ALo(2,"translate"),o.qZA(),o._uU(3),o.ALo(4,"translate"),o.TgZ(5,"b"),o._uU(6),o.qZA(),o._uU(7),o.ALo(8,"translate")),2&a){const t=o.oxw();o.xp6(1),o.hij("",o.lcZ(2,4,"protego.dialog-box1.info4"),":"),o.xp6(2),o.hij(" ",o.lcZ(4,6,"protego.dialog-box1.info5")," "),o.xp6(3),o.Oqu(t.localData.value1),o.xp6(1),o.hij(". ",o.lcZ(8,8,"protego.dialog-box1.info6"),". ")}}let A=(()=>{class a{constructor(t,n,i){this.dialogRef=t,this.fb=n,this.data=i,this.submitted=!1,this.localData=Object.assign({},i),this.label1=this.localData.label1,this.label2=this.localData.label2,this.action=this.localData.action}ngOnInit(){this.fg=this.fb.group({value1:["",[l.kI.required]],value2:["",l.kI.required]}),this.fg.patchValue({value1:this.localData.value1,value2:this.localData.value2})}get formControl(){return this.fg.controls}updateField1(t){this.localData.value1=t.target.value}updateField2(t){this.localData.value2=t.target.value}doAction(){this.fg.valid&&this.dialogRef.close({event:this.action,data:this.localData})}closeDialog(){this.dialogRef.close({event:"Cancel"})}}return a.\u0275fac=function(t){return new(t||a)(o.Y36(_.so),o.Y36(l.qu),o.Y36(_.WI,8))},a.\u0275cmp=o.Xpm({type:a,selectors:[["dialog-box"]],decls:16,vars:13,consts:[["mat-dialog-title",""],["mat-dialog-content",""],[1,"form",3,"formGroup"],[4,"ngIf","ngIfElse"],[4,"ngIf"],["elseTemplate",""],["mat-dialog-actions","",1,"protego-actions"],["mat-raised-button","","color","warn","attr.aria-label","do action",3,"disabled","click"],["mat-raised-button","","attr.aria-label","save",3,"click"],["matInput","","formControlName","value1","required","",3,"placeholder","keyup"],[1,"protego-icon"],["matInput","","formControlName","value2","required","",3,"placeholder","keyup"],[1,"protego-warning"]],template:function(t,n){if(1&t&&(o.TgZ(0,"h1",0)(1,"strong"),o._uU(2),o.ALo(3,"translate"),o.qZA()(),o.TgZ(4,"div",1)(5,"form",2),o.YNc(6,D,3,2,"mat-form-field",3),o.YNc(7,C,3,2,"mat-form-field",4),o.qZA(),o.YNc(8,v,9,10,"ng-template",null,5,o.W1O),o.qZA(),o.TgZ(10,"div",6)(11,"button",7),o.NdJ("click",function(){return n.doAction()}),o._uU(12),o.qZA(),o.TgZ(13,"button",8),o.NdJ("click",function(){return n.closeDialog()}),o._uU(14),o.ALo(15,"translate"),o.qZA()()),2&t){const i=o.MAs(9);o.xp6(2),o.AsE("",n.action," ",o.lcZ(3,9,"protego.dialog-box1.info1"),""),o.xp6(3),o.Q6J("formGroup",n.fg),o.xp6(1),o.Q6J("ngIf","Delete"!=n.action)("ngIfElse",i),o.xp6(1),o.Q6J("ngIf","Delete"!=n.action),o.xp6(4),o.Q6J("disabled",!n.fg.valid),o.xp6(1),o.Oqu(n.action),o.xp6(2),o.Oqu(o.lcZ(15,11,"protego.dialog-box1.info7"))}},directives:[_.uh,_.xY,l._Y,l.JL,l.sg,g.O5,u.KE,m.Nt,l.Fj,l.JJ,l.u,l.Q7,u.TO,p.Hw,_.H8,f.lW],pipes:[d.X$],styles:["mat-form-field[_ngcontent-%COMP%]{width:90%;margin:10px}.protego-icon[_ngcontent-%COMP%]{margin-right:2px}.protego-warning[_ngcontent-%COMP%]{color:red;font-style:italic}.protego-actions[_ngcontent-%COMP%]{margin-top:1em}"]}),a})()}}]);