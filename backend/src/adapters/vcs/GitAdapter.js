const { exec } = require('child_process');
const { promisify } = require('util');
const fs = require('fs').promises;
const path = require('path');

const execAsync = promisify(exec);

class GitAdapter {
  constructor() {
    this.isLocal = process.env.NODE_ENV !== 'production';
    this.repoPath = process.env.GIT_REPO_PATH || path.join(__dirname, '../../../git-repo');
    this.remoteUrl = process.env.GIT_REMOTE_URL;
    
    if (this.isLocal) {
      this._initializeLocalRepo();
    }
  }

  async _initializeLocalRepo() {
    try {
      await fs.mkdir(this.repoPath, { recursive: true });
      
      // Vérifier si c'est déjà un dépôt Git
      try {
        await execAsync('git status', { cwd: this.repoPath });
      } catch (error) {
        // Initialiser le dépôt Git
        await execAsync('git init', { cwd: this.repoPath });
        await execAsync('git config user.name "ADR Management App"', { cwd: this.repoPath });
        await execAsync('git config user.email "adr-app@example.com"', { cwd: this.repoPath });
        
        // Créer un commit initial
        const readmePath = path.join(this.repoPath, 'README.md');
        await fs.writeFile(readmePath, '# ADR Repository\n\nCe dépôt contient les Architecture Decision Records.\n');
        await execAsync('git add README.md', { cwd: this.repoPath });
        await execAsync('git commit -m "Initial commit"', { cwd: this.repoPath });
      }
    } catch (error) {
      console.warn('Erreur lors de l\'initialisation du dépôt Git local:', error.message);
    }
  }

  async commitFile(fileName, content, commitMessage) {
    try {
      const filePath = path.join(this.repoPath, fileName);
      
      // Écrire le fichier
      await fs.writeFile(filePath, content, 'utf8');
      
      // Ajouter et commiter
      await execAsync(`git add "${fileName}"`, { cwd: this.repoPath });
      await execAsync(`git commit -m "${commitMessage}"`, { cwd: this.repoPath });
      
      // Pousser vers le remote si configuré
      if (this.remoteUrl && !this.isLocal) {
        await execAsync('git push origin main', { cwd: this.repoPath });
      }
      
      return true;
    } catch (error) {
      console.warn('Erreur lors du commit Git:', error.message);
      throw new Error('Erreur lors de la synchronisation avec le système de gestion de versions.');
    }
  }

  async deleteFile(fileName, commitMessage) {
    try {
      const filePath = path.join(this.repoPath, fileName);
      
      // Vérifier si le fichier existe
      try {
        await fs.access(filePath);
        await execAsync(`git rm "${fileName}"`, { cwd: this.repoPath });
        await execAsync(`git commit -m "${commitMessage}"`, { cwd: this.repoPath });
        
        // Pousser vers le remote si configuré
        if (this.remoteUrl && !this.isLocal) {
          await execAsync('git push origin main', { cwd: this.repoPath });
        }
      } catch (error) {
        // Le fichier n'existe pas, pas d'erreur
      }
      
      return true;
    } catch (error) {
      console.warn('Erreur lors de la suppression Git:', error.message);
      throw new Error('Erreur lors de la synchronisation avec le système de gestion de versions.');
    }
  }

  async getFileHistory(fileName) {
    try {
      const { stdout } = await execAsync(`git log --oneline -- "${fileName}"`, { cwd: this.repoPath });
      return stdout.trim().split('\n').filter(line => line.length > 0);
    } catch (error) {
      console.warn('Erreur lors de la récupération de l\'historique Git:', error.message);
      return [];
    }
  }

  async getFileContent(fileName, commitHash = 'HEAD') {
    try {
      const { stdout } = await execAsync(`git show ${commitHash}:"${fileName}"`, { cwd: this.repoPath });
      return stdout;
    } catch (error) {
      console.warn('Erreur lors de la récupération du contenu Git:', error.message);
      throw new Error('Fichier non trouvé dans le système de gestion de versions.');
    }
  }

  async listFiles() {
    try {
      const { stdout } = await execAsync('git ls-files', { cwd: this.repoPath });
      return stdout.trim().split('\n').filter(line => line.length > 0);
    } catch (error) {
      console.warn('Erreur lors de la liste des fichiers Git:', error.message);
      return [];
    }
  }
}

module.exports = GitAdapter;

