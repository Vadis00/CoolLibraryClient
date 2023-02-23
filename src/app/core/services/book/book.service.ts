import { HttpClient } from '@angular/common/http';
import { BookPreview, NewBook } from 'src/app/shared/models/book';
import { environment } from 'src/environments/environment.local';
import { firstValueFrom, EMPTY, lastValueFrom, } from 'rxjs';
import { Injectable } from '@angular/core';
import { NewReview } from 'src/app/shared/models/review';
import { Rating } from 'src/app/shared/models/rating';

@Injectable()
export class BookService {
  constructor(private httpClient: HttpClient) {
  }

  public async getAll(order: string): Promise<BookPreview[]> {
    const url = `${environment.baseApiUrl}/api/books/${order}`;
    const response = this.httpClient.get<BookPreview[]>(url);

    return await lastValueFrom(response);
  }

  public async getById(id: string): Promise<BookPreview> {
    const url = `${environment.baseApiUrl}/api/books/${id}`;
    const response = this.httpClient.get<BookPreview>(url);

    return await lastValueFrom(response);
  }

  public async deleteById(id: string, secret: string): Promise<any> {
    const url = `${environment.baseApiUrl}/api/books/${id}`;
    const response = this.httpClient.get<BookPreview>(url);

    return await lastValueFrom(response);
  }

  public async createOrUpdate(book: NewBook): Promise<number> {
    const url = `${environment.baseApiUrl}/api/books/save`;
    const response = this.httpClient.post<number>(url, book);

    return await lastValueFrom(response);
  }

  public async addReview(id: string, review: NewReview): Promise<any> {
    const url = `${environment.baseApiUrl}/api/books/${id}/review"`;
    const response = this.httpClient.put<BookPreview>(url, review);

    return await lastValueFrom(response);
  }

  public async addRating(id: string, rating: Rating): Promise<any> {
    const url = `${environment.baseApiUrl}/api/books/${id}/review"`;
    const response = this.httpClient.put<BookPreview>(url, rating);

    return await lastValueFrom(response);
  }
}