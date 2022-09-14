import { TestBed } from '@angular/core/testing';

import { StatsResolverResolver } from './stats-resolver.resolver';

describe('StatsResolverResolver', () => {
  let resolver: StatsResolverResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(StatsResolverResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
