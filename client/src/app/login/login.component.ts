import { Component , OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageLoaderService } from '../image-loader.service';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  logoUrl: string = '';

  constructor(private formBuilder: FormBuilder,private imageLoader: ImageLoaderService, private authService: AuthService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  
  ngOnInit(): void {
    this.loadLogo();
  }
  loadLogo() {
    const logoUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOUB5kxGbdsk2jUMN89LM8iPJAB1w1UOqvTQ&s';
    this.imageLoader.loadImage(logoUrl).subscribe((blob: Blob) => {
      this.logoUrl = URL.createObjectURL(blob);
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      this.authService.login(loginData).subscribe(
        response => {
          const token = response.data.token;
          if (token) {
            this.authService.storeToken(token);
            alert('Login exitoso');
            alert("Respuesta de servidor: " + response.message + " Token guardado en local storage")
          }
        },
        error => {
          alert('Login fallido');
          console.log(JSON.stringify(error));
        }
      );
    }
  }
  
  }
  
  


