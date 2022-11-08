import '../assets/sdk/apigClient.js'

// import { apigClientFactory } from './assets/js/sdk/apigClient.js'

export class ApiClient {
    apigClient: any
    constructor() {
        this.apigClient = apigClientFactory.newClient({
            'apiKey': 'lDKsJAAppNaQckAJPMiQq9xQ1FyPAKxo4InhThlp'
        });
    }

    initialize() {
        this.apigClient.rootOptions()
    }
    
    uploadPhoto(base64String: string, customLabels: string[]) {
        this.apigClient.photosPut(
            { 'x-amz-meta-customLabels': customLabels,
              'Content-Type': 'image/jpg'
            },
            { base64String },
            {}
         )
         .then((response: any) => {
            console.log('received a response: ', response);
         })
         .catch((error: any) => {
            console.log('an error occurred: ', error);
         })
    
    }
    
    searchPhotos(query: string) {
        this.apigClient.searchGet({ 'q': query }, {}, {})
            .then((response: any) => {
                console.log('received a response: ', response);
            })
            .catch((error: any) => {
                console.log('an error occurred: ', error);
            })
    }
}

