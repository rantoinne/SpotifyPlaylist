/* eslint-disable no-async-promise-executor */
const DEV = true;

class Request {
  apiUrl: string;

  authToken = '';

  requestTimeoutInMs = 20000;

  delayInMs = 100 + Math.round(Math.random() * 1000);

  constructor(apiUrl: string, authToken?: string) {
    this.apiUrl = apiUrl;
    if (authToken) this.authToken = authToken;
  }

  requestTimeout(url: string) {
    return new Promise((res, rej) => {
      setTimeout(() => {
        rej(new Error(`Request timed out. url:${url}`));
      }, this.requestTimeoutInMs);
    });
  }

  async sendRequest(
    url: string,
    body: any,
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    contentType = 'application/json',
  ) {
    const request = new Promise<any>(async (resolve, reject) => {
      try {
        let calledUrl = null;
        const contentIsNotJson = contentType !== 'application/json';

        if (url.includes('mocky')) {
          calledUrl = `${url}`;
        } else {
          calledUrl = `${this.apiUrl}${url}`;
        }

        // simulate remote server's delayed response in dev mode
        if (DEV) await this.delay();

        const reqBody = {
          method,
          headers: this.getRequestHeaders(contentType),
        } as any;
        if (body) reqBody.body = contentIsNotJson ? body : JSON.stringify(body);

        let response;

        if (method === 'GET') {
          response = await fetch(`${calledUrl}`, { method, headers: this.getRequestHeaders() });
        } else response = await fetch(`${calledUrl}`, reqBody);

        resolve(await Request.responseParser(response));
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log('request API error: ', e);
        reject(e);
      }
    });

    return Promise.race([this.requestTimeout(url), request]);
  }

  async delay() {
    return new Promise<void>(resolve => {
      setTimeout(() => {
        resolve();
      }, this.delayInMs);
    });
  }

  async get(url: string) {
    return this.sendRequest(url, {}, 'GET');
  }

  async post(url: string, obj: object | string = {}, contentType = 'application/json') {
    return this.sendRequest(url, obj, 'POST', contentType);
  }

  async put(url: string, obj: object = {}) {
    return this.sendRequest(url, obj, 'PUT');
  }

  async patch(url: string, obj: object = {}) {
    return this.sendRequest(url, obj, 'PATCH');
  }

  async delete(url: string, obj: object = {}) {
    return this.sendRequest(url, obj, 'DELETE');
  }

  isAuthenticated(): boolean {
    return this.authToken !== '';
  }

  static async responseParser(response: any) {
    let jsonResponse: any = {};
    const contentType = response.headers.get('Content-Type');
    if (contentType) {
      jsonResponse = await response.json();
    }
    return jsonResponse;
  }

  getRequestHeaders(contentType = 'application/json') {
    return {
      Accept: 'application/json',
      'Content-Type': contentType,
      Authorization: this.authToken,
    };
  }

  static objToQueryString(obj: object) {
    const keyValuePairs = [];
    for (let i = 0; i < Object.keys(obj).length; i += 1) {
      const param = Object.keys(obj)[i];
      const value = Object.values(obj)[i];

      if (value) keyValuePairs.push(`${encodeURIComponent(param)}=${encodeURIComponent(value)}`);
    }
    return keyValuePairs.join('&');
  }
}

export default Request;
