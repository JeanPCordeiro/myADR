import { useParams, useNavigate, Link } from 'react-router-dom';
import { useADR, useApproveADR, useRejectADR, useDeleteADR } from '../hooks/useADRs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Edit, Check, X, Trash2 } from 'lucide-react';
import { useState } from 'react';

const statusColors = {
  'Proposé': 'bg-yellow-100 text-yellow-800',
  'Accepté': 'bg-green-100 text-green-800',
  'Rejeté': 'bg-red-100 text-red-800',
  'Obsolète': 'bg-gray-100 text-gray-800',
};

export default function ADRDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  const { data: adr, isLoading, error } = useADR(id);
  const approveADR = useApproveADR();
  const rejectADR = useRejectADR();
  const deleteADR = useDeleteADR();

  const handleApprove = async () => {
    try {
      await approveADR.mutateAsync(id);
    } catch (error) {
      console.error('Erreur lors de l\'approbation:', error);
    }
  };

  const handleReject = async () => {
    try {
      await rejectADR.mutateAsync(id);
    } catch (error) {
      console.error('Erreur lors du rejet:', error);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet ADR ?')) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteADR.mutateAsync(id);
      navigate('/adrs');
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Chargement de l'ADR...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-red-600">
          Erreur lors du chargement de l'ADR: {error.message}
        </div>
      </div>
    );
  }

  if (!adr) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">ADR non trouvé</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Link to="/adrs">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à la liste
          </Button>
        </Link>
        <div className="flex gap-2">
          <Link to={`/adrs/${id}/edit`}>
            <Button variant="outline">
              <Edit className="w-4 h-4 mr-2" />
              Modifier
            </Button>
          </Link>
          {adr.status === 'Proposé' && (
            <>
              <Button 
                onClick={handleApprove}
                disabled={approveADR.isPending}
                className="bg-green-600 hover:bg-green-700"
              >
                <Check className="w-4 h-4 mr-2" />
                Approuver
              </Button>
              <Button 
                onClick={handleReject}
                disabled={rejectADR.isPending}
                variant="destructive"
              >
                <X className="w-4 h-4 mr-2" />
                Rejeter
              </Button>
            </>
          )}
          <Button 
            onClick={handleDelete}
            disabled={isDeleting}
            variant="destructive"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Supprimer
          </Button>
        </div>
      </div>

      {/* Contenu principal */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <CardTitle className="text-3xl">{adr.title}</CardTitle>
              <CardDescription className="mt-2 text-base">
                Créé le {new Date(adr.createdAt).toLocaleDateString('fr-FR')} • 
                Modifié le {new Date(adr.updatedAt).toLocaleDateString('fr-FR')}
              </CardDescription>
            </div>
            <Badge className={statusColors[adr.status] || 'bg-gray-100 text-gray-800'}>
              {adr.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Contexte */}
          {adr.context && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Contexte</h3>
              <p className="text-muted-foreground whitespace-pre-wrap">{adr.context}</p>
            </div>
          )}

          <Separator />

          {/* Décision */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Décision</h3>
            <p className="whitespace-pre-wrap">{adr.decision}</p>
          </div>

          {/* Conséquences */}
          {(adr.positiveConsequences || adr.negativeConsequences) && (
            <>
              <Separator />
              <div>
                <h3 className="text-lg font-semibold mb-4">Conséquences</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {adr.positiveConsequences && (
                    <div>
                      <h4 className="font-medium text-green-700 mb-2">Positives</h4>
                      <p className="text-muted-foreground whitespace-pre-wrap">
                        {adr.positiveConsequences}
                      </p>
                    </div>
                  )}
                  {adr.negativeConsequences && (
                    <div>
                      <h4 className="font-medium text-red-700 mb-2">Négatives</h4>
                      <p className="text-muted-foreground whitespace-pre-wrap">
                        {adr.negativeConsequences}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Alternatives considérées */}
          {adr.alternativesConsidered && (
            <>
              <Separator />
              <div>
                <h3 className="text-lg font-semibold mb-2">Alternatives considérées</h3>
                <p className="text-muted-foreground whitespace-pre-wrap">
                  {adr.alternativesConsidered}
                </p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

