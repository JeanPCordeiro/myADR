class User {
  constructor({
    id,
    username,
    email,
    role = 'Lecteur ADR',
    createdAt = new Date(),
    updatedAt = new Date()
  }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.role = role;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static ROLES = {
    CONTRIBUTOR: 'Contributeur ADR',
    APPROVER: 'Approbateur ADR',
    READER: 'Lecteur ADR',
    ADMIN: 'Administrateur'
  };

  validate() {
    const errors = [];
    
    if (!this.username || this.username.trim() === '') {
      errors.push('Le nom d\'utilisateur est obligatoire.');
    }
    
    if (!this.email || this.email.trim() === '') {
      errors.push('L\'email est obligatoire.');
    }
    
    if (!Object.values(User.ROLES).includes(this.role)) {
      errors.push('Le rôle doit être valide.');
    }
    
    return errors;
  }

  canCreateADR() {
    return [User.ROLES.CONTRIBUTOR, User.ROLES.APPROVER, User.ROLES.ADMIN].includes(this.role);
  }

  canApproveADR() {
    return [User.ROLES.APPROVER, User.ROLES.ADMIN].includes(this.role);
  }

  canAdministrate() {
    return this.role === User.ROLES.ADMIN;
  }
}

module.exports = User;

