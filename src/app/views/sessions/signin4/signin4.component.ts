import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, UntypedFormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth/auth.service';
import { UserStorageService } from 'app/services/storage/user-storage.service';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';


@Component({
  selector: 'app-signin4',
  templateUrl: './signin4.component.html',
  styleUrls: ['./signin4.component.scss'],
  animations: egretAnimations
})
export class Signin4Component implements OnInit {

  signupForm: UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder,
    private authService: AuthService,
    private router: Router,
     private jwtAuth: JwtAuthService,
  ) {}

  ngOnInit() {

    const password = new UntypedFormControl('', Validators.required);

    this.signupForm = this.fb.group(
      {
        email: ["",[Validators.required,Validators.email]],
        password: password,
        agreed: [false,Validators.required]
      }
    );
  }

  // onSubmit() {
  //   if (!this.signupForm.invalid) {
  //     // do what you wnat with your data
  //     console.log(this.signupForm.value);
  //   }
  // }

  onSubmit(){
    if (!this.signupForm.invalid) {
    this.authService.login(this.signupForm.value).subscribe(res=>{
      console.log(res);
      if(res.userId != null){
        const user = {
          id: res.userId,
          role: res.userRole,
          name: res.name
        }
        this.jwtAuth.setUserAndToken(res.jwt, user, true);

        console.log("UserStorageService.isCustomerLoggedIn()",UserStorageService.isAdminLoggedIn())
        if(UserStorageService.isAdminLoggedIn()){
          this.router.navigateByUrl('/admin/dashboard');
        }else if(UserStorageService.isCustomerLoggedIn()){
          this.router.navigateByUrl('/dashboard/stores');
        }
      }
    }, error=>{
      // this.message
      // .error(
      //   `Bad credentials`,
      //   { nzDuration: 5000 }
      // )
    })
  }
}

}
