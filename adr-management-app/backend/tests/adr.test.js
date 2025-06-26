const ADR = require('../src/domain/models/ADR');
const ADRService = require('../src/domain/services/ADRService');

// Mock des adaptateurs
const mockDbAdapter = {
  saveADR: jest.fn(),
  getADRById: jest.fn(),
  getAllADRs: jest.fn(),
  updateADR: jest.fn(),
  deleteADR: jest.fn(),
};

const mockStorageAdapter = {
  saveFile: jest.fn(),
  deleteFile: jest.fn(),
};

const mockVcsAdapter = {
  commitFile: jest.fn(),
  deleteFile: jest.fn(),
};

describe('ADR Model', () => {
  test('should create a valid ADR', () => {
    const adrData = {
      id: 'test-id',
      title: 'Test ADR',
      decision: 'Test decision',
      createdBy: 'user-1',
    };

    const adr = new ADR(adrData);
    
    expect(adr.id).toBe('test-id');
    expect(adr.title).toBe('Test ADR');
    expect(adr.decision).toBe('Test decision');
    expect(adr.status).toBe('Proposé');
  });

  test('should validate required fields', () => {
    const adr = new ADR({});
    const errors = adr.validate();
    
    expect(errors).toContain('Le titre est obligatoire.');
    expect(errors).toContain('La décision est obligatoire.');
  });

  test('should update status correctly', () => {
    const adr = new ADR({
      id: 'test-id',
      title: 'Test ADR',
      decision: 'Test decision',
    });

    adr.updateStatus(ADR.STATUSES.ACCEPTED);
    expect(adr.status).toBe('Accepté');
  });

  test('should generate MADR format', () => {
    const adr = new ADR({
      title: 'Test ADR',
      decision: 'Test decision',
      context: 'Test context',
      status: 'Accepté',
    });

    const madr = adr.toMADR();
    expect(madr).toContain('# Test ADR');
    expect(madr).toContain('## Statut\nAccepté');
    expect(madr).toContain('## Décision\nTest decision');
  });
});

describe('ADR Service', () => {
  let adrService;

  beforeEach(() => {
    jest.clearAllMocks();
    adrService = new ADRService(mockDbAdapter, mockStorageAdapter, mockVcsAdapter);
  });

  test('should create ADR successfully', async () => {
    const adrData = {
      title: 'Test ADR',
      decision: 'Test decision',
    };

    mockDbAdapter.saveADR.mockResolvedValue(true);
    mockStorageAdapter.saveFile.mockResolvedValue('file-url');
    mockVcsAdapter.commitFile.mockResolvedValue(true);

    const result = await adrService.createADR(adrData, 'user-1');

    expect(result.title).toBe('Test ADR');
    expect(result.decision).toBe('Test decision');
    expect(result.createdBy).toBe('user-1');
    expect(mockDbAdapter.saveADR).toHaveBeenCalled();
    expect(mockStorageAdapter.saveFile).toHaveBeenCalled();
    expect(mockVcsAdapter.commitFile).toHaveBeenCalled();
  });

  test('should throw error for invalid ADR data', async () => {
    const adrData = {
      title: '', // Titre vide
      decision: 'Test decision',
    };

    await expect(adrService.createADR(adrData, 'user-1')).rejects.toThrow('Le titre est obligatoire.');
  });

  test('should get ADR by ID', async () => {
    const mockADR = new ADR({
      id: 'test-id',
      title: 'Test ADR',
      decision: 'Test decision',
    });

    mockDbAdapter.getADRById.mockResolvedValue(mockADR);

    const result = await adrService.getADRById('test-id');
    expect(result).toEqual(mockADR);
    expect(mockDbAdapter.getADRById).toHaveBeenCalledWith('test-id');
  });

  test('should throw error when ADR not found', async () => {
    mockDbAdapter.getADRById.mockResolvedValue(null);

    await expect(adrService.getADRById('non-existent')).rejects.toThrow('ADR non trouvé.');
  });

  test('should update ADR status', async () => {
    const mockADR = new ADR({
      id: 'test-id',
      title: 'Test ADR',
      decision: 'Test decision',
      status: 'Proposé',
    });

    mockDbAdapter.getADRById.mockResolvedValue(mockADR);
    mockDbAdapter.updateADR.mockResolvedValue(true);
    mockStorageAdapter.saveFile.mockResolvedValue('file-url');
    mockVcsAdapter.commitFile.mockResolvedValue(true);

    const result = await adrService.updateADRStatus('test-id', ADR.STATUSES.ACCEPTED, 'user-1');

    expect(result.status).toBe('Accepté');
    expect(mockDbAdapter.updateADR).toHaveBeenCalled();
  });
});

