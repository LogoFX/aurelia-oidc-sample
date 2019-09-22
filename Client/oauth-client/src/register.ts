import { UserRegistration } from "userRegistration";
import { inject } from 'aurelia-framework';
import { ValidationControllerFactory, ValidationRules, ValidationController } from 'aurelia-validation';
import {HttpClient, json} from 'aurelia-fetch-client';

@inject(ValidationControllerFactory)
export class Register { 
  
  success: boolean;
  error: string;
  userRegistration: UserRegistration = { name: '', email: '', password: ''};
  submitted: boolean = false;
  controller: ValidationController;

  constructor(controllerFactory: ValidationControllerFactory) {
    this.controller = controllerFactory.createForCurrentScope();
  }

  onSubmit() {

    let httpClient = new HttpClient();
  
    httpClient.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('http://localhost:5000/api/')
        .withDefaults({
          headers: {
            'X-Requested-With': 'Fetch'
          }
        })
        .withInterceptor({
        });
    });
    
    httpClient
      .fetch('account', {
        method: 'post',
        body: json(this.userRegistration)
      })
      .then(response => {
        this.success = response.ok
      })
      .catch(error => {
        this.error = error;
      });
  }
}
