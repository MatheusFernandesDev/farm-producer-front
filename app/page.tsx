'use client';

import { useDashboardData } from '@/hooks/useDashboardData';
import { PageContent } from '@/components/pageContent';
import { CardSkeleton, ChartSkeleton } from "@/components/skeletons"; 

const Page = () => {
  const { crops, data, error, loading } = useDashboardData();

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 border-2 mt-5">
      {loading ? (
        <>
          <CardSkeleton />
          <ChartSkeleton />
        </>
      ) : error ? (
        <div className="text-red-600 text-center">{error}</div>
      ) : (
        <PageContent crops={crops} data={data} />
      )}
    </div>
  );
};

export default Page;
