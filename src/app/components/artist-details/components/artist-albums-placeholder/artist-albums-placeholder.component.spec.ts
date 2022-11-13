import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistAlbumsPlaceholderComponent } from './artist-albums-placeholder.component';

describe('ArtistAlbumsPlaceholderComponent', () => {
  let component: ArtistAlbumsPlaceholderComponent;
  let fixture: ComponentFixture<ArtistAlbumsPlaceholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistAlbumsPlaceholderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistAlbumsPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
