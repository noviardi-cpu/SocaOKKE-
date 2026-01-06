
import { AgeGroup, ThemeExplanation } from './types';

export const SYSTEM_PROMPT = `Anda adalah "SocaPAUD" (Social & Culture Assistant for PAUD), asisten pedagogis cerdas yang menerapkan Model OKKE (Orkestrasi Kurikulum & Kearifan Etnopedagogi). 

PENGEMBANG: Sistem ini dikembangkan oleh Huriah Rachmah, PG PAUD, Unisba.

IDENTITAS & LANDASAN TEORI:
1. Teori Pendidikan IPS Prof. Nu'man Somantri (1994): Penyederhanaan disiplin ilmu sosial yang diorganisasikan secara ilmiah dan psikologis (Psychological Organization).
2. Regulasi Permendikdasmen No. 13 Tahun 2025: Mengutamakan Pembelajaran Mendalam (Deep Learning), Suasana Menggembirakan (Joyful Learning), dan penguatan Profil Pelajar Pancasila.

RUANG LINGKUP MATERI (Ubah Tema Umum -> Perspektif IPS):
- DIRIKU & KELUARGAKU (Sosiologi/Sejarah) -> Konsep "Peran & Identitas".
- LINGKUNGAN SEKITAR (Geografi/Ekonomi) -> Konsep "Interaksi Ruang & Transaksi".
- PEKERJAAN/PROFESI (Ekonomi/Civics) -> Konsep "Produksi, Distribusi, & Jasa".
- NEGARAKU & BUDAYAKU (Antropologi/Civics) -> Konsep "Nilai, Norma & Keragaman".

PROTOKOL MODEL OKKE:
1. O - ORKESTRASI: Hubungkan tema dengan disiplin ilmu sosial. WAJIB gunakan kalimat: "Mengacu pada prinsip penyederhanaan konsep [Sebutkan Ilmunya] ala Prof. Nu'man Somantri..."
2. K - KURIKULUM: Validasi ke elemen CP Fase Fondasi (Nilai Agama, Jati Diri, Literasi/Sains) & Profil Pelajar Pancasila.
3. K - KEARIFAN: Kontekstualisasi lokal berdasarkan Desa/Kelurahan, Kecamatan, Kota/Kabupaten, dan Provinsi. JIKA LOKASI TIDAK LENGKAP, INGATKAN PENGGUNA.
4. E - ETNOPEDAGOGI: Sesuai Matriks Usia Granular:
   - 0-2 thn (TPA): Sensori-Motorik (Stimulasi Indra, Trust).
   - 2-4 thn (Kober): Pra-Operasional Awal (Simbolik, Kemandirian, Main Peran Mikro).
   - 4-5 thn (TK A): Pra-Operasional Akhir (Intuitif, Aturan Sederhana, Interaksi Sosial).
   - 5-6 thn (TK B): Pra-Operasional Akhir (Kerjasama Tim, Problem Solving).
   Patuhi PANTANGAN (No Calistung rumit, No aturan mengekang).

FORMAT OUTPUT (WAJIB):
1. Sapaan & Konfirmasi (Lokasi Lengkap & Jenjang Usia Spesifik).
2. Analisis Konsep Sosial (Teori Prof. Nu'man Somantri).
3. Koneksi Regulasi (Permendikdasmen 13/2025).
4. Rencana Kegiatan OKKE: Langkah konkret "Joyful Learning" sesuai usia.`;

export const THEMES = [
  "Diriku & Keluargaku",
  "Lingkungan Sekitar",
  "Pekerjaan/Profesi",
  "Negaraku & Budayaku",
  "Air, Udara, Api",
  "Binatang",
  "Tanaman",
  "Kendaraan"
];

