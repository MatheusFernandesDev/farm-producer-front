import { useState, useEffect } from 'react';
import { Server } from '@/services/server';
import { useToast } from '@/hooks/use-toast';
import { ICropPlanted } from '@/interface/ICropPlanted';

export const useDashboardData = () => {
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [crops, setCrops] = useState<ICropPlanted[]>([]);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const server = Server();

      try {
        const cropsResponse: ICropPlanted[] = await server.getCropsPlanted();
        setCrops(cropsResponse);
        toast({
          title: 'Sucesso!',
          description: 'Dados de culturas carregados com sucesso.',
          className: 'bg-green-500',
        });

        const dashboardResponse = await server.getDashboard();
        setData(dashboardResponse);
      } catch (err: any) {
        setError(`Erro ao carregar dados: ${err.message}`);
        toast({
          title: 'Erro',
          description: `Falha ao carregar dados`,
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [toast]);

  return { crops, data, error, loading };
};
