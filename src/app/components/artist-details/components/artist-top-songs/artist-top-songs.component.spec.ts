import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistTopSongsComponent } from './artist-top-songs.component';

describe('ArtistTopSongsComponent', () => {
  let component: ArtistTopSongsComponent;
  let fixture: ComponentFixture<ArtistTopSongsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistTopSongsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistTopSongsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
