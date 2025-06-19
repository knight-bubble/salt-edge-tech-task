import { ChartAreaInteractive } from "./chart-area-interactive";
import { DataTable } from "./data-table";
import data from "./data.json" with { type: "json" };
import { SectionCards } from "./section-cards";

export const Dashboard = () => {
  return (
    <div className='@container/main flex flex-1 flex-col gap-2'>
      <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>
        <SectionCards />
        <div className='px-4 lg:px-6'>
          <ChartAreaInteractive />
        </div>
        <DataTable data={data} />
      </div>
    </div>
  );
};
