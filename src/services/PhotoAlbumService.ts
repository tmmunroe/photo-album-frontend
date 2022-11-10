
import { apigClientFactory } from "./aws-apigateway/apigClient.js";
import { v4 as uuidv4 } from "uuid"

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
    

    async uploadPhoto(base64String: string, contentType:string, customLabels: string[]) {
        console.log("uploading contentType: ", contentType)
        console.log("uploading custom labels: ", customLabels)
        console.log("uploading base64 image: ", base64String)
        
        const uuid = uuidv4()
        const body = base64String
        const headers = { 
            'x-amz-meta-customLabels': customLabels, 
            'Content-Type': `'${contentType}'`,
            'object-key': `${uuid}.jpg`
        }

        try {
            const response = await this.apigClient.photosPut(headers, body, {})
            console.log('received response: ', response);
        } catch(error: any) {
            console.log("an error occured: ", error)
        }
    }

    
    async searchPhotos(query: string): Promise<string[]> {
        var results: string[] = []
        console.log('searching photos for: ', query);

        try {
            const response = await this.apigClient.searchGet({ 'q': query }, {}, {})
            console.log('received response: ', response);
            response.data.results.forEach((result: string) => {
                console.log('Adding result: ', result)
                results.push(result)
            });
        } catch(error: any) {
            console.log('an error occurred: ', error);
        }

        return results
    }
}

