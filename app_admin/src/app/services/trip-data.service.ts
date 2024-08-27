import { Inject, Injectable } from '@angular/core'; // Added Inject to the import statement
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Trip } from '../models/trip';
import { User } from '../models/user'; // Added import for User model
import { AuthResponse } from '../models/auth-response'; // Added import for AuthResponse model
import { BROWSER_STORAGE } from '../storage'; // Added import for BROWSER_STORAGE

@Injectable({
  providedIn: 'root'
})
export class TripDataService {

  // Injected Local Storage provider
  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage // Added injection for BROWSER_STORAGE
  ) { }

  // Added baseUrl for the API
  baseUrl = 'http://localhost:3000/api';

  // Existing methods
  url = this.baseUrl + '/trips'; // Updated the trips URL to use baseUrl

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.url);
  }

  addTrip(formData: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.url, formData);
  }

  getTrip(tripCode: string): Observable<Trip[]> {
    // console.log("Inside TripDataService::getTrips")
    return this.http.get<Trip[]>(this.url + '/' + tripCode);
  }

  updateTrip(formData: Trip): Observable<Trip> {
    // console.log("Inside TripDataService::updateTrips")
    return this.http.put<Trip>(this.url + '/' + formData.code, formData);
  }

  // Added login method
  login(user: User, passwd: string): Observable<AuthResponse> {
    // console.log('Inside TripDataService::login');
    return this.handleAuthAPICall('login', user, passwd);
  }

  // Added register method
  register(user: User, passwd: string): Observable<AuthResponse> {
    // console.log('Inside TripDataService::register');
    return this.handleAuthAPICall('register', user, passwd);
  }

  // Added helper method to process both login and register methods
  private handleAuthAPICall(endpoint: string, user: User, passwd: string): Observable<AuthResponse> {
    // console.log('Inside TripDataService::handleAuthAPICall');
    let formData = {
      name: user.name,
      email: user.email,
      password: passwd
    };
    return this.http.post<AuthResponse>(this.baseUrl + '/' + endpoint, formData);
  }
}
