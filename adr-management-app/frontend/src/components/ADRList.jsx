import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useADRs } from '../hooks/useADRs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Filter } from 'lucide-react';

const statusColors = {
  'Proposé': 'bg-yellow-100 text-yellow-800',
  'Accepté': 'bg-green-100 text-green-800',
  'Rejeté': 'bg-red-100 text-red-800',
  'Obsolète': 'bg-gray-100 text-gray-800',
};

export default function ADRList() {
  const [filters, setFilters] = useState({
    status: '',
    search: '',
  });

  const { data: adrs = [], isLoading, error } = useADRs(filters);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const filteredADRs = adrs.filter(adr => {
    const matchesSearch = !filters.search || 
      adr.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      adr.decision.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesStatus = !filters.status || adr.status === filters.status;
    
    return matchesSearch && matchesStatus;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Chargement des ADR...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-red-600">
          Erreur lors du chargement des ADR: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Architecture Decision Records</h1>
          <p className="text-muted-foreground">
            Gérez et consultez les décisions architecturales de votre organisation
          </p>
        </div>
        <Link to="/adrs/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nouvel ADR
          </Button>
        </Link>
      </div>

      {/* Filtres */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Filtres
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Rechercher par titre ou décision..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tous les statuts</SelectItem>
                <SelectItem value="Proposé">Proposé</SelectItem>
                <SelectItem value="Accepté">Accepté</SelectItem>
                <SelectItem value="Rejeté">Rejeté</SelectItem>
                <SelectItem value="Obsolète">Obsolète</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Liste des ADR */}
      <div className="grid gap-4">
        {filteredADRs.length === 0 ? (
          <Card>
            <CardContent className="flex items-center justify-center h-32">
              <div className="text-center">
                <p className="text-muted-foreground">Aucun ADR trouvé</p>
                <Link to="/adrs/new">
                  <Button variant="outline" className="mt-2">
                    Créer le premier ADR
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          filteredADRs.map((adr) => (
            <Card key={adr.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-xl">
                      <Link 
                        to={`/adrs/${adr.id}`}
                        className="hover:text-primary transition-colors"
                      >
                        {adr.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className="mt-2">
                      {adr.decision.length > 150 
                        ? `${adr.decision.substring(0, 150)}...` 
                        : adr.decision
                      }
                    </CardDescription>
                  </div>
                  <Badge className={statusColors[adr.status] || 'bg-gray-100 text-gray-800'}>
                    {adr.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>
                    Créé le {new Date(adr.createdAt).toLocaleDateString('fr-FR')}
                  </span>
                  <span>
                    Modifié le {new Date(adr.updatedAt).toLocaleDateString('fr-FR')}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

