const User = require('../src/domain/models/User');
const UserService = require('../src/domain/services/UserService');

// Mock de l'adaptateur de base de données
const mockDbAdapter = {
  saveUser: jest.fn(),
  getUserById: jest.fn(),
  getUserByEmail: jest.fn(),
  getAllUsers: jest.fn(),
  updateUser: jest.fn(),
  deleteUser: jest.fn(),
};

describe('User Model', () => {
  test('should create a valid user', () => {
    const userData = {
      id: 'user-1',
      username: 'testuser',
      email: 'test@example.com',
      role: User.ROLES.CONTRIBUTOR,
    };

    const user = new User(userData);
    
    expect(user.id).toBe('user-1');
    expect(user.username).toBe('testuser');
    expect(user.email).toBe('test@example.com');
    expect(user.role).toBe('Contributeur ADR');
  });

  test('should validate required fields', () => {
    const user = new User({});
    const errors = user.validate();
    
    expect(errors).toContain('Le nom d\'utilisateur est obligatoire.');
    expect(errors).toContain('L\'email est obligatoire.');
  });

  test('should check permissions correctly', () => {
    const contributor = new User({
      username: 'contributor',
      email: 'contributor@example.com',
      role: User.ROLES.CONTRIBUTOR,
    });

    const approver = new User({
      username: 'approver',
      email: 'approver@example.com',
      role: User.ROLES.APPROVER,
    });

    const reader = new User({
      username: 'reader',
      email: 'reader@example.com',
      role: User.ROLES.READER,
    });

    const admin = new User({
      username: 'admin',
      email: 'admin@example.com',
      role: User.ROLES.ADMIN,
    });

    // Test permissions pour créer des ADR
    expect(contributor.canCreateADR()).toBe(true);
    expect(approver.canCreateADR()).toBe(true);
    expect(reader.canCreateADR()).toBe(false);
    expect(admin.canCreateADR()).toBe(true);

    // Test permissions pour approuver des ADR
    expect(contributor.canApproveADR()).toBe(false);
    expect(approver.canApproveADR()).toBe(true);
    expect(reader.canApproveADR()).toBe(false);
    expect(admin.canApproveADR()).toBe(true);

    // Test permissions d'administration
    expect(contributor.canAdministrate()).toBe(false);
    expect(approver.canAdministrate()).toBe(false);
    expect(reader.canAdministrate()).toBe(false);
    expect(admin.canAdministrate()).toBe(true);
  });
});

describe('User Service', () => {
  let userService;

  beforeEach(() => {
    jest.clearAllMocks();
    userService = new UserService(mockDbAdapter);
  });

  test('should create user successfully', async () => {
    const userData = {
      username: 'newuser',
      email: 'newuser@example.com',
      role: User.ROLES.CONTRIBUTOR,
    };

    mockDbAdapter.getUserByEmail.mockResolvedValue(null); // Utilisateur n'existe pas
    mockDbAdapter.saveUser.mockResolvedValue(true);

    const result = await userService.createUser(userData);

    expect(result.username).toBe('newuser');
    expect(result.email).toBe('newuser@example.com');
    expect(result.role).toBe('Contributeur ADR');
    expect(mockDbAdapter.saveUser).toHaveBeenCalled();
  });

  test('should throw error for duplicate email', async () => {
    const userData = {
      username: 'newuser',
      email: 'existing@example.com',
      role: User.ROLES.CONTRIBUTOR,
    };

    const existingUser = new User({
      id: 'existing-id',
      username: 'existing',
      email: 'existing@example.com',
      role: User.ROLES.READER,
    });

    mockDbAdapter.getUserByEmail.mockResolvedValue(existingUser);

    await expect(userService.createUser(userData)).rejects.toThrow('Un utilisateur avec cet email existe déjà.');
  });

  test('should get user by ID', async () => {
    const mockUser = new User({
      id: 'user-1',
      username: 'testuser',
      email: 'test@example.com',
      role: User.ROLES.CONTRIBUTOR,
    });

    mockDbAdapter.getUserById.mockResolvedValue(mockUser);

    const result = await userService.getUserById('user-1');
    expect(result).toEqual(mockUser);
    expect(mockDbAdapter.getUserById).toHaveBeenCalledWith('user-1');
  });

  test('should throw error when user not found', async () => {
    mockDbAdapter.getUserById.mockResolvedValue(null);

    await expect(userService.getUserById('non-existent')).rejects.toThrow('Utilisateur non trouvé.');
  });

  test('should authenticate user', async () => {
    const mockUser = new User({
      id: 'user-1',
      username: 'testuser',
      email: 'test@example.com',
      role: User.ROLES.CONTRIBUTOR,
    });

    mockDbAdapter.getUserByEmail.mockResolvedValue(mockUser);

    const result = await userService.authenticateUser('test@example.com', 'password');
    expect(result).toEqual(mockUser);
  });
});

