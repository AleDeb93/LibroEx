import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent implements OnInit {

  book: any;
  loading: boolean = true;
  descriptionObject: boolean = false;
  noDescription: boolean = false;

  constructor(private api: ApiService, private route: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    this.loading = true;
    const type = this.route.snapshot.paramMap.get('type');
    const bookKey = this.route.snapshot.paramMap.get('bookKey');
    const param = `/${type}/${bookKey}`
    if (param) {
      const data = await this.api.searchSingleBook(param).toPromise();
      this.book = data;
      if (this.book.description && typeof this.book.description === 'object') {
        this.descriptionObject = true;
      }
      this.loading = false;
    }
  }
}
