import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoModule } from '../logo';
import { AuthTemplateComponent } from './auth-template.component';

describe('AuthTemplateComponent', () => {
  let component: AuthTemplateComponent;
  let fixture: ComponentFixture<AuthTemplateComponent>;
  const inputTitle = 'Title';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthTemplateComponent],
      imports: [LogoModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthTemplateComponent);
    component = fixture.componentInstance;
    component.title = inputTitle;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', async () => {
    fixture
      .whenStable()
      .then(() => {
        expect(fixture.nativeElement.querySelector('h1').innerText).toEqual(
          inputTitle
        );
      })
      .catch(() => {});
  });
});