export const MODEL_OKKE_INFO = {
  shortDefinition: "Model OKKE: Sinergi cerdas Kurikulum Nasional (K) & Kearifan (K) Etnopedagogi (E) melalui Orkestrasi (O) AI.",
  definition: "Model OKKE (Orkestrasi Kurikulum & Kearifan Etnopedagogi) adalah kerangka kerja inovatif berbasis AI Generatif yang dirancang untuk membantu guru PAUD menyederhanakan disiplin ilmu sosial menjadi konten yang 'Developmentally Appropriate' bagi anak usia dini, sekaligus mengintegrasikan identitas budaya lokal secara otomatis.",
  pillars: [
    { id: 'O', name: 'Orkestrasi', desc: 'Penyederhanaan disiplin ilmu sosial (Ekonomi, Geografi, Sejarah, Sosiologi, Antropologi, Civics) menjadi materi bermain yang bermakna bagi anak (Ala Prof. Nu\'man Somantri).' },
    { id: 'K', name: 'Kurikulum', desc: 'Standar kualitas dan regulasi nasional yang tertuang dalam Permendikdasmen No. 13 Tahun 2025 untuk memastikan capaian pembelajaran fondasi terpenuhi.' },
    { id: 'K', name: 'Kearifan', desc: 'Pemanfaatan data Geo-tagging dan akuisisi konten lokal (Lagu, Makanan, Tradisi) untuk menjadikan pembelajaran kontekstual dengan lingkungan anak.' },
    { id: 'E', name: 'Etnopedagogi', desc: 'Landasan pendidikan yang berbasis pada nilai-nilai budaya lokal untuk membangun karakter, jati diri, dan etika sosial anak sejak dini.' }
  ]
};

export const THEORY_IPS = {
  shortDefinition: "IPS Prof. Nu'man Somantri: Organisasi disiplin ilmu sosial secara Ilmiah & Psikologis untuk pendidikan.",
  definition: "Pendidikan IPS menurut Prof. Nu'man Somantri adalah penyederhanaan atau adaptasi dari berbagai disiplin ilmu-ilmu sosial dan humaniora yang diorganisasikan secara ilmiah dan psikologis (Psychological Organization) untuk tujuan pendidikan, disesuaikan dengan tingkat perkembangan mental anak agar relevan dengan realitas sosial.",
  paudRelevance: "Di jenjang PAUD, teori ini diimplementasikan dengan mengubah struktur ilmu sosial yang kompleks menjadi 'Kegiatan Dasar Manusia' yang dapat dipahami melalui panca indra and interaksi sosial sederhana."
};

export const STPPA_INFO = {
  title: "Standar Tingkat Pencapaian Perkembangan Anak (STPPA)",
  regulation: "Permendikbudristek No. 5 Tahun 2022",
  definition: "Kriteria minimal tentang kualifikasi perkembangan anak usia dini (0-6 tahun) yang menjadi acuan standar kompetensi lulusan.",
  focus: "Mencakup 8 aspek perkembangan yang terintegrasi untuk memastikan anak berkembang optimal melalui kegiatan bermain.",
  description: "STPPA PAUD terbaru mengacu pada Permendikbudristek No. 5 Tahun 2022 tentang Standar Kompetensi Lulusan (SKL) PAUD, yang menetapkan 8 Aspek Perkembangan Anak sebagai acuan minimal pencapaian anak usia dini (0-6 tahun), menggantikan Permendikbud 137 tahun 2014, dan menjadi dasar pengembangan Kurikulum Merdeka.",
  difference: "STPPA PAUD terbaru (Permendikbudristek No. 5/2022) menggantikan Permendikbud No. 137 Tahun 2014 yang sudah tidak berlaku. STPPA menjadi Standar Kompetensi Lulusan (SKL) dalam Kurikulum Merdeka.",
  usage: "Pendidik dan orang tua menggunakan STPPA sebagai panduan untuk merancang pembelajaran dan memantau perkembangan anak di setiap kelompok usia (0-1, 1-2, 2-3, 3-4, 4-5, 5-6 tahun).",
  aspects: [
    { name: "Nilai Agama & Moral", icon: "🕌", desc: "Mengenal Tuhan, doa, dan perilaku jujur." },
    { name: "Pancasila", icon: "🇮🇩", desc: "Identitas bangsa, gotong royong, dan cinta tanah air." },
    { name: "Fisik Motorik", icon: "🏃", desc: "Gerak kasar, halus, dan kesehatan tubuh." },
    { name: "Kognitif", icon: "🧠", desc: "Berpikir logis, simbolik, dan pemecahan masalah." },
    { name: "Bahasa", icon: "🗣️", desc: "Literasi dini dan mengungkapkan perasaan." },
    { name: "Sosial Emosional", icon: "🤝", desc: "Kemandirian, empati, dan regulasi diri." },
    { name: "Kreativitas", icon: "🎨", desc: "Ekspresi seni, imajinasi, dan karya orisinal." },
    { name: "Pengetahuan", icon: "📖", desc: "Mengenal lingkungan sosial, alam, dan teknologi." }
  ]
};

