const AWS = require('aws-sdk');
const fs = require('fs').promises;
const path = require('path');

class S3Adapter {
  constructor() {
    this.isLocal = process.env.NODE_ENV !== 'production';
    
    if (this.isLocal) {
      // Stockage local pour les tests
      this.localStoragePath = path.join(__dirname, '../../../storage');
      this._ensureLocalStorageExists();
    } else {
      this.s3 = new AWS.S3();
      this.bucketName = process.env.S3_BUCKET_NAME || 'adr-storage-bucket';
    }
  }

  async _ensureLocalStorageExists() {
    try {
      await fs.mkdir(this.localStoragePath, { recursive: true });
    } catch (error) {
      console.warn('Erreur lors de la création du dossier de stockage local:', error.message);
    }
  }

  async saveFile(fileName, content) {
    if (this.isLocal) {
      const filePath = path.join(this.localStoragePath, fileName);
      await fs.writeFile(filePath, content, 'utf8');
      return filePath;
    }

    const params = {
      Bucket: this.bucketName,
      Key: fileName,
      Body: content,
      ContentType: 'text/markdown'
    };

    const result = await this.s3.upload(params).promise();
    return result.Location;
  }

  async getFile(fileName) {
    if (this.isLocal) {
      const filePath = path.join(this.localStoragePath, fileName);
      try {
        const content = await fs.readFile(filePath, 'utf8');
        return content;
      } catch (error) {
        if (error.code === 'ENOENT') {
          throw new Error('Fichier non trouvé.');
        }
        throw error;
      }
    }

    const params = {
      Bucket: this.bucketName,
      Key: fileName
    };

    try {
      const result = await this.s3.getObject(params).promise();
      return result.Body.toString('utf8');
    } catch (error) {
      if (error.code === 'NoSuchKey') {
        throw new Error('Fichier non trouvé.');
      }
      throw error;
    }
  }

  async deleteFile(fileName) {
    if (this.isLocal) {
      const filePath = path.join(this.localStoragePath, fileName);
      try {
        await fs.unlink(filePath);
        return true;
      } catch (error) {
        if (error.code === 'ENOENT') {
          return true; // Fichier déjà supprimé
        }
        throw error;
      }
    }

    const params = {
      Bucket: this.bucketName,
      Key: fileName
    };

    await this.s3.deleteObject(params).promise();
    return true;
  }

  async listFiles(prefix = '') {
    if (this.isLocal) {
      try {
        const files = await fs.readdir(this.localStoragePath);
        return files.filter(file => file.startsWith(prefix));
      } catch (error) {
        return [];
      }
    }

    const params = {
      Bucket: this.bucketName,
      Prefix: prefix
    };

    const result = await this.s3.listObjectsV2(params).promise();
    return result.Contents.map(obj => obj.Key);
  }

  async getFileUrl(fileName) {
    if (this.isLocal) {
      return `file://${path.join(this.localStoragePath, fileName)}`;
    }

    const params = {
      Bucket: this.bucketName,
      Key: fileName,
      Expires: 3600 // URL valide pendant 1 heure
    };

    return this.s3.getSignedUrl('getObject', params);
  }
}

module.exports = S3Adapter;

