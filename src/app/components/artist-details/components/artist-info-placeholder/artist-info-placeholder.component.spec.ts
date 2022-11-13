import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistInfoPlaceholderComponent } from './artist-info-placeholder.component';

describe('ArtistInfoPlaceholderComponent', () => {
  let component: ArtistInfoPlaceholderComponent;
  let fixture: ComponentFixture<ArtistInfoPlaceholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistInfoPlaceholderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistInfoPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
