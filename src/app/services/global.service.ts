import { Injectable } from '@angular/core';

@Injectable()
export class GlobalService {

  public api_url: any;
  public backend_url: any;

  constructor() { 
    this.api_url = 'http://localhost:8080/api/v1/';
    this.backend_url = 'http://localhost:8080/';
  }

}
