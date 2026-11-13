import { DAFTAR_KATEGORI, DAFTAR_HARI } from "@/data/ekskul";

type Props = { kategori: string; hari: string };

export default function KontrolEkskul({ kategori, hari }: Props) {
  return (
    <form className="mb-4 flex flex-wrap items-center gap-3">
      <select
        name="kategori"
        defaultValue={kategori}
        className="rounded border bg-white px-3 py-2"
      >
        <option value="">Semua kategori</option>
        {DAFTAR_KATEGORI.map((k) => (
          <option key={k} value={k}>
            {k}
          </option>
        ))}
      </select>
      <select
        name="hari"
        defaultValue={hari}
        className="rounded border bg-white px-3 py-2"
      >
        <option value="">Semua hari</option>
        {DAFTAR_HARI.map((h) => (
          <option key={h} value={h}>
            {h}
          </option>
        ))}
      </select>
      <button className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
        Terapkan
      </button>
    </form>
  );
}