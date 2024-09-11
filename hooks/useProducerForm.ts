import { useState } from 'react';
import { IProducer } from '@/interface/IProducer';

// Hook personalizado para lidar com o formulário do produtor
export function useProducerForm() {
  const [cpfCnpj, setCpfCnpj] = useState<string>('');
  const [nameProducer, setNameProducer] = useState<string>('');
  const [nameFarm, setNameFarm] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [hectaresFarm, setHectaresFarm] = useState<string>('');
  const [hectaresCultivation, setHectaresCultivation] = useState<string>('');
  const [hectaresVegetation, setHectaresVegetation] = useState<string>('');
  const [selectedCrops, setSelectedCrops] = useState<string[]>([]);

  // Função para limpar o formulário
  function clearForm() {
    setCpfCnpj('');
    setNameProducer('');
    setNameFarm('');
    setCity('');
    setState('');
    setHectaresFarm('');
    setHectaresCultivation('');
    setHectaresVegetation('');
    setSelectedCrops([]);
  }

  // Função para manipular mudanças no checkbox
  function handleCheckboxChange(id: string, isChecked: boolean) {
    setSelectedCrops((prevSelected) => {
      if (isChecked) {
        return [...prevSelected, id];
      } else {
        return prevSelected.filter((selectedId) => selectedId !== id);
      }
    });
  }

  // Função para criar o objeto produtor
  function createProducer(): IProducer {
    return {
      cpf_cnpj: cpfCnpj,
      producer_name: nameProducer,
      farm_name: nameFarm,
      city,
      state,
      total_area_hectares: parseInt(hectaresFarm),
      cultivated_area_hectares: parseInt(hectaresCultivation),
      vegetation_area_hectares: parseInt(hectaresVegetation),
      crops: selectedCrops.map((crop) => crop),
      status: 0,
      data: undefined,
    };
  }

  return {
    cpfCnpj,
    setCpfCnpj,
    nameProducer,
    setNameProducer,
    nameFarm,
    setNameFarm,
    city,
    setCity,
    state,
    setState,
    hectaresFarm,
    setHectaresFarm,
    hectaresCultivation,
    setHectaresCultivation,
    hectaresVegetation,
    setHectaresVegetation,
    selectedCrops,
    clearForm,
    handleCheckboxChange,
    createProducer,
  };
}
