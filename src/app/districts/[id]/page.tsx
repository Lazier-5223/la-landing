import { notFound } from "next/navigation";
import { CoreHardMetricsDashboard } from "@/components/CoreHardMetricsDashboard";
import { getDistrictById } from "@/data/districts";
import { DistrictDetailClient } from "./DistrictDetailClient";

type Props = {
  params: { id: string };
};

export default function DistrictDetailPage({ params }: Props) {
  const district = getDistrictById(params.id);
  if (!district) notFound();
  return (
    <DistrictDetailClient district={district}>
      <CoreHardMetricsDashboard district={district} />
    </DistrictDetailClient>
  );
}
