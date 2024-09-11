import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

// Hook personalizado para lidar com erros
export function useErrorHandling() {
  const [errors, setErrors] = useState<[]>([]);
  const { toast } = useToast();

  function handleErrors(results: any) {
    if (results.status === 400) {
      if (Array.isArray(results.data?.message)) {
        setErrors(results.data.message);
        toast({
          title: 'Atenção',
          description: `Preencha os campos Obrigátorios`,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Atenção',
          description: `Erro: ${results.data.message}`,
          variant: 'destructive',
        });
      }
      return true;
    }
    return false;
  }

  return { errors, setErrors, handleErrors };
}
