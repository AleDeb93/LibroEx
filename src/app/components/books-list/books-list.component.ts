import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrl: './books-list.component.css'
})
export class BooksListComponent implements OnInit {

  subject: string = ''
  books: any = [];
  noSelection = false;
  constructor(public api: ApiService) { }

  async ngOnInit(): Promise<void> {
    if (this.api.subject != '') {
      this.subject = this.api.subject
      try {
        const data = await this.api.searchForSubjects(this.subject, this.api.limit, this.api.offset).toPromise();
        this.books = data.works;
        console.log(this.books)
      } catch (error) {
        console.error(error)
      }
    } else {
      this.noSelection = true;
    }
  }
}
