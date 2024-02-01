import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { BookDetailsComponent } from './book-details.component';
import { LoadingComponent } from '../loading/loading.component';
import { of } from 'rxjs';
import { ApiService } from '../../services/api.service';  

describe('BookDetailsComponent', () => {
  let component: BookDetailsComponent;
  let fixture: ComponentFixture<BookDetailsComponent>;
  let fakeActivatedRoute: ActivatedRoute;
  let apiService: ApiService;  

  beforeEach(() => {
    fakeActivatedRoute = {
      snapshot: { paramMap: convertToParamMap({ type: 'works', bookKey: 'OL12345W' }) }
    } as any;

    TestBed.configureTestingModule({
      declarations: [BookDetailsComponent, LoadingComponent],
      imports: [HttpClientModule],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BookDetailsComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set loading to true initially', () => {
    expect(component.loading).toBeTrue();
  });

  it('should fetch book details and set loading to false on ngOnInit', fakeAsync(() => {
    const mockBook = { title: 'Mock Book', description: 'Mock Description' };
    spyOn(apiService, 'searchSingleBook').and.returnValue(of(mockBook));  

    component.ngOnInit();
    tick();

    expect(component.book).toEqual(mockBook);
    expect(component.loading).toBeFalse();
  }));

  it('should set descriptionObject to true if the description is an object', fakeAsync(() => {
    const mockBook = { title: 'Mock Book', description: { key: 'value' } };
    spyOn(apiService, 'searchSingleBook').and.returnValue(of(mockBook));  

    component.ngOnInit();
    tick();

    expect(component.descriptionObject).toBeTrue();
  }));
});
