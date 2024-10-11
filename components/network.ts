export default async function fetchWorkSamples() {
  try {
    const res = await fetch(
      "https://youdexsof-backend.liara.run/api/worksamples"
    );
    const data: WorkSample[] = await res.json();
    return data;
  } catch (e) {
    return [];
  }
}
