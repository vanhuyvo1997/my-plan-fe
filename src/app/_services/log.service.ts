import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  public write(message: string){
    console.log(`LogService-----: ${message}`);
  }
  constructor() { }
}
