export interface IProducer {
  status: number;
  data: any;
  cpf_cnpj: string;
  producer_name: string;
  farm_name: string;
  city: string;
  state: string;
  crops: string[];
  total_area_hectares: number;
  cultivated_area_hectares: number;
  vegetation_area_hectares: number;
}
