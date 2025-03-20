import { Component, OnInit } from '@angular/core';
import { Validators, UntypedFormControl, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth/auth.service';
import { egretAnimations } from 'app/shared/animations/egret-animations';

@Component({
  selector: 'app-signup4',
  templateUrl: './signup4.component.html',
  styleUrls: ['./signup4.component.scss'],
  animations: egretAnimations
})
export class Signup4Component implements OnInit {

  signupForm: UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder,
    private authService:AuthService,
    private router: Router
  ) {}

  ngOnInit() {

    const password = new UntypedFormControl('', Validators.required);

    this.signupForm = this.fb.group(
      {
        name: ["",Validators.required],
        email: ["",[Validators.required,Validators.email]],
        password: password,
        agreed: [false,Validators.required]
      }
    );
  }

  onSubmit() {
    if (!this.signupForm.invalid) {
      this.authService.register(this.signupForm.value).subscribe(res=>{
        if(res.id !=null){
          // this.message.success("Signup successful",  { nzDuration: 5000 });
          this.router.navigateByUrl("/sessions/signin");
        } else{
          // this.message.error(`${res.message}`, { nzDuration: 5000 })
        }
      })
    }
  }
}
