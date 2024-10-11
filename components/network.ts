export default async function fetchWorkSamples() {
    const res = await fetch(
      "https://youdexsof-backend.liara.run/api/worksamples"
    );
    const data: WorkSample[] = await res.json();
    return data;
}
