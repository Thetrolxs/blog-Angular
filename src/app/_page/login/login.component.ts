import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../_service/login.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;
  submitted = false;
  errorMessages: string[] = [];

  constructor(private FormBuilder: FormBuilder, private router: Router, private loginService: LoginService){}

  ngOnInit(): void {
    this.loginForm = this.FormBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
      })
  }

  get f(){return this.loginForm.controls}

  async onSubmit(){
    this.submitted = true;
    this.errorMessages = [];

    if(this.loginForm.invalid) {return}

    try{
      const data = await this.loginService.login(this.loginForm);
      if(data && data.token){
        this.router.navigate([''])
      }
    }
    catch (err: any){
      this.errorMessages.push("El correo eletronico o la contraseña son incorrectas");
    }
  }
}
