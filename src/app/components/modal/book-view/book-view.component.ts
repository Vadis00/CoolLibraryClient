import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookService } from 'src/app/core/services/book/book.service';
import { Book } from 'src/app/shared/models/book';
import { Review } from 'src/app/shared/models/review';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.scss']
})
export class BookViewComponent implements OnInit {
  book: Book;
  review: Review;
  reviewNext: Review;
  reviewPrevious: Review;
  reviewIndex = 0;
  constructor(public bookService: BookService,
    public dialogRef: MatDialogRef<BookViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.loadBook()
  }

  async loadBook() {
    this.book = await this.bookService.getById(this.data.id);
    if (this.book.reviews) {
      this.review = this.book.reviews[0];
      this.reviewNext = this.book.reviews[1];
    }


    console.log(this.book);
  }

  getNextReview(type: string) {
    if (!this.book.reviews)
      return;

    switch (type) {
      case 'next':
          this.reviewIndex++;
          this.reviewPrevious = this.review;
          this.review = this.reviewNext;
          this.reviewNext = this.book.reviews[this.reviewIndex]

        break;
      case 'previous':
        if (this.book.reviews[this.reviewIndex - 1])
          this.reviewIndex--;
        this.review = this.book.reviews[this.reviewIndex];
        this.reviewPrevious = this.book.reviews[this.reviewIndex - 1];
        this.reviewNext = this.book.reviews[this.reviewIndex + 1];
        break;
    }
  }

  closeDialog(){
    this.dialogRef.close();
  }
}