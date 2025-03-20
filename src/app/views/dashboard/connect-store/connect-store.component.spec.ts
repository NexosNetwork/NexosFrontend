import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectStoreComponent } from './connect-store.component';

describe('ConnectStoreComponent', () => {
  let component: ConnectStoreComponent;
  let fixture: ComponentFixture<ConnectStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConnectStoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnectStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
