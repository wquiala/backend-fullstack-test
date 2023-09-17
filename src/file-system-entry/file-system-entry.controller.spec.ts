import { Test, TestingModule } from '@nestjs/testing';
import { FileSystemEntryController } from './file-system-entry.controller';
import { FileSystemEntryService } from './file-system-entry.service';

describe('FileSystemEntryController', () => {
  let controller: FileSystemEntryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileSystemEntryController],
      providers: [FileSystemEntryService],
    }).compile();

    controller = module.get<FileSystemEntryController>(FileSystemEntryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
