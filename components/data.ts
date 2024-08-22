import { WorkSample } from "@prisma/client";

export default async function data() {
  const res = await fetch("http://localhost:3000/api");
  const data: WorkSample[] = await res.json();
  return data;
}
