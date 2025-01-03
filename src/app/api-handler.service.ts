import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiHandlerService {
  baseUrl: string = 'http://localhost:3000';

  constructor() {}

  public async post(endpoint: string, data: any, headers: Record<string, string> = {}): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw await this.handleError(response);
      }
  
      return response.json();
    } catch (error) {
      console.error('Error during POST request:', error);
      throw error;
    }
  }
  

  public async get(endpoint: string): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/${endpoint}`);

      if (!response.ok) {
        throw await this.handleError(response);
      }

      return response.json();
    } catch (error) {
      console.error('Error during GET request:', error);
      throw error;
    }
  }

  public async put(endpoint: string, data: any): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw await this.handleError(response);
      }

      return response.json();
    } catch (error) {
      console.error('Error during PUT request:', error);
      throw error;
    }
  }

  public async delete(endpoint: string): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/${endpoint}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw await this.handleError(response);
      }

      return response.json();
    } catch (error) {
      console.error('Error during DELETE request:', error);
      throw error;
    }
  }

  private async handleError(response: Response): Promise<any> {
    const error = {
      status: response.status,
      statusText: response.statusText
    };

    return error; 
  }
}
