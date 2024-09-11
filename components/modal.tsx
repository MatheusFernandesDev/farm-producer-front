'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import TextInput from "./textInput";
import { Server } from "@/services/server";
import { ICropPlanted } from "@/interface/ICropPlanted";
import { CheckboxInput } from "./checkboxInput";
import { useProducerForm } from "@/hooks/useProducerForm";
import { useErrorHandling } from "@/hooks/useErrorHandling";
import { toast } from "@/hooks/use-toast";
import { CardSkeleton, ChartSkeleton } from "@/components/skeletons"; 
import { IModal } from '@/interface/IModal';



export function ModalProducer({ crops }: IModal) {
  const server = Server();
  const { errors, handleErrors } = useErrorHandling();
  const [loading, setLoading] = useState(false); 
  const {
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
    createProducer
  } = useProducerForm();

  async function saveHandler() {
    const producer = createProducer();
    setLoading(true); 
  
    try {
      const results = await server.addProducer(producer);
      if (handleErrors(results)) return;

      clearForm();
      toast({
        title: "Produtor Criado",
        description: "O produtor foi criado com sucesso!",
        className: 'bg-green-500'
      });

      setTimeout(() => {
        window.location.href = "/";
      }, 2000); 
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Sheet >
      <SheetTrigger asChild>
        <Button variant="outline" >Adicionar Produtor Rural</Button>
      </SheetTrigger>
      <SheetContent className="bg-white dark:bg-black overflow-auto">
        <SheetHeader>
          <SheetTitle>Criar Produtor Rural</SheetTitle>
        </SheetHeader>

        {loading ? (
          
          <>
            <CardSkeleton />
            <ChartSkeleton />
          </>
        ) : (
          <div className="flex flex-col gap-y-1 mt-2">
            <TextInput
              name_field="CPF/CNPJ"
              name_placeholder="ex: 000.000.00-00"
              value={cpfCnpj}
              errors={errors}
              params="cpf_cnpj"
              onChange={(event) => setCpfCnpj(event.target.value)}
            />
            <TextInput
              name_field="Nome do Produtor"
              name_placeholder="ex: Matheus Fernandes"
              value={nameProducer}
              errors={errors}
              params="producer_name"
              onChange={(event) => setNameProducer(event.target.value)}
            />
            <TextInput
              name_field="Nome da Fazenda"
              name_placeholder="ex: Fazenda do Matheus"
              value={nameFarm}
              errors={errors}
              params="farm_name"
              onChange={(event) => setNameFarm(event.target.value)}
            />
            <TextInput
              name_field="Cidade"
              name_placeholder="ex: São Paulo"
              value={city}
              errors={errors}
              params="city"
              onChange={(event) => setCity(event.target.value)}
            />
            <TextInput
              name_field="Estado"
              name_placeholder="ex: RJ"
              value={state}
              errors={errors}
              params="state"
              onChange={(event) => setState(event.target.value)}
            />
            <TextInput
              name_field="Área total em hectares da fazenda"
              name_placeholder="ex: 100"
              value={hectaresFarm}
              errors={errors}
              params="total_area_hectares"
              onChange={(event) => setHectaresFarm(event.target.value)}
            />
            <TextInput
              name_field="Área agricultável em hectares"
              name_placeholder="ex: 50"
              value={hectaresCultivation}
              errors={errors}
              params="cultivated_area_hectares"
              onChange={(event) => setHectaresCultivation(event.target.value)}
            />
            <TextInput
              name_field="Área de vegetação em hectares"
              name_placeholder="ex: 20"
              value={hectaresVegetation}
              errors={errors}
              params="vegetation_area_hectares"
              onChange={(event) => setHectaresVegetation(event.target.value)}
            />

            <span className="flex flex-col gap-5">
              <label className="flex justify-center mt-4">Culturas Plantadas</label>
              <div className="flex flex-wrap">
                {crops?.map((element: ICropPlanted) => (
                  <div key={element.id} className="w-1/3 p-2">
                    <CheckboxInput
                      id={element.id}
                      name={element.crop_name}
                      checked={selectedCrops.includes(element.id)}
                      onChange={handleCheckboxChange}
                    />
                  </div>
                ))}
              </div>
            </span>
          </div>
        )}

        {!loading && (
          <SheetFooter className="mt-4">
            <Button className="w-full" onClick={saveHandler}>Confirmar</Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
