
/* * * ./app/comments/services/comment.service.ts * * */
// Imports
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod, RequestOptionsArgs, BaseRequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { File } from './app.model';

@Injectable()
export class FilesService {
    // Resolve HTTP using the constructor


    private headers: Headers;
    private FilesUrl = 'https://partner.gotparking.com/gotparking-api/v1.0/';
    private makeURL;
    private newoptions;
    private token;
    // currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // if(currentUser){
    //     this.token = this.currentUser.token; // your token
    // }
    constructor(private _http: Http) {
        // this.headers = new Headers();
        // this.headers.append('Content-Type', 'application/json');
        // this.headers.append('Accept', 'application/json');
        //  this.headers.append('Authorization', 'token 1b05af30e860c0aeb9577312ced54ba6d84a59cd')
        // this.newoptions = new RequestOptions({ headers: this.headers }); // Create a request option
    }
    // private instance variable to hold base url
    public GetAll = (path?: string, options?: any): Observable<File[]> => {
        this.makeURL = this.FilesUrl + path;
        if (options) {
            this.makeURL = this.makeURL + '?' + options;
        }
        let THEheaders = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        THEheaders.append('withCredentials', 'true');
        THEheaders.append("Access-Control-Allow-Credentials", "true");
        THEheaders.append('Authorization', 'token 1b05af30e860c0aeb9577312ced54ba6d84a59cd');
        let theoptions = new RequestOptions({ headers: THEheaders }); // Create a request option        
        return this._http.get(this.makeURL, theoptions)
            .map((response: Response) => <File[]>response.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    // End point to call specific date data        
    public PostData = (path?: string, data?: object): Observable<File[]> => {
        console.log(path);
        this.makeURL = this.FilesUrl + path;
        let bodyString = JSON.stringify(data); // Stringify payload
        let THEheaders = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let theoptions = new RequestOptions({ headers: THEheaders }); // Create a request option
        // if (options) {
        //     this.makeURL = this.makeURL + '?' + options;
        // }
        return this._http.post(this.makeURL, data, theoptions) // ...using post request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }
    public Delete = (filename: string): Observable<File[]> => {
        console.log(filename);
        return this._http.delete(`${this.FilesUrl}:${filename}`)
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    public Update = (path?: string, data?: object): Observable<File[]> => {
        console.log(path);
        this.makeURL = this.FilesUrl + path;
        let bodyString = JSON.stringify(data); // Stringify payload
        let THEheaders = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let theoptions = new RequestOptions({ headers: THEheaders }); // Create a request option
        // if (options) {
        //     this.makeURL = this.makeURL + '?' + options;
        // }
        return this._http.put(this.makeURL, data, theoptions) // ...using post request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }

    // public Update = (filename: string, newfilename: string, bodyy): Observable<File[]> => {
    //     console.log(newfilename);
    //     console.log(filename);
    //     let body = JSON.stringify(bodyy);
    //     return this._http.put(`${this.FilesUrl}:${filename}:${newfilename}`, body).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    // }

}

