import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useCreateADR, useUpdateADR, useADR } from '../hooks/useADRs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Save } from 'lucide-react';

export default function ADRForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    title: '',
    context: '',
    decision: '',
    positiveConsequences: '',
    negativeConsequences: '',
    alternativesConsidered: '',
  });

  const [errors, setErrors] = useState({});

  const { data: adr, isLoading: isLoadingADR } = useADR(id);
  const createADR = useCreateADR();
  const updateADR = useUpdateADR();

  useEffect(() => {
    if (isEditing && adr) {
      setFormData({
        title: adr.title || '',
        context: adr.context || '',
        decision: adr.decision || '',
        positiveConsequences: adr.positiveConsequences || '',
        negativeConsequences: adr.negativeConsequences || '',
        alternativesConsidered: adr.alternativesConsidered || '',
      });
    }
  }, [isEditing, adr]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Le titre est obligatoire.';
    }

    if (!formData.decision.trim()) {
      newErrors.decision = 'La décision est obligatoire.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      if (isEditing) {
        await updateADR.mutateAsync({ id, data: formData });
        navigate(`/adrs/${id}`);
      } else {
        const result = await createADR.mutateAsync(formData);
        navigate(`/adrs/${result.adr.id}`);
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      if (error.response?.data?.error) {
        setErrors({ general: error.response.data.error });
      }
    }
  };

  if (isEditing && isLoadingADR) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Chargement de l'ADR...</div>
      </div>
    );
  }

  const isLoading = createADR.isPending || updateADR.isPending;

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Link to={isEditing ? `/adrs/${id}` : '/adrs'}>
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
        </Link>
      </div>

      {/* Formulaire */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            {isEditing ? 'Modifier l\'ADR' : 'Créer un nouvel ADR'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.general && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600">{errors.general}</p>
              </div>
            )}

            {/* Titre */}
            <div className="space-y-2">
              <Label htmlFor="title">Titre *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Ex: Choix de la base de données"
                className={errors.title ? 'border-red-500' : ''}
              />
              {errors.title && (
                <p className="text-sm text-red-600">{errors.title}</p>
              )}
            </div>

            {/* Contexte */}
            <div className="space-y-2">
              <Label htmlFor="context">Contexte</Label>
              <Textarea
                id="context"
                value={formData.context}
                onChange={(e) => handleChange('context', e.target.value)}
                placeholder="Décrivez le contexte qui a mené à cette décision..."
                rows={4}
              />
            </div>

            {/* Décision */}
            <div className="space-y-2">
              <Label htmlFor="decision">Décision *</Label>
              <Textarea
                id="decision"
                value={formData.decision}
                onChange={(e) => handleChange('decision', e.target.value)}
                placeholder="Décrivez la décision prise..."
                rows={4}
                className={errors.decision ? 'border-red-500' : ''}
              />
              {errors.decision && (
                <p className="text-sm text-red-600">{errors.decision}</p>
              )}
            </div>

            {/* Conséquences positives */}
            <div className="space-y-2">
              <Label htmlFor="positiveConsequences">Conséquences positives</Label>
              <Textarea
                id="positiveConsequences"
                value={formData.positiveConsequences}
                onChange={(e) => handleChange('positiveConsequences', e.target.value)}
                placeholder="Listez les avantages de cette décision..."
                rows={3}
              />
            </div>

            {/* Conséquences négatives */}
            <div className="space-y-2">
              <Label htmlFor="negativeConsequences">Conséquences négatives</Label>
              <Textarea
                id="negativeConsequences"
                value={formData.negativeConsequences}
                onChange={(e) => handleChange('negativeConsequences', e.target.value)}
                placeholder="Listez les inconvénients de cette décision..."
                rows={3}
              />
            </div>

            {/* Alternatives considérées */}
            <div className="space-y-2">
              <Label htmlFor="alternativesConsidered">Alternatives considérées</Label>
              <Textarea
                id="alternativesConsidered"
                value={formData.alternativesConsidered}
                onChange={(e) => handleChange('alternativesConsidered', e.target.value)}
                placeholder="Listez les autres options qui ont été évaluées..."
                rows={3}
              />
            </div>

            {/* Boutons */}
            <div className="flex justify-end gap-4">
              <Link to={isEditing ? `/adrs/${id}` : '/adrs'}>
                <Button type="button" variant="outline">
                  Annuler
                </Button>
              </Link>
              <Button type="submit" disabled={isLoading}>
                <Save className="w-4 h-4 mr-2" />
                {isLoading ? 'Sauvegarde...' : 'Sauvegarder'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

