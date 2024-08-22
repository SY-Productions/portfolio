import { useZState } from "@/app/states";
import { WorkSample } from "@prisma/client";

export default function PicSrcArray({ data }: { data: WorkSample[] }) {
  const { sampleWebIndex, sampleMobIndex, isWebFrame } = useZState();
  const mobile = data.filter((sample) => !sample.isWeb);
  const web = data.filter((sample) => sample.isWeb);
  return isWebFrame
    ? {
        id: web[sampleWebIndex].id,
        pics: web[sampleWebIndex].pictures.split(" "),
      }
    : {
        id: mobile[sampleMobIndex].id,
        pics: mobile[sampleMobIndex].pictures.split(" "),
      };
}
