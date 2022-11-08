import '../assets/sdk/apigClient.js'

// import { apigClientFactory } from './assets/js/sdk/apigClient.js'

export interface PhotoInfo {
    url: string
    labels: string[]
}

export class ApiClient {
    apigClient: any
    constructor() {
        this.apigClient = apigClientFactory.newClient({
            'apiKey': 'XCJ9yTtmwz60jAO2pjjdG2wAZfwJAgcx74KQWzpz'
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
    
    async searchPhotos(query: string): Promise<PhotoInfo[]> {
        var results: PhotoInfo[] = []

        try {
            const response = await this.apigClient.searchGet({ 'q': query }, {}, {})
            response.data.results.forEach((result: PhotoInfo) => {
                console.log('Adding result: ', result)
                results.push(result)
            });
        } catch(error: any) {
            console.log('an error occurred: ', error);
        }

        return results
    }
}

