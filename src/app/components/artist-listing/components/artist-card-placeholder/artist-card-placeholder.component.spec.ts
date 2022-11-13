import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistCardPlaceholderComponent } from './artist-card-placeholder.component';

describe('ArtistCardPlaceholderComponent', () => {
  let component: ArtistCardPlaceholderComponent;
  let fixture: ComponentFixture<ArtistCardPlaceholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistCardPlaceholderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistCardPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
