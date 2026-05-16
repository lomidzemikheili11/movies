import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';
import { Header } from '../header/header';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Header, RouterLink, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService, // სერვისი ბექენდთან დასაკავშირებლად
    private router: Router             // როუტერი ლოგინზე გადასაყვანად
  ) { }

  ngOnInit(): void {
    // ვქმნით ფორმას ზუსტად იმ 10 ველით, რასაც Everrest API ითხოვს
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.min(1)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      zipcode: ['', [Validators.required]],
      avatar: ['', [Validators.required]],
      gender: ['', [Validators.required]] // "MALE" ან "FEMALE"
    }, {
      // ვადებთ პაროლების შედარების ვალიდატორს მთლიან ფორმაზე
      validators: this.passwordMatchValidator
    });
  }

  // სპეციალური ვალიდატორი პაროლების შესადარებლად
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      // თუ არ ემთხვევა, confirmPassword ველს ვადებთ შეცდომას 'passwordMismatch'
      control.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { confirmPassword, ...submitData } = this.registerForm.value;

      let formattedPhone = submitData.phone.toString().trim();
      if (formattedPhone.startsWith('5') && formattedPhone.length === 9) {
        formattedPhone = `+995${formattedPhone}`;
      }

      const finalData = {
        ...submitData,
        age: Number(submitData.age),
        gender: submitData.gender.toUpperCase(),
        phone: formattedPhone
      };

      // 🚀 აი აქ, რექვესთის გაგზავნამდე, ეგრევე ვინახავთ სახელს და ავატარს ლოკალურად
      const localUser = {
        firstName: finalData.firstName,
        avatar: finalData.avatar
      };
      localStorage.setItem('user', JSON.stringify(localUser));

      this.authService.register(finalData).subscribe({
        next: (response) => {
          alert('Registration Successful! Redirecting to login...');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('ბექენდის ერორის დეტალები:', err.error);

          // თუ რეგისტრაცია ჩავარდა, ვშლით დროებით შენახულ იუზერს
          localStorage.removeItem('user');

          const errorKeys = err.error?.errorKeys || [];

          if (errorKeys.includes('errors.invalid_phone_number')) {
            alert('გთხოვთ, ჩაწეროთ სწორი ტელეფონის ნომერი!');
          } else if (errorKeys.includes('errors.email_in_use')) {
            alert('ეს ელ-ფოსტა უკვე დაკავებულია, გამოიყენეთ სხვა!');
          } else if (err.error?.message?.includes('email') || errorKeys.some((k: string) => k.includes('email'))) {
            alert('გთხოვთ, ჩაწეროთ სწორი ელ-ფოსტის მისამართი!');
          } else {
            alert('რეგისტრაცია ვერ მოხერხდა, გადაამოწმეთ ველები!');
          }
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