export const STPPA_AGE_DETAILS: Record<AgeGroup, any> = {
  [AgeGroup.TPA_0_1]: {
    summary: "Stimulasi sensori-motorik dan pembentukan rasa percaya (Basic Trust).",
    milestones: [
      { aspect: "Agama & Moral", detail: "Merespon sentuhan kasih sayang dan suara doa/nyanyian religi." },
      { aspect: "Pancasila", detail: "Merespon kedekatan figur pengasuh sebagai bentuk rasa aman dini." },
      { aspect: "Fisik Motorik", detail: "Mengangkat kepala, berguling, dan merangkak menuju benda." },
      { aspect: "Kognitif", detail: "Mengenali wajah orang terdekat dan mencari benda yang disembunyikan." },
      { aspect: "Bahasa", detail: "Berceloteh (babbling) and menoleh jika namanya dipanggil." },
      { aspect: "Sosial Emosional", detail: "Menunjukkan rasa senang dengan senyum sosial (social smile)." },
      { aspect: "Kreativitas", detail: "Tertarik pada warna cerah dan bunyi musik yang berirama lembut." },
      { aspect: "Pengetahuan", detail: "Mengeksplorasi benda dengan memasukkannya ke mulut (oral stage)." }
    ]
  },
  [AgeGroup.TPA_1_2]: {
    summary: "Eksplorasi fisik mandiri dan pengenalan identitas diri.",
    milestones: [
      { aspect: "Agama & Moral", detail: "Meniru gerakan doa sederhana dan perilaku santun (ciuman tangan)." },
      { aspect: "Pancasila", detail: "Mulai mengenal anggota keluarga inti sebagai bagian kelompoknya." },
      { aspect: "Fisik Motorik", detail: "Berjalan dengan mantap dan mulai bisa memegang sendok sendiri." },
      { aspect: "Kognitif", detail: "Mengenal konsep satu-banyak dan menyebutkan beberapa nama benda." },
      { aspect: "Bahasa", detail: "Mengucapkan kata tunggal bermakna untuk menyatakan keinginan." },
      { aspect: "Sosial Emosional", detail: "Menunjukkan rasa memiliki terhadap mainan atau benda pribadi." },
      { aspect: "Kreativitas", detail: "Mencoret-coret bebas di atas kertas menggunakan alat tulis." },
      { aspect: "Pengetahuan", detail: "Mengenal fungsi sederhana benda di rumah (misal: sisir untuk rambut)." }
    ]
  },
  [AgeGroup.KOBER_2_3]: {
    summary: "Fase simbolik awal, pengembangan bahasa ekspresif, dan regulasi emosi.",
    milestones: [
      { aspect: "Agama & Moral", detail: "Mengikuti bacaan doa pendek sebelum dan sesudah aktivitas." },
      { aspect: "Pancasila", detail: "Mulai mau berbagi mainan dengan teman (dengan dorongan pengasuh)." },
      { aspect: "Fisik Motorik", detail: "Melompat di tempat dan menyusun menara balok hingga 6 tingkat." },
      { aspect: "Kognitif", detail: "Mengelompokkan benda berdasarkan warna primer dan bentuk dasar." },
      { aspect: "Bahasa", detail: "Berbicara dengan kalimat 2-3 kata dan bertanya 'apa ini?'." },
      { aspect: "Sosial Emosional", detail: "Mulai menunjukkan kemandirian 'aku bisa sendiri' (Toilet training)." },
      { aspect: "Kreativitas", detail: "Bernyanyi lagu anak-anak secara utuh dengan gerakan tubuh spontan." },
      { aspect: "Pengetahuan", detail: "Mengenal anggota tubuh dan fungsinya secara sederhana." }
    ]
  },
  [AgeGroup.KOBER_3_4]: {
    summary: "Kematangan koordinasi dan penguatan imajinasi sosial (Play-acting).",
    milestones: [
      { aspect: "Agama & Moral", detail: "Membiasakan ucap salam, maaf, tolong, dan terima kasih." },
      { aspect: "Pancasila", detail: "Mengenal simbol-simbol sederhana dari lingkungan (misal: bendera)." },
      { aspect: "Fisik Motorik", detail: "Berdiri satu kaki (2-3 detik) dan mulai bisa mengayuh sepeda roda tiga." },
      { aspect: "Kognitif", detail: "Menyebutkan angka 1-5 dan membedakan tekstur kasar-halus." },
      { aspect: "Bahasa", detail: "Menceritakan kembali pengalaman sederhana yang baru dialami." },
      { aspect: "Sosial Emosional", detail: "Senang bermain peran mikro (meniru aktivitas orang dewasa)." },
      { aspect: "Kreativitas", detail: "Membuat bentuk dari plastisin/lempung sesuai imajinasinya." },
      { aspect: "Pengetahuan", detail: "Mengenal hewan dan tanaman yang ada di sekitar rumah/sekolah." }
    ]
  },
  [AgeGroup.TK_A]: {
    summary: "Interaksi sosial kooperatif, berpikir intuitif, dan keaksaraan awal.",
    milestones: [
      { aspect: "Agama & Moral", detail: "Melakukan ibadah harian secara mandiri dan mengenal hari besar agama." },
      { aspect: "Pancasila", detail: "Bangga menggunakan identitas daerah (bahasa/baju) dalam kegiatan." },
      { aspect: "Fisik Motorik", detail: "Memegang pensil dengan benar dan menggunting mengikuti pola garis." },
      { aspect: "Kognitif", detail: "Mengurutkan benda dari terkecil ke terbesar dan mengenal pola ABCD." },
      { aspect: "Bahasa", detail: "Menjawab pertanyaan terbuka dan mengenal huruf vokal secara visual." },
      { aspect: "Sosial Emosional", detail: "Mampu bekerjasama dalam kelompok kecil dan menaati aturan main." },
      { aspect: "Kreativitas", detail: "Menggambar dengan detail yang lebih lengkap (ada kepala, tangan, kaki)." },
      { aspect: "Pengetahuan", detail: "Mengenal konsep waktu (pagi, siang, malam) dan cuaca sederhana." }
    ]
  },
  [AgeGroup.TK_B]: {
    summary: "Pemecahan masalah, kerjasama tim, dan kesiapan transisi sekolah (SD).",
    milestones: [
      { aspect: "Agama & Moral", detail: "Menghargai perbedaan agama teman dan menjaga kebersihan alam." },
      { aspect: "Pancasila", detail: "Berpartisipasi dalam musyawarah kelas untuk menentukan permainan." },
      { aspect: "Fisik Motorik", detail: "Melakukan gerakan senam terkoordinasi dan menulis kalimat pendek." },
      { aspect: "Kognitif", detail: "Mengenal lambang bilangan 1-20 dan memecahkan puzzle 12 keping." },
      { aspect: "Bahasa", detail: "Membaca kata sederhana dan berani tampil bercerita di depan kelas." },
      { aspect: "Sosial Emosional", detail: "Menyelesaikan konflik sederhana dengan teman secara damai." },
      { aspect: "Kreativitas", detail: "Membuat karya seni terintegrasi dari bahan alam/daur ulang." },
      { aspect: "Pengetahuan", detail: "Mengenal teknologi sederhana dan peran berbagai profesi di masyarakat." }
    ]
  }
};

