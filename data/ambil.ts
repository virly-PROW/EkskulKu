import { ekskul, pendaftar } from "@/data/ekskul";

// pura-pura mengambil data dari database yang agak lambat
function jeda(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function ambilSemuaEkskul() {
  await jeda(1000);
//   throw new Error("database sedang mati");
  return ekskul;
}

export async function ambilEkskul(id: number) {
  await jeda(500);
  return ekskul.find((e) => e.id === id);
}


//daftar anggota satu ekskjul, urut nomor pendaftaran
export async function ambilAnggota(ekskulId: number) {
  await jeda(1500);
  return pendaftar.filter(
    (p) => p.ekskulId === ekskulId).sort((a, b) => a.nomor -b.nomor);

}

// jumlah pendafatar satu ekskul tanpa jeasa di pakai di kartu
export function hitungPendaftar(ekskulId: number) {
  return pendaftar.filter((p) => p.ekskulId === ekskulId).length;
}