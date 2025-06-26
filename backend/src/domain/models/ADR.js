class ADR {
  constructor({
    id,
    title,
    context = '',
    decision,
    positiveConsequences = '',
    negativeConsequences = '',
    alternativesConsidered = '',
    status = 'Proposé',
    createdAt = new Date(),
    updatedAt = new Date(),
    createdBy,
    productId = null,
    solutionId = null,
    diagramUrl = null
  }) {
    this.id = id;
    this.title = title;
    this.context = context;
    this.decision = decision;
    this.positiveConsequences = positiveConsequences;
    this.negativeConsequences = negativeConsequences;
    this.alternativesConsidered = alternativesConsidered;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.createdBy = createdBy;
    this.productId = productId;
    this.solutionId = solutionId;
    this.diagramUrl = diagramUrl;
  }

  static STATUSES = {
    PROPOSED: 'Proposé',
    ACCEPTED: 'Accepté',
    REJECTED: 'Rejeté',
    OBSOLETE: 'Obsolète'
  };

  validate() {
    const errors = [];
    
    if (!this.title || this.title.trim() === '') {
      errors.push('Le titre est obligatoire.');
    }
    
    if (!this.decision || this.decision.trim() === '') {
      errors.push('La décision est obligatoire.');
    }
    
    if (!Object.values(ADR.STATUSES).includes(this.status)) {
      errors.push('Le statut doit être valide.');
    }
    
    return errors;
  }

  updateStatus(newStatus) {
    if (!Object.values(ADR.STATUSES).includes(newStatus)) {
      throw new Error('Statut invalide');
    }
    this.status = newStatus;
    this.updatedAt = new Date();
  }

  toMADR() {
    return `# ${this.title}

## Statut
${this.status}

## Contexte
${this.context}

## Décision
${this.decision}

## Conséquences
### Positives
${this.positiveConsequences}

### Négatives
${this.negativeConsequences}

## Alternatives considérées
${this.alternativesConsidered}
`;
  }
}

module.exports = ADR;

