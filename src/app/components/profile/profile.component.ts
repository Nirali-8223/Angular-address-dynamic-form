import { rendererTypeName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userProfileForm!: FormGroup;
  contactList!:FormArray;

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
   this.userProfileForm = this.fb.group({
     name:['',Validators.required],
     organization:[''],
     contacts:this.fb.array([this.createContact()])
   })
   this.contactList = this.userProfileForm.get('contacts') as FormArray
  }

  createContact():FormGroup{
    return this.fb.group({
      type:['email',Validators.compose([Validators.required])],
      contactName:[null,Validators.compose([Validators.required])],
      value:[null,Validators.compose([Validators.required,Validators.email])]
    })
  }

   addContact(){
     this.contactList.push(this.createContact())
   }

   get ContactFormGroup(){
     return this.userProfileForm.get('contacts') as FormArray
   }

   removeContact(index:number){
     this.contactList.removeAt(index)
   }

   changeType(index:number){
     let valid = null;

     if(this.getContactsFormGroup(index).controls.type.value === 'email'){
       valid = Validators.compose([Validators.required,Validators.email])
     } else{
       console.log(';phone')
      valid = Validators.compose([Validators.required,Validators.pattern(new RegExp(/^[0-9()-]+$/))])
     }

     this.getContactsFormGroup(index).controls['value'].setValidators(valid)
    this.getContactsFormGroup(index).controls['value'].updateValueAndValidity();
   }


   getContactsFormGroup(index:number):FormGroup{
     return this.contactList.controls[index] as FormGroup
   }

   submit(){
    console.log(this.userProfileForm.value) 
   }

}
