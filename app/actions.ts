"use server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { ekskul, pendaftar, tambahPendaftar, JAM_SESI } from "@/data/ekskul";

export type HasilDaftar = {
  berhasil: boolean;
  pesan: string;
  galat: { nama?: string; kelas?: string };
  isian: { nama: string; kelas: string };
};

const sama = (a: string, b: string) =>
  a.trim().toLowerCase() === b.trim().toLowerCase();

export async function daftarEkskul(
  _sebelum: HasilDaftar,
  formData: FormData
): Promise<HasilDaftar> {
  const ekskulId = Number(formData.get("ekskulId"));
  const nama = String(formData.get("nama") ?? "").trim();
  const kelas = String(formData.get("kelas") ?? "").trim();
  const isian = { nama, kelas };

  // pura-pura server sibuk
  await new Promise((r) => setTimeout(r, 800));

  // galat per kolom
  const galat: HasilDaftar["galat"] = {};
  if (nama.length < 3) galat.nama = "Nama minimal 3 huruf.";
  if (kelas.length < 3) galat.kelas = "Kelas minimal 3 huruf.";
  if (Object.keys(galat).length > 0) {
    return { berhasil: false, pesan: "", galat, isian };
  }

  // galat aturan lain: satu pesan
  const target = ekskul.find((e) => e.id === ekskulId);
  if (!target) {
    return { berhasil: false, pesan: "Ekskul tidak ditemukan.", galat: {}, isian };
  }

  const sudah = pendaftar.some(
    (p) => p.ekskulId === ekskulId && sama(p.nama, nama) && sama(p.kelas, kelas)
  );
  if (sudah) {
    return {
      berhasil: false,
      pesan: `${nama} (${kelas}) sudah terdaftar di ${target.nama}.`,
      galat: {},
      isian,
    };
  }

  const terisi = pendaftar.filter((p) => p.ekskulId === ekskulId).length;
  if (terisi >= target.kuota) {
    return {
      berhasil: false,
      pesan: `Kuota ${target.nama} sudah penuh (${target.kuota} orang).`,
      galat: {},
      isian,
    };
  }

  const bentrok = pendaftar
    .filter((p) => p.ekskulId !== ekskulId && sama(p.nama, nama) && sama(p.kelas, kelas))
    .map((p) => ekskul.find((e) => e.id === p.ekskulId))
    .find((e) => e && e.hari === target.hari && e.sesi === target.sesi);
  if (bentrok) {
    return {
      berhasil: false,
      pesan: `Jadwal bentrok dengan ${bentrok.nama} (${bentrok.hari}, sesi ${bentrok.sesi}).`,
      galat: {},
      isian,
    };
  }

  const nomor = tambahPendaftar({ ekskulId, nama, kelas });

  const toples = await cookies();
  toples.set("nama", nama, { maxAge: 60 * 60 * 24 * 30 });
  toples.set("kelas", kelas, { maxAge: 60 * 60 * 24 * 30 });

  revalidatePath("/ekskul");
  revalidatePath(`/ekskul/${ekskulId}`);
  revalidatePath("/saya");

  return {
    berhasil: true,
    pesan: `Pendaftaran #${nomor} berhasil: ${target.nama}, ${target.hari}, sesi ${target.sesi} (${JAM_SESI[target.sesi]})`,
    galat: {},
    isian,
  };
}

//batalkan pendaftaran.
export async function batalkan(formData: FormData): Promise<void> {
  const nomor = Number(formData.get("nomor"));

  // identitas diambil dari cookie, bukan dari form, supaya tidak bisa dipalsukan
  const toples = await cookies();
  const nama = toples.get("nama")?.value ?? "";
  const kelas = toples.get("kelas")?.value ?? "";
  if (!nama || !kelas) return;

  
  const idx = pendaftar.findIndex(
    (p) => p.nomor === nomor && sama(p.nama, nama) && sama(p.kelas, kelas)
  );
  if (idx === -1) return;

  const { ekskulId } = pendaftar[idx];
  pendaftar.splice(idx, 1);

  revalidatePath("/saya");
  revalidatePath("/ekskul");
  revalidatePath(`/ekskul/${ekskulId}`);
}