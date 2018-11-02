import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  apiUrl = 'https://jsonplaceholder.typicode.com';
  //herokuUrl = 'https://parse-getting-started-msu.herokuapp.com/parse/classes/GameScore/Xh6sFZ7Ttc';
  herokuUrl = 'https://parse-getting-started-msu.herokuapp.com/parse/functions'; // '/hello';

  constructor(public http: HttpClient) {
  	console.log('Hello RestProvider Provider');
  }

  settings(data) {
    const httpOptions = {
  	  headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'X-Parse-Application-Id': 'myAppId'
      })
    };
  	return new Promise((resolve, reject) => {
		this.http.post(this.herokuUrl + '/settings', '{}', httpOptions)
      		.subscribe(res => {
        resolve(res);
      	}, (err) => {
        	reject(err);
      	});
  	});
  }

	saveSettings(data) {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type':  'application/json',
				'X-Parse-Application-Id': 'myAppId'
			})
		};
		return new Promise((resolve, reject) => {
			this.http.post(this.herokuUrl + '/settings', JSON.stringify(data), httpOptions)
			.subscribe(res => {
				resolve(res);
			}, (err) => {
				reject(err);
			});
		});
	}
}
