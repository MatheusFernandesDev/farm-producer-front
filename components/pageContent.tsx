import { ThemeToggle } from "@/components/theme-toggle";
import { ModalProducer } from "@/components/modal";
import { CardMetric as Card } from "@/components/card";
import { PiFarmLight } from "react-icons/pi";
import { PieChartComponent } from "@/components/pieChart";
import { PieChartComponentObjects } from "@/components/pieChartCultural";
import { PageContentProps } from "@/interface/IPageContent";


export const PageContent = ({ crops, data }: PageContentProps) => {
  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Dashboard Produtor Agrícola</h1>
        <ThemeToggle />
        <div className="flex justify-center">
          <ModalProducer crops={crops} />
        </div>
      </div>

      {/* Cards com métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        <Card title="Total de Fazendas em Quantidade" count={data?.totalFarms} icon={<PiFarmLight size={25} />} />
        <Card title="Total de Fazendas em Hectares (Área total)" count={data?.totalHectares} icon={<PiFarmLight size={25} />} />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <PieChartComponent title="Gráfico por Estado" data={data?.farmsByState} />
        <PieChartComponentObjects title="Gráfico por Cultura" data={data?.cropCounts} />
        <PieChartComponentObjects title="Gráfico (Área agricultável e vegetação)" data={data?.landUsage} />
      </div>
    </div>
  );
};
