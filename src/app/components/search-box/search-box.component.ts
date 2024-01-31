import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent {

  subject: string = ''

  constructor(private router: Router, private api: ApiService) { }

  search() {
    this.api.subject = this.subject;
    this.router.navigate(['books'])
  }

}
