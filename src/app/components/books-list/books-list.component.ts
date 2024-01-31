import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { count } from 'rxjs';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrl: './books-list.component.css'
})
export class BooksListComponent implements OnInit {

  subject: string = ''
  books: any = [];
  noSelection: boolean = false;
  loading: boolean = true
  noResult: boolean = false;
  constructor(public api: ApiService) { }

  async ngOnInit(): Promise<void> {
    if (this.api.subject != '') {
      this.subject = this.api.subject
      await this.getList();
      this.loading = false
      if (this.books.length === 0) {
        this.noResult = true
      }
    } else {
      this.noSelection = true;
    }
  }

  async next(): Promise<void> {
    this.api.offset += this.api.limit
    await this.getList()
  }
  async previous(): Promise<void> {
    if (this.api.offset > 0) {
      this.api.offset -= this.api.limit;
      await this.getList();
    }
  }

  async getList() {
    this.loading = true;
    try {
      const data = await this.api.searchForSubjects(this.subject, this.api.limit, this.api.offset).toPromise();
      this.books = data.works;
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.noResult = true;
      console.error(error)
    }
  }
}
