import request from 'request';

export class ServiceWrapper {

    public serviceName: string;
    constructor(name) {
        this.init(name);
    }
    private url: string = 'https://venus.apogeehost.com/~clarqspa/service';
    public creds: any;
    public init(name: string) {
        this.serviceName = name;

        this.creds = {
            ai_login_id: 'clar8ty_greystar',
            ai_login_password: 'jOupkAkg-qspa',
            ai_command: null
        }
    }

    public callApi(command: string, options: any, type:string) {

        this.creds.ai_command = command;
        options.url = this.url;
        if (type === 'form') {
            options.form = this.creds;
        } else {
            options.data = this.creds;
        }

        const prom = new Promise((resolve, reject) => {
            request(options, (err, response, body) => {
                if (response) {
                    switch (response.statusCode) {
                        case 200:
                            resolve(body);
                            break;
                        default:
                            reject(err);
                            break;
                    }
                }
                else {
                    reject(err);
                }
            });
        });

        return prom;
    }
}
