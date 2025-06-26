const AWS = require('aws-sdk');
const ADR = require('../../domain/models/ADR');
const User = require('../../domain/models/User');

class DynamoDBAdapter {
  constructor() {
    // Configuration AWS (en mode local, nous utiliserons des données en mémoire)
    this.isLocal = process.env.NODE_ENV !== 'production';
    
    if (this.isLocal) {
      // Stockage en mémoire pour les tests locaux
      this.adrs = new Map();
      this.users = new Map();
      this._initializeTestData();
    } else {
      this.dynamodb = new AWS.DynamoDB.DocumentClient();
      this.adrTableName = process.env.ADR_TABLE_NAME || 'ADRs';
      this.userTableName = process.env.USER_TABLE_NAME || 'Users';
    }
  }

  _initializeTestData() {
    // Créer des utilisateurs de test
    const testUsers = [
      new User({
        id: 'user-1',
        username: 'contributeur',
        email: 'contributeur@example.com',
        role: User.ROLES.CONTRIBUTOR
      }),
      new User({
        id: 'user-2',
        username: 'approbateur',
        email: 'approbateur@example.com',
        role: User.ROLES.APPROVER
      }),
      new User({
        id: 'user-3',
        username: 'lecteur',
        email: 'lecteur@example.com',
        role: User.ROLES.READER
      })
    ];

    testUsers.forEach(user => this.users.set(user.id, user));
  }

  // Méthodes pour les ADR
  async saveADR(adr) {
    if (this.isLocal) {
      this.adrs.set(adr.id, adr);
      return adr;
    }

    const params = {
      TableName: this.adrTableName,
      Item: adr
    };

    await this.dynamodb.put(params).promise();
    return adr;
  }

  async getADRById(id) {
    if (this.isLocal) {
      return this.adrs.get(id) || null;
    }

    const params = {
      TableName: this.adrTableName,
      Key: { id }
    };

    const result = await this.dynamodb.get(params).promise();
    return result.Item ? new ADR(result.Item) : null;
  }

  async getAllADRs(filters = {}) {
    if (this.isLocal) {
      let adrs = Array.from(this.adrs.values());
      
      if (filters.status) {
        adrs = adrs.filter(adr => adr.status === filters.status);
      }
      
      if (filters.productId) {
        adrs = adrs.filter(adr => adr.productId === filters.productId);
      }
      
      return adrs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    const params = {
      TableName: this.adrTableName
    };

    const result = await this.dynamodb.scan(params).promise();
    return result.Items.map(item => new ADR(item));
  }

  async updateADR(id, adr) {
    if (this.isLocal) {
      this.adrs.set(id, adr);
      return adr;
    }

    const params = {
      TableName: this.adrTableName,
      Item: adr
    };

    await this.dynamodb.put(params).promise();
    return adr;
  }

  async deleteADR(id) {
    if (this.isLocal) {
      return this.adrs.delete(id);
    }

    const params = {
      TableName: this.adrTableName,
      Key: { id }
    };

    await this.dynamodb.delete(params).promise();
    return true;
  }

  // Méthodes pour les utilisateurs
  async saveUser(user) {
    if (this.isLocal) {
      this.users.set(user.id, user);
      return user;
    }

    const params = {
      TableName: this.userTableName,
      Item: user
    };

    await this.dynamodb.put(params).promise();
    return user;
  }

  async getUserById(id) {
    if (this.isLocal) {
      return this.users.get(id) || null;
    }

    const params = {
      TableName: this.userTableName,
      Key: { id }
    };

    const result = await this.dynamodb.get(params).promise();
    return result.Item ? new User(result.Item) : null;
  }

  async getUserByEmail(email) {
    if (this.isLocal) {
      const users = Array.from(this.users.values());
      return users.find(user => user.email === email) || null;
    }

    const params = {
      TableName: this.userTableName,
      FilterExpression: 'email = :email',
      ExpressionAttributeValues: {
        ':email': email
      }
    };

    const result = await this.dynamodb.scan(params).promise();
    return result.Items.length > 0 ? new User(result.Items[0]) : null;
  }

  async getAllUsers() {
    if (this.isLocal) {
      return Array.from(this.users.values());
    }

    const params = {
      TableName: this.userTableName
    };

    const result = await this.dynamodb.scan(params).promise();
    return result.Items.map(item => new User(item));
  }

  async updateUser(id, user) {
    if (this.isLocal) {
      this.users.set(id, user);
      return user;
    }

    const params = {
      TableName: this.userTableName,
      Item: user
    };

    await this.dynamodb.put(params).promise();
    return user;
  }

  async deleteUser(id) {
    if (this.isLocal) {
      return this.users.delete(id);
    }

    const params = {
      TableName: this.userTableName,
      Key: { id }
    };

    await this.dynamodb.delete(params).promise();
    return true;
  }
}

module.exports = DynamoDBAdapter;

