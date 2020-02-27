import { TestBed } from '@angular/core/testing';

import { LoginRouterGuardService } from './login-router-guard.service';

describe('LoginRouterGuardService', () => {
  let service: LoginRouterGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginRouterGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
