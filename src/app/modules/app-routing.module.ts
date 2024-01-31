import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchBoxComponent } from '../components/search-box/search-box.component';
import { BooksListComponent } from '../components/books-list/books-list.component';
import { BookDetailsComponent } from '../components/book-details/book-details.component';

const routes: Routes = [
  {path: '', component: SearchBoxComponent},
  {path: 'books', component: BooksListComponent},
  {path: 'book/:type/:bookKey', component: BookDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
