import { UserRegistration } from "userRegistration";
import { inject } from 'aurelia-framework';
import { ValidationControllerFactory, ValidationController } from 'aurelia-validation';
import {HttpClient, json} from 'aurelia-fetch-client';
import environment from './environment';

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

    alert(environment.authServer);
  
    httpClient.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl(`${environment.authServer}/api/`)
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
