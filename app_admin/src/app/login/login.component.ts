import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], // Imports necessary for form handling and common Angular functionalities
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formError: string = ''; // Error message to be displayed in case of form submission issues
  submitted = false; // Tracks if the form has been submitted
  credentials = { // Holds the credentials entered by the user
    name: '',
    email: '',
    password: ''
  }

  constructor(
    private router: Router, // Router module for navigating between pages
    private authenticationService: AuthenticationService // Service for handling authentication
  ) { }

  ngOnInit(): void {
    // This method is called once the component has been initialized
  }

  // Method to handle form submission when the user clicks the login button
  public onLoginSubmit(): void {
    this.formError = ''; // Clear previous form error
    // Validate if all required fields are filled out
    if (!this.credentials.email || !this.credentials.password || !this.credentials.name) {
      this.formError = 'All fields are required, please try again'; // Set error message
      this.router.navigateByUrl('#'); // Redirects to the login page
    } else {
      this.doLogin(); // Proceed with login if form is valid
    }
  }

  // Method that handles the actual login process
  private doLogin(): void {
    let newUser = {
      name: this.credentials.name,
      email: this.credentials.email
    } as User; // Create a new User object with the credentials provided

    // Call the login method from the AuthenticationService
    this.authenticationService.login(newUser, this.credentials.password);

    // Check if the user is logged in after attempting to log in
    if (this.authenticationService.isLoggedIn()) {
      this.router.navigate(['']); // If logged in, navigate to the home page or dashboard
    } else {
      // If not logged in, set a timeout to check again after 3 seconds
      var timer = setTimeout(() => {
        if (this.authenticationService.isLoggedIn()) {
          this.router.navigate(['']); // If logged in after waiting, navigate to the home page or dashboard
        }
      }, 3000);
    }
  }
}