export const THEME_EXPLANATIONS: Record<string, ThemeExplanation> = {
  "Diriku & Keluargaku": {
    title: "Diriku & Keluargaku",
    discipline: "Sosiologi & Sejarah",
    concept: "Peran & Identitas Sosial",
    description: "Tema ini menyederhanakan disiplin Sosiologi menjadi pengenalan peran diri dalam keluarga dan disiplin Sejarah melalui silsilah (asal-usul).",
    somantriInsight: "IPS dimulai dari 'Inner Circle' (lingkungan terdekat). Memahami silsilah adalah bentuk awal literasi sejarah bagi anak.",
    okkeRelevance: "Menggabungkan Kurikulum Jati Diri dengan kearifan lokal tentang nilai kesantunan (Adab) dalam keluarga sebagai unit sosiologis terkecil.",
    paudImplementation: "Kegiatan seperti membuat Pohon Silsilah menggunakan foto keluarga atau mendramatisasi peran Ayah/Ibu membantu anak memahami struktur sosial secara psikologis.",
    psychologicalContext: `
**Perspektif Teoretis:**
- **Piaget:** Anak berada pada transisi dari *Sensorimotor* (0-2) ke *Pra-Operasional* (2-6). Awalnya anak memahami keluarga hanya lewat kehadiran fisik, lalu mulai memahami simbol peran (Ibu sebagai pemberi makan).
- **Vygotsky:** Keluarga adalah *Zone of Proximal Development* (ZPD) pertama. Scaffolding terjadi saat orang tua membantu anak melakukan kegiatan harian, membentuk identitas sosial melalui interaksi bahasa.
- **Al-Ghazali:** Penanaman *Fitrah* melalui keteladanan orang tua. Anak meniru (*Ta'lid*) akhlak anggota keluarga. Relasi anak-orang tua adalah fondasi pembentukan karakter (*Riyadhah an-Nafs*).

**Breaking Down per Usia:**
- **0-1 th:** Fokus pada *Attachment* (Kepekatan). Memahami wajah pengasuh sebagai pusat dunia sosialnya.
- **1-2 th:** Mengenali nama sendiri dan anggota keluarga terdekat. Eksplorasi kepemilikan ("Milikku").
- **2-3 th:** Mulai meniru kegiatan rumah tangga sederhana (menyapu, mencuci piring mainan).
- **3-4 th:** Memahami peran spesifik (Ayah bekerja, Adik tidur). Munculnya rasa bangga terhadap keluarga.
- **4-5 th:** Mampu menceritakan silsilah sederhana (Kakek, Nenek) dan asal-usul tempat tinggal keluarga.
- **5-6 th:** Memahami hak dan kewajiban setiap anggota keluarga serta pentingnya tolong-menolong (*Gotong Royong*).`
  },
  "Lingkungan Sekitar": {
    title: "Lingkungan Sekitar",
    discipline: "Geografi & Ekonomi",
    concept: "Interaksi Ruang & Transaksi",
    description: "Menyederhanakan konsep Spasial (Geografi) menjadi navigasi rumah-sekolah dan Ekonomi menjadi interaksi transaksi sederhana.",
    somantriInsight: "Lingkungan adalah 'Laboratorium Sosial' bagi anak. Navigasi ruang adalah awal pemahaman geografi politik dan sosial.",
    okkeRelevance: "Kearifan lokal masuk melalui pengenalan adab bertetangga dan istilah arah lokal (misal: 'Kaler/Kidul' atau 'Lor/Kidul').",
    paudImplementation: "Membuat denah 'Jalan Kebaikan' dari rumah ke sekolah atau simulasi pasar lokal untuk mengenal nilai barang dan jasa.",
    psychologicalContext: `
**Perspektif Teoretis:**
- **Piaget:** Pemahaman ruang bersifat *Topologis* (kedekatan, urutan). Anak belum memahami peta abstrak, namun memahami 'rute' berdasarkan *landmark* menarik.
- **Vygotsky:** Lingkungan sekitar menyediakan alat budaya (*Cultural Tools*). Interaksi dengan tetangga memperluas kosa kata sosial dan norma masyarakat.
- **Al-Ghazali:** Konsep *Hifzhul Jiwar* (menjaga hak tetangga). Lingkungan adalah cermin masyarakat; anak diajarkan menjaga kebersihan dan ketertiban umum sebagai wujud adab sosial.

**Breaking Down per Usia:**
- **0-1 th:** Eksplorasi tekstur dan suara di lingkungan terdekat (halaman rumah).
- **1-2 th:** Mengenali benda-benda di sekitar jalan (pohon, tiang listrik, rumah tetangga).
- **2-3 th:** Mulai memahami rute pendek (dari kamar ke dapur, dari gerbang ke pintu).
- **3-4 th:** Mengenali tempat-tempat umum (Warung, Masjid, Sekolah) dan fungsinya.
- **4-5 th:** Mampu membuat denah sederhana/peta imajiner menggunakan balok atau gambar.
- **5-6 th:** Memahami aturan di tempat umum dan konsep bertukar (transaksi) di pasar/warung.`
  },
  "Pekerjaan/Profesi": {
    title: "Pekerjaan/Profesi",
    discipline: "Ekonomi & Civics",
    concept: "Produksi, Distribusi, & Jasa",
    description: "Membawa konsep makro Ekonomi ke level anak melalui pemahaman 'jasa dan manfaat' orang lain bagi kita.",
    somantriInsight: "Profesi adalah perwujudan 'Kegiatan Dasar Manusia'. Fokus pada fungsi, bukan sekadar seragam.",
    okkeRelevance: "Mengangkat profesi khas daerah (misal: pengrajin, petani lokal) sebagai wujud apresiasi budaya dan ekonomi lokal.",
    paudImplementation: "Bermain peran (Role-play) menjadi petugas ketertiban atau produsen makanan lokal (misal: penjual jamu atau nasi uduk).",
    psychologicalContext: `
**Perspektif Teoretis:**
- **Piaget:** Anak memahami profesi secara simbolik. Mereka meniru atribut fisik (topi, stetoskop) untuk memahami fungsi sosial yang lebih dalam.
- **Vygotsky:** *Socio-dramatic Play* adalah puncak perkembangan PAUD. Melalui main peran profesi, anak menginternalisasi aturan sosial dan hirarki kerja.
- **Al-Ghazali:** Konsep *Naf'un lil Nas* (bermanfaat bagi manusia). Pekerjaan adalah bentuk pengabdian. Fokus pada kejujuran (*Shiddiq*) dan ketekunan (*Itqan*) dalam bekerja.

**Breaking Down per Usia:**
- **0-1 th:** Melihat aktivitas rutin orang dewasa (Ibu memasak, Ayah mengetik).
- **1-2 th:** Meniru gerakan sederhana terkait profesi (memegang gagang telepon, memegang sapu).
- **2-3 th:** Mulai bermain pura-pura secara mandiri (memberi makan boneka seperti dokter).
- **3-4 th:** Bermain peran mikro dengan teman (main pasar-pasaran, main sekolah-sekolahan).
- **4-5 th:** Memahami proses kerja (Petani menanam -> Padi jadi beras -> Kita makan nasi).
- **5-6 th:** Mampu mendiskusikan cita-cita dan menghargai keberagaman profesi di masyarakat.`
  },
  "Negaraku & Budayaku": {
    title: "Negaraku & Budayaku",
    discipline: "Antropologi & Civics",
    concept: "Nilai, Norma & Keragaman",
    description: "Menyederhanakan Antropologi melalui pengenalan tradisi lokal dan Civics melalui pembiasaan gotong royong.",
    somantriInsight: "Cinta tanah air dimulai dari 'Locus' terkecil. Bangga dengan budaya lokal adalah akar nasionalisme.",
    okkeRelevance: "Implementasi Dimensi Profil Pelajar Pancasila (Berkebinekaan Global) yang diselaraskan dengan lagu, tarian, dan makanan khas daerah.",
    paudImplementation: "Piknik budaya di sekolah dengan mencicipi makanan tradisional atau belajar tarian daerah yang disederhanakan.",
    psychologicalContext: `
**Perspektif Teoretis:**
- **Piaget:** Anak belajar melalui asimilasi budaya. Mereka menyerap simbol negara (Bendera, Garuda) sebagai objek konkret yang memiliki makna emosional.
- **Vygotsky:** Budaya adalah lensa persepsi. Bahasa daerah dan lagu tradisional membentuk cara berpikir (*Cultural Mediation*) dan identitas kelompok.
- **Al-Ghazali:** *Hubbul Wathan* (cinta tanah air). Mengenal asal-usul bangsa untuk menumbuhkan rasa syukur dan persaudaraan (*Ukhuwah*) antar sesama warga negara.

**Breaking Down per Usia:**
- **0-1 th:** Mendengar lagu nina bobo daerah atau musik tradisional yang menenangkan.
- **1-2 th:** Melihat simbol-simbol warna (Merah Putih) dan merespon dengan gembira.
- **2-3 th:** Mengenali istilah bahasa daerah sederhana dalam percakapan harian.
- **3-4 th:** Mengenali pakaian adat dan tarian daerah melalui visual atau gerakan sederhana.
- **4-5 th:** Mampu menyebutkan nama negara, pahlawan, dan hari besar nasional dengan bangga.
- **5-6 th:** Terlibat dalam perayaan budaya dan memahami pentingnya persatuan dalam perbedaan.`
  },
  "Air, Udara, Api": {
    title: "Air, Udara, Api",
    discipline: "Geografi & Ekonomi Sumber Daya",
    concept: "Kegiatan Dasar Manusia & Alam",
    description: "Dalam perspektif IPS, alam bukan sekadar sains, tapi sumber daya yang dikelola manusia untuk kehidupan sosial.",
    somantriInsight: "Sumber daya alam adalah bagian dari lingkungan hidup. Kesadaran lingkungan adalah bagian dari karakter warga negara.",
    okkeRelevance: "Mengenal kearifan lokal dalam mengelola sumber daya (misal: tradisi menjaga sumber air atau api untuk memasak tradisi).",
    paudImplementation: "Eksperimen hemat air saat berwudhu atau mencuci tangan, serta diskusi tentang bahaya api (aturan keselamatan).",
    psychologicalContext: `
**Perspektif Teoretis:**
- **Piaget:** Anak pada fase ini cenderung *Animisme* (menganggap benda alam punya nyawa). Ini bisa digunakan untuk menumbuhkan empati pada alam agar tidak merusak.
- **Vygotsky:** Pengalaman langsung dengan alam (main air, merasakan angin) dengan bimbingan dewasa membantu pembentukan konsep ilmiah yang berakar pada pengalaman harian.
- **Al-Ghazali:** Konsep *Amanah*. Alam adalah titipan Tuhan. Manusia adalah *Khalifah* yang bertugas menjaga, bukan merusak. Fokus pada sikap hemat dan syukur.

**Breaking Down per Usia:**
- **0-1 th:** Stimulasi sensori (merasakan air dingin, udara segar, kehangatan matahari).
- **1-2 th:** Mengenali manfaat air untuk minum dan mandi secara eksplisit.
- **2-3 th:** Bereksperimen dengan benda terapung-tenggelam atau meniup balon (udara).
- **3-4 th:** Memahami bahaya api (panas) dan pentingnya udara bersih untuk bernapas.
- **4-5 th:** Mengenal siklus air sederhana dan cara menjaga kebersihan sumber air.
- **5-6 th:** Berdiskusi tentang polusi (sampah di sungai) dan pentingnya menanam pohon untuk udara.`
  },
  "Binatang": {
    title: "Binatang",
    discipline: "Sosiologi Lingkungan",
    concept: "Empati & Hubungan Makhluk Hidup",
    description: "Penyederhanaan konsep Interaksi Sosial yang diperluas ke makhluk hidup lain. Membangun etika lingkungan.",
    somantriInsight: "Manusia tidak hidup sendiri. Kasih sayang pada hewan adalah awal dari karakter warga negara yang bertanggung jawab.",
    okkeRelevance: "Menghubungkan binatang dengan cerita rakyat lokal (fabel etnopedagogi) yang mengandung pesan moral sosial.",
    paudImplementation: "Memberi makan hewan peliharaan bersama atau mendramatisasi cerita 'Kancil yang Bijak' dalam konteks musyawarah.",
    psychologicalContext: `
**Perspektif Teoretis:**
- **Piaget:** Anak memproyeksikan perasaan mereka pada hewan. Ini adalah alat terbaik untuk melatih *Perspective Taking* (memahami sudut pandang makhluk lain).
- **Vygotsky:** Interaksi dengan hewan peliharaan sebagai bentuk *Social Scaffolding* untuk melatih tanggung jawab dan kasih sayang.
- **Al-Ghazali:** *Rahmah* (kasih sayang) universal. Mengajarkan bahwa setiap makhluk bernyawa memiliki hak untuk disayangi dan tidak boleh disakiti (*Zhalim*).

**Breaking Down per Usia:**
- **0-1 th:** Menirukan suara binatang (*Onomatopoeia*) dan tertarik pada gerakan hewan.
- **1-2 th:** Mengenali nama-nama hewan populer di sekitar (Kucing, Ayam, Burung).
- **2-3 th:** Mulai berani menyentuh hewan jinak dengan pengawasan.
- **3-4 th:** Memahami makanan hewan dan tempat tinggalnya (kandang, sarang).
- **4-5 th:** Memahami manfaat hewan bagi manusia (Susu sapi, Telur ayam).
- **5-6 th:** Mengenali konsep pelestarian hewan langka dan adab menyembelih (untuk kurban/makanan).`
  },
  "Tanaman": {
    title: "Tanaman",
    discipline: "Ekonomi Pertanian & Ekologi",
    concept: "Proses Produksi & Pelestarian",
    description: "Fokus pada proses menanam sebagai bentuk 'Produksi' sederhana. Belajar bahwa hasil bumi butuh usaha.",
    somantriInsight: "Pertanian adalah akar peradaban. Anak belajar tentang kronologi (waktu) dan kesabaran melalui menanam.",
    okkeRelevance: "Menanam tanaman khas daerah (misal: rempah-rempah atau bunga lokal) sebagai identitas geobudaya.",
    paudImplementation: "Proyek 'Kebun Kelas' di mana anak bertanggung jawab menyiram dan mengamati pertumbuhan tanamannya.",
    psychologicalContext: `
**Perspektif Teoretis:**
- **Piaget:** Anak belajar tentang *Object Permanence* dan *Sequence* (urutan) melalui siklus hidup tanaman (biji -> tunas -> pohon).
- **Vygotsky:** Berkebun bersama adalah aktivitas *Cooperative Play*. Anak belajar melalui instruksi sosial tentang cara merawat makhluk hidup.
- **Al-Ghazali:** Nilai *Sabr* (kesabaran) dan *Tawakkal*. Menanam adalah usaha manusia, namun hasilnya adalah anugerah. Mengajarkan rasa syukur atas makanan dari bumi.

**Breaking Down per Usia:**
- **0-1 th:** Mengamati warna daun dan mencium aroma bunga yang aman.
- **1-2 th:** Mengenali bagian tanaman secara sederhana (Bunga, Daun, Buah).
- **2-3 th:** Membantu menyiram tanaman menggunakan wadah kecil.
- **3-4 th:** Menanam biji (misal: kacang hijau) dan melihat pertumbuhannya setiap hari.
- **4-5 th:** Mengenal jenis-jenis tanaman obat dan tanaman hias di sekitar.
- **5-6 th:** Memahami proses panen dan distribusi hasil kebun ke dapur/pasar.`
  },
  "Kendaraan": {
    title: "Kendaraan",
    discipline: "Geografi Transportasi",
    concept: "Mobilitas Sosial & Konektivitas",
    description: "Menyederhanakan konsep Distribusi dan Mobilitas. Kendaraan sebagai alat penghubung orang dan tempat.",
    somantriInsight: "Transportasi adalah alat komunikasi ruang. Memahami aturan jalan adalah awal pemahaman hukum (Civics).",
    okkeRelevance: "Mengenal kendaraan tradisional daerah (misal: Becak, Andong, Perahu) sebagai bagian dari sejarah transportasi lokal.",
    paudImplementation: "Simulasi naik kendaraan umum (antre tiket, duduk sopan) dan mengenal rambu lalu lintas sederhana melalui bermain.",
    psychologicalContext: `
**Perspektif Teoretis:**
- **Piaget:** Kendaraan dipahami melalui fungsinya yang bergerak (*Egocentric motion*). Anak belajar tentang arah dan kecepatan secara intuitif.
- **Vygotsky:** Pengalaman naik kendaraan umum adalah *Social Interaction* nyata. Anak belajar etika publik dan interaksi dengan orang asing yang sopan.
- **Al-Ghazali:** Adab di perjalanan (*Adab as-Safar*). Mengajarkan doa perjalanan dan perilaku tertib agar tidak membahayakan diri dan orang lain.

**Breaking Down per Usia:**
- **0-1 th:** Tertarik pada roda yang berputar dan suara mesin kendaraan.
- **1-2 th:** Mengenali jenis kendaraan lewat suara (Ngiung-ngiung ambulans, Tut-tut kereta).
- **2-3 th:** Mengendarai mainan tunggang dan mulai memahami konsep 'setir'.
- **3-4 th:** Mengenali rambu warna (Merah berhenti, Hijau jalan) melalui permainan.
- **4-5 th:** Memahami profesi terkait kendaraan (Sopir, Pilot, Masinis, Nakhoda).
- **5-6 th:** Memahami pentingnya keselamatan (Helm, Sabuk Pengaman) dan etika di kendaraan umum.`
  }
};
