import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UserService', () => {
  let service: UserService;
  const mockUserRepository = {
    find: jest.fn().mockResolvedValue([{ id: 1, name: 'John', email: 'john@example.com' }]),  // Mock response for find
    save: jest.fn().mockResolvedValue({ id: 1, name: 'John', email: 'john@example.com' }),   // Mock response for save
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, {
        provide: getRepositoryToken(User),
        useValue: mockUserRepository
      }],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
