import { hitungPendaftar } from "@/data/ambil";
import { DAFTAR_KATEGORI, DAFTAR_HARI, type Ekskul } from "@/data/ekskul";
import KartuEkskul from "./KartuEkskul";
import KontrolEkskul from "./KontrolEkskul";

function ambil(v: string | string[] | undefined) {
  return Array.isArray(v) ? v[0] : v;
}

export default function KatalogEkskul({
  semua,
  sp,
}: {
  semua: Ekskul[];
  sp: { [key: string]: string | string[] | undefined };
}) {
  // nilai aneh di URL diabaikan, bukan bikin galat
  const kategori = DAFTAR_KATEGORI.find((k) => k === ambil(sp.kategori)) ?? "";
  const hari = DAFTAR_HARI.find((h) => h === ambil(sp.hari)) ?? "";

  const hasil = semua.filter(
    (e) =>
      (kategori === "" || e.kategori === kategori) &&
      (hari === "" || e.hari === hari)
  );

  return (
    <div>
      <KontrolEkskul kategori={kategori} hari={hari} />
      <p className="mb-3 text-sm text-slate-500">
        {hasil.length} ekskul ditemukan
      </p>
      {hasil.length === 0 ? (
        <p className="text-slate-500">Tidak ada ekskul yang cocok.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {hasil.map((e) => (
            <KartuEkskul key={e.id} item={e} terdaftar={hitungPendaftar(e.id)} />
          ))}
        </div>
      )}
    </div>
  );
}