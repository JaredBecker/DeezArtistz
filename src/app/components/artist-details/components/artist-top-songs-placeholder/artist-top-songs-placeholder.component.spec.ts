import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistTopSongsPlaceholderComponent } from './artist-top-songs-placeholder.component';

describe('ArtistTopSongsPlaceholderComponent', () => {
  let component: ArtistTopSongsPlaceholderComponent;
  let fixture: ComponentFixture<ArtistTopSongsPlaceholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistTopSongsPlaceholderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistTopSongsPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
