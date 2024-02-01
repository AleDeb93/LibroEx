import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { BooksListComponent } from './books-list.component';
import { LoadingComponent } from '../loading/loading.component';
import { ApiService } from '../../services/api.service';
import { of, throwError } from 'rxjs';

describe('BooksListComponent', () => {
  let component: BooksListComponent;
  let fixture: ComponentFixture<BooksListComponent>;
  let apiService: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    apiService = jasmine.createSpyObj('ApiService', ['searchForSubjects']);

    await TestBed.configureTestingModule({
      declarations: [BooksListComponent, LoadingComponent],
      imports: [HttpClientModule],
      providers: [{ provide: ApiService, useValue: apiService }]
    }).compileComponents();

    fixture = TestBed.createComponent(BooksListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set subject and call getList on ngOnInit when api.subject is not empty', fakeAsync(() => {
    apiService.subject = 'fantasy';
    apiService.searchForSubjects.and.returnValue(of({ works: [{}, {}] }));

    component.ngOnInit();
    tick();

    expect(component.subject).toEqual('fantasy');
    expect(apiService.searchForSubjects).toHaveBeenCalledWith('fantasy', component.api.limit, component.api.offset);
    expect(component.books.length).toEqual(2);
    expect(component.loading).toBeFalse();
    expect(component.noResult).toBeFalse();
  }));

  it('should set noSelection to true on ngOnInit when api.subject is empty', () => {
    apiService.subject = '';

    component.ngOnInit();

    expect(component.noSelection).toBeTrue();
  });

  it('should set api.offset to api.limit on next', fakeAsync(() => {
    component.api.offset = 0;
    component.api.limit = 10;

    component.next();
    tick();

    expect(component.api.offset).toEqual(component.api.limit);
  }));


  it('should decrement api.offset by api.limit on previous when api.offset is greater than 0', fakeAsync(() => {
    component.api.offset = 10;
    component.api.limit = 5;

    component.previous();
    tick();

    expect(component.api.offset).toEqual(5);
  }));


  it('should not decrement api.offset on previous when api.offset is 0', fakeAsync(() => {
    component.api.offset = 0;

    component.previous();
    tick();

    expect(component.api.offset).toEqual(0);
  }));

  it('should call getList on next', fakeAsync(() => {
    spyOn(component, 'getList');

    component.next();
    tick();

    expect(component.getList).toHaveBeenCalled();
  }));

  it('should call getList on previous', fakeAsync(() => {
    component.api.offset = 10;
    component.api.limit = 10;

    const getListSpy = spyOn(component, 'getList').and.callThrough();

    component.previous();
    tick();

    expect(getListSpy).toHaveBeenCalled();
  }));


  it('should set loading, call searchForSubjects, and set books on getList', fakeAsync(() => {
    apiService.searchForSubjects.and.returnValue(of({ works: [{}, {}] }));

    component.getList();
    tick();

    expect(component.loading).toBeFalse();
    expect(apiService.searchForSubjects).toHaveBeenCalledWith(component.subject, component.api.limit, component.api.offset);
    expect(component.books.length).toEqual(2);
    expect(component.noResult).toBeFalse();
  }));

  it('should set loading, set noResult, and log error on getList when an error occurs', fakeAsync(() => {
    apiService.searchForSubjects.and.returnValue(throwError('Test Error'));
    spyOn(console, 'error');

    component.getList();
    tick();

    expect(component.loading).toBeFalse();
    expect(component.noResult).toBeTrue();
    expect(console.error).toHaveBeenCalledWith('Test Error');
  }));
});
