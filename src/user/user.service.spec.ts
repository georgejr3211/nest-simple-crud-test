import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { userMock } from './mocks';

import { User } from './user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  const mockRepository = {
    createQueryBuilder: jest.fn(() => ({
      where: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockReturnValue([userMock, userMock]),
      getOne: jest.fn().mockReturnValue(userMock),
    })),
    findOne: jest.fn().mockReturnValue(userMock),
    save: jest.fn().mockReturnValue(userMock),
    softDelete: jest.fn().mockReturnValue(true),
  };

  beforeEach(() => {
    mockRepository.createQueryBuilder().getMany.mockReset();
    mockRepository.createQueryBuilder().getOne.mockReset();
    mockRepository.save.mockReset();
    mockRepository.findOne.mockReset();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a list of users', async () => {
      mockRepository.createQueryBuilder().getMany.mockReturnValue([userMock, userMock]);
      expect(await service.findAll()).toEqual([userMock, userMock]);
    });
  });

  describe('find', () => {
    it('should throw BadRequestException when user not found', () => {
      expect(service.find('')).rejects.toThrowError();
    });

    it('should return a user', () => {
      mockRepository.findOne.mockReturnValue(userMock);
      expect(service.find('qdsaqw-1')).resolves.toEqual(userMock);
    });
  });

  describe('findByEmail', () => {
    it('should return a user passing email as param', async () => {
      mockRepository.findOne.mockReturnValue(userMock);
      expect(await service.findByEmail(userMock.email)).toEqual(userMock);
    });
  });

  describe('save', () => {
    it('should create a new user', async () => {
      mockRepository.save.mockReturnValue(userMock);
      expect(await service.save(userMock)).toEqual(userMock);
    });

    it('should throw a BadRequestException when create a new user with same email', () => {
      mockRepository.findOne.mockReturnValue(userMock);
      expect(service.save(userMock)).rejects.toThrowError();
    });
  });

  describe('destroy', () => {
    it('should throw badRequestException when user not found', () => {
      expect(service.destroy('')).rejects.toThrowError();
    });

    it('should soft delete user', async () => {
      mockRepository.findOne.mockReturnValue(userMock);
      expect(await service.destroy(userMock.id)).toEqual(true);
    });
  });

});
