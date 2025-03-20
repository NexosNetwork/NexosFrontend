import { ErrorStateMatcher } from '@angular/material/core';
import { Validators, UntypedFormGroup, NgForm, FormGroupDirective, UntypedFormControl, AbstractControl, ValidationErrors } from "@angular/forms";
import { UntypedFormBuilder } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { AuthService } from 'app/services/auth/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: "app-signup2",
  templateUrl: "./signup2.component.html",
  styleUrls: ["./signup2.component.scss"]
})
export class Signup2Component implements OnInit {
  signupForm: UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder,
     private authService:AuthService,
        private router: Router,
        private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {

    const password = new UntypedFormControl('', Validators.required);

    this.signupForm = this.fb.group(
      {

        name: ["",Validators.required],
        email: ["",[Validators.required,Validators.email]],
        password: password,
      }
    );
  }

  onSubmit() {
    if (!this.signupForm.invalid) {
      this.authService.register(this.signupForm.value).subscribe(res=>{
        if(res.id !=null){
          this.snackBar.open('Signup successful', 'Close', {
            duration: 5000,
            panelClass: ['success-snackbar'] // optional: use this for custom styling
          });
          this.router.navigateByUrl("/sessions/signin");
        } else{
          // this.message.error(`${res.message}`, { nzDuration: 5000 })
          this.snackBar.open("Something Went Wrong.", 'Close', {
            duration: 5000,
            panelClass: ['error-snackbar'] // optional: use this for custom styling
          });
        }
      }, error=>{
        this.snackBar.open(error.error, 'Close', {
          duration: 5000,
          panelClass: ['error-snackbar'] // optional: use this for custom styling
        });
      })
    }
  }
}