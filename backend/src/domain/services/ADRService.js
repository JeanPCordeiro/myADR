const ADR = require('../models/ADR');
const { v4: uuidv4 } = require('uuid');

class ADRService {
  constructor(dbAdapter, storageAdapter, vcsAdapter) {
    this.dbAdapter = dbAdapter;
    this.storageAdapter = storageAdapter;
    this.vcsAdapter = vcsAdapter;
  }

  async createADR(adrData, userId) {
    const adr = new ADR({
      id: uuidv4(),
      ...adrData,
      createdBy: userId
    });

    const validationErrors = adr.validate();
    if (validationErrors.length > 0) {
      throw new Error(validationErrors.join(' '));
    }

    // Sauvegarder les métadonnées en base
    await this.dbAdapter.saveADR(adr);

    // Sauvegarder le fichier MADR dans S3
    const madrContent = adr.toMADR();
    const fileName = `${adr.id}.md`;
    await this.storageAdapter.saveFile(fileName, madrContent);

    // Synchroniser avec le système de gestion de versions
    try {
      await this.vcsAdapter.commitFile(fileName, madrContent, `Création de l'ADR: ${adr.title}`);
    } catch (error) {
      console.warn('Erreur lors de la synchronisation VCS:', error.message);
    }

    return adr;
  }

  async getADRById(id) {
    const adr = await this.dbAdapter.getADRById(id);
    if (!adr) {
      throw new Error('ADR non trouvé.');
    }
    return adr;
  }

  async getAllADRs(filters = {}) {
    return await this.dbAdapter.getAllADRs(filters);
  }

  async updateADR(id, updateData, userId) {
    const existingADR = await this.getADRById(id);
    
    const updatedADR = new ADR({
      ...existingADR,
      ...updateData,
      id,
      updatedAt: new Date()
    });

    const validationErrors = updatedADR.validate();
    if (validationErrors.length > 0) {
      throw new Error(validationErrors.join(' '));
    }

    // Mettre à jour les métadonnées en base
    await this.dbAdapter.updateADR(id, updatedADR);

    // Mettre à jour le fichier MADR dans S3
    const madrContent = updatedADR.toMADR();
    const fileName = `${id}.md`;
    await this.storageAdapter.saveFile(fileName, madrContent);

    // Synchroniser avec le système de gestion de versions
    try {
      await this.vcsAdapter.commitFile(fileName, madrContent, `Mise à jour de l'ADR: ${updatedADR.title}`);
    } catch (error) {
      console.warn('Erreur lors de la synchronisation VCS:', error.message);
    }

    return updatedADR;
  }

  async updateADRStatus(id, newStatus, userId) {
    const adr = await this.getADRById(id);
    adr.updateStatus(newStatus);
    adr.updatedAt = new Date();

    await this.dbAdapter.updateADR(id, adr);

    // Mettre à jour le fichier MADR dans S3
    const madrContent = adr.toMADR();
    const fileName = `${id}.md`;
    await this.storageAdapter.saveFile(fileName, madrContent);

    // Synchroniser avec le système de gestion de versions
    try {
      await this.vcsAdapter.commitFile(fileName, madrContent, `Changement de statut de l'ADR: ${adr.title} -> ${newStatus}`);
    } catch (error) {
      console.warn('Erreur lors de la synchronisation VCS:', error.message);
    }

    return adr;
  }

  async deleteADR(id) {
    const adr = await this.getADRById(id);
    
    // Supprimer de la base de données
    await this.dbAdapter.deleteADR(id);

    // Supprimer le fichier de S3
    const fileName = `${id}.md`;
    await this.storageAdapter.deleteFile(fileName);

    // Synchroniser avec le système de gestion de versions
    try {
      await this.vcsAdapter.deleteFile(fileName, `Suppression de l'ADR: ${adr.title}`);
    } catch (error) {
      console.warn('Erreur lors de la synchronisation VCS:', error.message);
    }

    return true;
  }
}

module.exports = ADRService;

