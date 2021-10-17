import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createaccount',
  templateUrl: './createaccount.component.html',
  styleUrls: ['./createaccount.component.css'],
  providers:[AuthService]
})
export class CreateaccountComponent implements OnInit {

  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  

  constructor(private authSvc:AuthService,private router:Router) { }

  ngOnInit(): void {
  }


  async onRegister(){
    const {email,password} = this.registerForm.value;
    try{
      const user = await this.authSvc.register(email,password);
      if(user!==null){
        this.router.navigate(['/verification-email']);
        //aqui
      }
    }
    catch(error){
      console.log(error);
    }
    
    
  }

}
