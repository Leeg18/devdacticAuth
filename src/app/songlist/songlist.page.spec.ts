import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SonglistPage } from './songlist.page';

describe('SonglistPage', () => {
  let component: SonglistPage;
  let fixture: ComponentFixture<SonglistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SonglistPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SonglistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
