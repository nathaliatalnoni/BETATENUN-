const STORAGE_KEYS = {
    USERS: "tenun_users_v2",
    TENUN: "tenun_items_v2",
    BOOKINGS: "tenun_bookings_v2",
    CURRENT_USER: "tenun_current_user_v2",
    CHATS: "tenun_chats_v2"
};

function loadData(key, fallback) {
    try {
        const raw = localStorage.getItem(key);
        if (!raw) return fallback;
        return JSON.parse(raw);
    } catch (e) {
        console.error("Error load", key, e);
        return fallback;
    }
}

function saveData(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getCurrentUser() {
    const id = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (!id) return null;
    const users = loadData(STORAGE_KEYS.USERS, []);
    return users.find((u) => u.id === id) || null;
}

function setCurrentUser(idOrNull) {
    if (!idOrNull) localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    else localStorage.setItem(STORAGE_KEYS.CURRENT_USER, idOrNull);

    // auth info card tidak ditampilkan
    renderAuthInfo();

    // update state login page kalau sedang di view login
    renderLoginPageState();
}

// ====== INIT DUMMY DATA ======
function initDummyData() {
    let users = loadData(STORAGE_KEYS.USERS, null);
    let tenun = loadData(STORAGE_KEYS.TENUN, null);
    let bookings = loadData(STORAGE_KEYS.BOOKINGS, null);
    let chats = loadData(STORAGE_KEYS.CHATS, null);

    if (!users || users.length === 0) {
        users = [{
                id: "u1",
                nama: "Rumah Tenun Bakunase",
                email: "tenunbakunase@gmail.com",
                password: "123456",
                role: "pemilik",
                dendaType: "sewa_lagi",
                alamat: "Jl. Delima No.59, Bakunase, Kec. Kota Raja, Kota Kupang, Nusa Tenggara Timur 85142",
                maps: "https://maps.app.goo.gl/a8d1JD1p14u7eGYm8",
                wa: "082266019897",
                waIntl: "6282266019897",
                ig: "@rumahtenun_bakunase",
                igUrl: "https://www.instagram.com/rumahtenun_bakunase",
                fotoProfil: "images/logo-u1.jpg"
            },
            {
                id: "u2",
                nama: "Selera Entete",
                email: "seleraentete@gmail.com",
                password: "123456",
                role: "pemilik",
                dendaType: "flat",
                dendaFlat: 30000,
                alamat: "Jl. Soverdi No. 9 Oebufu, Kec. Oebobo, Kota Kupang, Nusa Tenggara Timur 85111",
                maps: "https://maps.app.goo.gl/H6hrmtHPd6KwjNKZ6",
                wa: "0821 3889 0176 / 0823 5947 7373",
                waIntl: "6282138890176",
                ig: "@selera_entete_artshop",
                igUrl: "https://www.instagram.com/selera_entete_artshop",
                fotoProfil: "images/logo-u2.jpg"
            },
            {
                id: "u3",
                nama: "Penyewa Demo",
                email: "penyewa@tenun.test",
                password: "123456",
                role: "penyewa"
            }
        ];
        saveData(STORAGE_KEYS.USERS, users);
    }

    if (!tenun || tenun.length === 0) {
        tenun = [{
                id: "t1",
                nama: "Tenun Alor",
                motif: "-",
                daerah: "Alor",
                warna: "Biru",
                hargaPerHari: 150000,
                ukuran: "All size",
                deskripsi: "-",
                foto: "images/alorbiru1u1.jpg",
                ownerId: "u1",
                aktif: true,
                reviews: []
            },
            {
                id: "t2",
                nama: "Tenun Rote Prada Emas",
                motif: "-",
                daerah: "Rote",
                warna: "Hitam-Merah",
                hargaPerHari: 150000,
                ukuran: "All Size",
                deskripsi: "-",
                foto: "images/rotepradau1.jpg",
                ownerId: "u1",
                aktif: true,
                reviews: []
            },
            {
                id: "t4",
                nama: "Tenun Nagekeo",
                motif: "Dhowik",
                daerah: "Nagekeo",
                warna: "Orange",
                hargaPerHari: 150000,
                ukuran: "All Size",
                deskripsi: "Motif belah ketupat (disebut juga dhowik atau wawi wanggang, yang berarti kaki belalang) pada tenun Nagekeo secara umum melambangkan kehidupan yang harmonis, bermartabat, dan jati diri yang kuat serta kokoh bagi masyarakat setempat. Motif ini juga dapat merepresentasikan hubungan antar manusia yang saling berkaitan. ",
                foto: "images/nagekeou2.jpg",
                ownerId: "u2",
                aktif: true,
                reviews: []
            },
            {
                id: "t5",
                nama: "Tenun Mollo",
                motif: "-",
                daerah: "TTS",
                warna: "Hitam",
                hargaPerHari: 150000,
                ukuran: "All Size",
                deskripsi: "Tenun ini memiliki filosofi hidup yaitu Keterbukaan: Motif belah ketupat melambangkan masyarakat Mollo yang terbuka dan menerima orang lain.",
                foto: "images/mollou2.jpg",
                ownerId: "u2",
                aktif: true,
                reviews: []
            },
            {
                id: "t6",
                nama: "Tenun Buna",
                motif: "-",
                daerah: "Timor",
                warna: "Merah",
                hargaPerHari: 150000,
                ukuran: "All Size",
                deskripsi: "-",
                foto: "images/timorbunau2.jpg",
                ownerId: "u2",
                aktif: true,
                reviews: []
            },
            {
                id: "t7",
                nama: "Tenun Rote",
                motif: "-",
                daerah: "Rote",
                warna: "Hitam",
                hargaPerHari: 150000,
                ukuran: "All Size",
                deskripsi: "-",
                foto: "images/roteu2.jpg",
                ownerId: "u2",
                aktif: true,
                reviews: []
            },
            {
                id: "t8",
                nama: "Tenun Bajawa",
                motif: "-",
                daerah: "Bajawa",
                warna: "Hitam",
                hargaPerHari: 150000,
                ukuran: "All Size",
                deskripsi: "-",
                foto: "images/bajawau1.jpg",
                ownerId: "u1",
                aktif: true,
                reviews: []
            },
            {
                id: "t9",
                nama: "Tenun Bajawa",
                motif: "-",
                daerah: "Bajawa",
                warna: "Hitam",
                hargaPerHari: 150000,
                ukuran: "All Size",
                deskripsi: "-",
                foto: "images/bajawa2u1.jpg",
                ownerId: "u1",
                aktif: true,
                reviews: []
            },
            {
                id: "t10",
                nama: "Tenun Mollo",
                motif: "-",
                daerah: "TTS",
                warna: "Merah",
                hargaPerHari: 150000,
                ukuran: "All Size",
                deskripsi: "Warna merah melambangkan keberanian laki-laki Nunkolo, sementara motif geometrisnya (seperti motif Kaif berantai) bisa menggambarkan sumber air dan wilayah berbukit, serta seringkali disertai aksesoris seperti ikat kepala (dester/pilu) yang melambangkan perlindungan dan kebesaran raja. Kain ini bukan sekadar pakaian, tetapi juga simbol identitas, status sosial, dan penghormatan budaya.",
                foto: "images/mollomerahu2.jpg",
                ownerId: "u2",
                aktif: true,
                reviews: []
            },
            {
                id: "t11",
                nama: "Tenun Sepe",
                motif: "Sepe",
                daerah: "Kupang",
                warna: "Hitam",
                hargaPerHari: 150000,
                ukuran: "All Size",
                deskripsi: "Motif ini menggambarkan kehidupan masyarakat Kota Kupang yang menjunjung tinggi nilai kebersamaan dan ketangguhan. Coraknya terinspirasi dari keindahan bunga flamboyan yang mekar pada waktu-waktu tertentu. Bunga flamboyan (sepe) yang tumbuh subur di Kota Kupang juga dimaknai sebagai simbol kasih, serta erat kaitannya dengan perayaan Natal, karena mulai bermekaran menjelang hari raya tersebut.",
                foto: "images/kupangu2.jpg",
                ownerId: "u2",
                aktif: true,
                reviews: []
            },
            {
                id: "t12",
                nama: "Tenun Sumba",
                motif: "-",
                daerah: "Sumba",
                warna: "Orange",
                hargaPerHari: 150000,
                ukuran: "All Size",
                deskripsi: "-",
                foto: "images/sumbaorangeu2.jpg",
                ownerId: "u2",
                aktif: true,
                reviews: []
            },
            {
                id: "t13",
                nama: "Tenun Nagekeo",
                motif: "-",
                daerah: "Nagekeo",
                warna: "Orange",
                hargaPerHari: 150000,
                ukuran: "All Size",
                deskripsi: "-",
                foto: "images/nagekeo2u2.jpg",
                ownerId: "u2",
                aktif: true,
                reviews: []
            },
            {
                id: "t14",
                nama: "Tenun Rote",
                motif: "-",
                daerah: "Rote",
                warna: "Hitam",
                hargaPerHari: 150000,
                ukuran: "All Size",
                deskripsi: "-",
                foto: "images/roteanaku2.jpg",
                ownerId: "u2",
                aktif: true,
                reviews: []
            },
            {
                id: "t15",
                nama: "Tenun Sabu",
                motif: "-",
                daerah: "Sabu",
                warna: "Cokelat",
                hargaPerHari: 150000,
                ukuran: "All Size",
                deskripsi: "-",
                foto: "images/sabucokelatu2.jpg",
                ownerId: "u2",
                aktif: true,
                reviews: []
            },
            {
                id: "t16",
                nama: "Tenun Sumba Timur",
                motif: "-",
                daerah: "Sumba",
                warna: "Merah",
                hargaPerHari: 150000,
                ukuran: "All Size",
                deskripsi: "-",
                foto: "images/sumbamerahu2.jpg",
                ownerId: "u2",
                aktif: true,
                reviews: []
            },
            {
                id: "t17",
                nama: "Tenun Sumba Timur",
                motif: "-",
                daerah: "Sumba",
                warna: "Ungu",
                hargaPerHari: 150000,
                ukuran: "All Size",
                deskripsi: "-",
                foto: "images/sumbaunguu2.jpg",
                ownerId: "u2",
                aktif: true,
                reviews: []
            }
        ];
        saveData(STORAGE_KEYS.TENUN, tenun);
    }

    if (!bookings || bookings.length === 0) {
        bookings = [];
        saveData(STORAGE_KEYS.BOOKINGS, bookings);
    }

    if (!chats || !Array.isArray(chats)) {
        chats = [];
        saveData(STORAGE_KEYS.CHATS, chats);
    }
}

// ====== VIEW HANDLING ======
const VIEW_IDS = {
    home: "view-home",
    tenunList: "view-tenun-list",
    tenunDetail: "view-tenun-detail",
    tokoDetail: "view-toko-detail",
    login: "view-login",
    register: "view-register",
    dashboard: "view-dashboard",
    about: "view-about"
};

function showView(key) {
    document.querySelectorAll(".view").forEach((v) => v.classList.remove("active"));
    const id = VIEW_IDS[key];
    if (!id) return;
    const el = document.getElementById(id);
    if (el) el.classList.add("active");
}

function parseHash() {
    const hash = window.location.hash || "#/";
    const parts = hash.replace("#", "").split("/").filter(Boolean);
    return parts;
}

function router() {
    const parts = parseHash();

    if (parts.length === 0 || parts[0] === "") {
        showView("home");
        return;
    }

    switch (parts[0]) {
        case "":
            showView("home");
            break;
        case "tenun":
            if (parts[1]) {
                const id = parts[1];
                showView("tenunDetail");
                renderTenunDetail(id);
            } else {
                showView("tenunList");
                renderTenunList();
            }
            break;
        case "toko":
            if (parts[1]) {
                const ownerId = parts[1];
                showView("tokoDetail");
                renderTokoDetail(ownerId);
            } else {
                showView("home");
            }
            break;
        case "login":
            showView("login");
            renderLoginPageState();
            break;
        case "register":
            showView("register");
            break;
        case "dashboard":
            showView("dashboard");
            renderDashboard();
            break;
        case "about":
            showView("about");
            break;
        default:
            showView("home");
    }
}

window.addEventListener("hashchange", router);

// ====== AUTH INFO UI (DISABLED) ======
function renderAuthInfo() {
    const container = document.getElementById("authInfo");
    if (container) container.style.display = "none";
}

function logout() {
    setCurrentUser(null);
    router();
}

// ====== TENUN LIST ======
function renderTenunList() {
    const listEl = document.getElementById("tenunListContainer");
    const tenun = loadData(STORAGE_KEYS.TENUN, []).filter((t) => t.aktif !== false);
    const bookings = loadData(STORAGE_KEYS.BOOKINGS, []);

    const motifVal = ((document.getElementById("filterMotif") || {}).value || "").trim().toLowerCase();
    const daerahVal = ((document.getElementById("filterDaerah") || {}).value || "").trim().toLowerCase();
    const warnaVal = ((document.getElementById("filterWarna") || {}).value || "").trim().toLowerCase();
    const hargaMaxVal = Number(((document.getElementById("filterHargaMax") || {}).value) || 0);
    const tMulaiVal = ((document.getElementById("filterTanggalMulai") || {}).value) || "";
    const tSelesaiVal = ((document.getElementById("filterTanggalSelesai") || {}).value) || "";

    let filtered = tenun;

    if (motifVal) filtered = filtered.filter((t) => (t.motif || "").toLowerCase().includes(motifVal));
    if (daerahVal) filtered = filtered.filter((t) => (t.daerah || "").toLowerCase().includes(daerahVal));
    if (warnaVal) filtered = filtered.filter((t) => (t.warna || "").toLowerCase().includes(warnaVal));
    if (hargaMaxVal > 0) filtered = filtered.filter((t) => Number(t.hargaPerHari || 0) <= hargaMaxVal);

    if (tMulaiVal && tSelesaiVal) {
        const start = new Date(tMulaiVal);
        const end = new Date(tSelesaiVal);
        filtered = filtered.filter((t) => {
            const related = bookings.filter(
                (b) => b.tenunId === t.id && ["accepted", "sent"].includes(b.status)
            );
            for (const b of related) {
                const bs = new Date(b.startDate);
                const be = new Date(b.endDate);
                if (dateRangeOverlap(start, end, bs, be)) return false;
            }
            return true;
        });
    }

    if (filtered.length === 0) {
        listEl.innerHTML = `<div class="card"><p>Tidak ada tenun yang cocok dengan filter.</p></div>`;
        return;
    }

    const users = loadData(STORAGE_KEYS.USERS, []);

    listEl.innerHTML = filtered
        .map((t) => {
                const avgRating = hitungRatingRata2(t.reviews || []);
                const owner = users.find((u) => u.id === t.ownerId);
                return `
        <div class="card">
          <img src="${t.foto}" alt="${escapeHtml(t.nama)}" class="tenun-img" />
          <h3>${escapeHtml(t.nama)}</h3>
          <p class="muted">${escapeHtml(t.motif)} • ${escapeHtml(t.daerah)} • Warna ${escapeHtml(t.warna)}</p>
          <p><strong>Rp ${formatRupiah(t.hargaPerHari)} / hari (set lengkap)</strong></p>
          <p class="muted">Tenun saja / aksesoris saja: Rp 75.000 / hari</p>
          <p class="muted">${escapeHtml(t.ukuran || "")}</p>
          <p class="muted">Toko: ${
            owner
              ? `<a href="#/toko/${owner.id}" class="highlight">${escapeHtml(owner.nama)}</a>`
              : "Tidak diketahui"
          }</p>
          ${
            avgRating
              ? `<p class="rating">★ ${avgRating.toFixed(1)} (${(t.reviews || []).length} review)</p>`
              : `<p class="muted">Belum ada review</p>`
          }
          <button onclick="location.hash='#/tenun/${t.id}'">Lihat Detail</button>
        </div>
      `;
    })
    .join("");
}

// ====== DETAIL TENUN & BOOKING + REVIEW INLINE ======
function renderTenunDetail(id) {
  const container = document.getElementById("tenunDetailContainer");
  const tenun = loadData(STORAGE_KEYS.TENUN, []).find((t) => t.id === id);

  if (!tenun) {
    container.innerHTML = `<div class="card"><p>Tenun tidak ditemukan.</p></div>`;
    return;
  }

  const users = loadData(STORAGE_KEYS.USERS, []);
  const owner = users.find((u) => u.id === tenun.ownerId);
  const avgRating = hitungRatingRata2(tenun.reviews || []);
  const user = getCurrentUser();

  const canReview =
  !!user &&
  user.role === "penyewa" &&
  bolehReviewTenun(tenun.id, user.id) &&
  !sudahReviewTenun(tenun, user.id);

  container.innerHTML = `
    <div class="card">
      <button class="secondary small" onclick="window.history.back()">← Kembali</button>
      <div class="grid" style="margin-top:12px;align-items:flex-start;">
        <div>
          <img src="${tenun.foto}" alt="${escapeHtml(tenun.nama)}" class="tenun-img-detail" />
          <p class="muted" style="margin-top:8px;">
            Pemilik: <strong>${owner ? escapeHtml(owner.nama) : "Tidak diketahui"}</strong><br/>
            ${
              owner
                ? `
                  <button class="small secondary" style="margin-top:6px;" onclick="location.hash='#/toko/${owner.id}'">Lihat profil toko</button>
                  <button class="small secondary" style="margin-top:6px;" onclick="openShopChat('${owner.id}')">Chat Toko</button>
                `
                : ""
            }
          </p>
          <p class="muted">${owner ? getDendaText(owner, tenun.hargaPerHari) : ""}</p>
          <p class="muted">Asal daerah: <strong>${escapeHtml(tenun.daerah)}</strong></p>
          <p class="muted">Motif: <strong>${escapeHtml(tenun.motif)}</strong></p>
          <p class="muted">Warna: <strong>${escapeHtml(tenun.warna)}</strong></p>
          <p class="muted">Ukuran: ${escapeHtml(tenun.ukuran || "")}</p>
          <p>
            <strong>Set lengkap: Rp ${formatRupiah(tenun.hargaPerHari)} / hari</strong><br/>
            <span class="muted">Tenun saja: Rp 75.000 / hari</span><br/>
            <span class="muted">Aksesoris saja: Rp 75.000 / hari</span>
          </p>
          <p style="margin-top:6px;">${escapeHtml(tenun.deskripsi || "")}</p>
          ${
            avgRating
              ? `<p class="rating" style="margin-top:6px;">★ ${avgRating.toFixed(
                  1
                )} rata-rata dari ${(tenun.reviews || []).length} review</p>`
              : `<p class="muted" style="margin-top:6px;">Belum ada rating untuk tenun ini.</p>`
          }
        </div>

        <div>
          <h3>Booking / Sewa</h3>
          <p class="muted">
            Tanggal pengambilan & pengembalian tidak dihitung sebagai hari sewa.<br/>
            Biaya hanya dihitung dari tanggal mulai sampai tanggal selesai sewa.
          </p>
          <div id="bookingAlert"></div>
          <form id="bookingForm">
  <input type="hidden" id="bookingTenunId" value="${tenun.id}" />

  <label>Jenis sewa</label>
  <select id="bookingType" required>
    <option value="set">Set lengkap (Rp ${formatRupiah(tenun.hargaPerHari)} / hari)</option>
    <option value="tenun">Tenun saja (Rp 75.000 / hari)</option>
    <option value="aksesoris">Aksesoris saja (Rp 75.000 / hari)</option>
  </select>

  <div class="date-2col">
  <div>
    <label>Tanggal mulai sewa</label>
    <input type="date" id="bookingStart" required />
  </div>
  <div>
    <label>Tanggal selesai sewa</label>
    <input type="date" id="bookingEnd" required />
  </div>
</div>

<div class="date-2col">
  <div>
    <label>Tanggal pengambilan</label>
    <select id="bookingPickup" required></select>
  </div>

  <div>
    <label>Tanggal pengembalian</label>
    <select id="bookingReturn" required></select>
  </div>
</div>

  <p id="bookingSummary" class="muted" style="margin-top:6px;">
    Total biaya akan dihitung otomatis.
  </p>
  <button type="submit">Sewa Sekarang</button>
</form>


          <h3 style="margin-top:18px;">Review & Rating</h3>

          ${
            canReview
              ? `
                <form id="reviewForm" class="review-form">
                  <label>Rating</label>
                  <select id="reviewRating" required>
                    <option value="">Pilih rating</option>
                    <option value="5">★★★★★ (5)</option>
                    <option value="4">★★★★ (4)</option>
                    <option value="3">★★★ (3)</option>
                    <option value="2">★★ (2)</option>
                    <option value="1">★ (1)</option>
                  </select>

                  <label>Ulasan</label>
                  <textarea id="reviewComment" placeholder="Tulis ulasan..." required></textarea>

                  <label>Upload foto (opsional)</label>
                  <input type="file" id="reviewPhotoFile" accept="image/*" />

                  <button type="submit">Kirim Review</button>
                </form>
              `
              : `<p class="muted">Untuk memberi review, login sebagai penyewa dan pastikan belum pernah review tenun ini.</p>`
          }

          <div id="reviewList" style="margin-top:10px;">
            ${
              tenun.reviews && tenun.reviews.length > 0
                ? tenun.reviews
                    .slice()
                    .reverse()
                    .map((r) => {
                      const u = users.find((x) => x.id === r.userId);
                      return `
                        <div style="margin-bottom:10px;border-bottom:1px solid #e5e7eb;padding-bottom:10px;">
                          <div>
                            <span class="rating">★ ${escapeHtml(String(r.rating))}</span>
                            <span class="muted">oleh ${u ? escapeHtml(u.nama) : "Penyewa"}</span>
                          </div>
                          <p>${escapeHtml(r.comment || "")}</p>
                          ${
                            r.photo
                              ? `<img src="${r.photo}" alt="Foto review" class="review-photo" />`
                              : ``
                          }
                          <p class="muted">${escapeHtml(r.date || "")}</p>
                        </div>
                      `;
                    })
                    .join("")
                : `<p class="muted">Belum ada review.</p>`
            }
          </div>
        </div>
      </div>
    </div>
  `;

// ===== Booking logic =====
const bookingForm = document.getElementById("bookingForm");
const bookingPickup = document.getElementById("bookingPickup");   // SELECT
const bookingStart  = document.getElementById("bookingStart");    // DATE
const bookingEnd    = document.getElementById("bookingEnd");      // DATE
const bookingReturn = document.getElementById("bookingReturn");   // SELECT
const bookingSummary = document.getElementById("bookingSummary");
const bookingAlert = document.getElementById("bookingAlert");
const bookingType = document.getElementById("bookingType");

// start tidak boleh sebelum hari ini
const todayYMD = new Date().toISOString().slice(0, 10);
bookingStart.min = todayYMD;

// end minimal = start (akan diupdate saat start berubah)
bookingEnd.min = todayYMD;

// --- helpers tanggal ---
function pad2(n){ return String(n).padStart(2,"0"); }
function toYMD(d){ return `${d.getFullYear()}-${pad2(d.getMonth()+1)}-${pad2(d.getDate())}`; }
function addDays(date, days){ const d = new Date(date); d.setDate(d.getDate()+days); return d; }
function toMidnight(d){ return new Date(d.getFullYear(), d.getMonth(), d.getDate()); }
function diffDays(a, b){ // b - a (hari)
  const ms = toMidnight(b).getTime() - toMidnight(a).getTime();
  return Math.round(ms / (1000*60*60*24));
}

function markInvalid(el, isInvalid) {
  if (!el) return;
  el.classList.toggle("input-invalid", !!isInvalid);
}

function isValidYMD(s) {
  return typeof s === "string" && /^\d{4}-\d{2}-\d{2}$/.test(s);
}

function setSelectOptions(selectEl, options) {
  if (!selectEl) return;
  const current = selectEl.value;
  selectEl.innerHTML = options.length
    ? options.map(o => `<option value="${o.value}">${o.label}</option>`).join("")
    : `<option value="">- pilih -</option>`;

  // pertahankan jika masih ada
  if (options.some(o => o.value === current)) selectEl.value = current;
  else selectEl.value = options[0]?.value || "";
}

// ====== 2 opsi saja untuk pickup/return ======
function applyPickupReturnOptions() {
  const s = bookingStart.value;
  const e = bookingEnd.value;

  // pastikan end tidak bisa sebelum start (UX)
if (isValidYMD(bookingStart.value)) {
  bookingEnd.min = bookingStart.value;
} else {
  bookingEnd.min = todayYMD;
}

  // PICKUP dari start: H-1 atau H0
  if (isValidYMD(s)) {
    const start = new Date(s);
    const optHminus1 = toYMD(addDays(start, -1));
    const optH0 = toYMD(start);

    setSelectOptions(bookingPickup, [
      { value: optHminus1, label: `${optHminus1} (sehari sebelum pemakaian)` },
      { value: optH0,      label: `${optH0} (saat hari pemakaian)` }
    ]);
  } else {
    setSelectOptions(bookingPickup, []);
  }

  // RETURN dari end: H0 atau H+1
  if (isValidYMD(e)) {
    const end = new Date(e);
    const optH0 = toYMD(end);
    const optHplus1 = toYMD(addDays(end, 1));

    setSelectOptions(bookingReturn, [
      { value: optH0,      label: `${optH0} (saat hari pemakaian)` },
      { value: optHplus1,  label: `${optHplus1} (sehari setelah pemakaian)` }
    ]);
  } else {
    setSelectOptions(bookingReturn, []);
  }

  // start tidak boleh sebelum hari ini
if (isValidYMD(s) && s < todayYMD) {
  ok = false;
  markInvalid(bookingStart, true);
}

}

// ====== validasi + bikin merah kalau invalid ======
function validateDateInputsAndMark() {
  const s = bookingStart.value;
  const e = bookingEnd.value;
  const p = bookingPickup.value;
  const r = bookingReturn.value;

  // reset
  markInvalid(bookingStart, false);
  markInvalid(bookingEnd, false);
  markInvalid(bookingPickup, false);
  markInvalid(bookingReturn, false);

  let ok = true;

  // start/end wajib & end >= start
  if (!isValidYMD(s)) { ok = false; markInvalid(bookingStart, true); }
  if (!isValidYMD(e)) { ok = false; markInvalid(bookingEnd, true); }
  if (isValidYMD(s) && isValidYMD(e)) {
    const start = new Date(s);
    const end = new Date(e);
    if (end < start) {
      ok = false;
      markInvalid(bookingStart, true);
      markInvalid(bookingEnd, true);
    }
  }

  // pickup harus H-1 atau H0 dari start (seharusnya aman karena select, tapi tetap cek)
  if (isValidYMD(s)) {
    if (!isValidYMD(p)) { ok = false; markInvalid(bookingPickup, true); }
    else {
      const start = new Date(s);
      const pickup = new Date(p);
      const d = diffDays(pickup, start); // start - pickup
      if (!(d === 0 || d === 1)) { ok = false; markInvalid(bookingPickup, true); }
    }
  }

  // return harus H0 atau H+1 dari end
  if (isValidYMD(e)) {
    if (!isValidYMD(r)) { ok = false; markInvalid(bookingReturn, true); }
    else {
      const end = new Date(e);
      const ret = new Date(r);
      const d = diffDays(end, ret); // return - end
      if (!(d === 0 || d === 1)) { ok = false; markInvalid(bookingReturn, true); }
    }
  }

  return ok;
}

function updateBookingSummary() {
  bookingAlert.innerHTML = "";

  const s = bookingStart.value;
  const e = bookingEnd.value;

  // update opsi dulu biar pickup/return selalu sesuai
  applyPickupReturnOptions();

  // tandai merah jika invalid
  const valid = validateDateInputsAndMark();

  if (!isValidYMD(s) || !isValidYMD(e)) {
    bookingSummary.textContent = "Total biaya akan dihitung otomatis.";
    return;
  }

  const start = new Date(s);
  const end = new Date(e);

  if (end < start) {
    bookingSummary.innerHTML =
      `<span class="muted">Tanggal selesai sewa tidak boleh sebelum tanggal mulai sewa.</span>`;
    return;
  }

  if (!valid) {
    bookingSummary.innerHTML =
      `<span class="muted">Periksa tanggal yang berwarna merah.</span>`;
    return;
  }

  const type = bookingType ? bookingType.value : "set";
  const perHari = type === "set" ? tenun.hargaPerHari : 75000;
  const hari = hitungJumlahHari(start, end);
  const total = hari * perHari;

  bookingSummary.innerHTML = `
    <span>
      Total hari sewa (mulai s/d selesai): <strong>${hari} hari</strong><br/>
      Perkiraan biaya: <strong>Rp ${formatRupiah(total)}</strong>
      (Rp ${formatRupiah(perHari)} / hari)<br/>
      Catatan: Tanggal pengambilan & pengembalian tidak dikenakan biaya.
    </span>
  `;
}

// listeners
bookingStart.addEventListener("change", updateBookingSummary);
bookingEnd.addEventListener("change", updateBookingSummary);
bookingPickup.addEventListener("change", updateBookingSummary);
bookingReturn.addEventListener("change", updateBookingSummary);
if (bookingType) bookingType.addEventListener("change", updateBookingSummary);

// init sekali
applyPickupReturnOptions();
updateBookingSummary();

bookingForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const userNow = getCurrentUser();
  if (!userNow || userNow.role !== "penyewa") {
    bookingAlert.innerHTML =
      `<div class="alert error">Silakan login sebagai <strong>penyewa</strong> terlebih dahulu.</div>`;
    return;
  }

  // pastikan valid; kalau tidak → merah + stop
  applyPickupReturnOptions();
  if (!validateDateInputsAndMark()) {
    bookingAlert.innerHTML =
      `<div class="alert error">Tanggal masih tidak valid. Periksa field yang berwarna merah.</div>`;
    return;
  }

  const sPickup = bookingPickup.value;
  const s = bookingStart.value;
  const eDate = bookingEnd.value;
  const sReturn = bookingReturn.value;

  const start = new Date(s);
  const end = new Date(eDate);

  // cek conflict booking
  const bookings = loadData(STORAGE_KEYS.BOOKINGS, []);
  const conflicts = bookings.filter(
    (b) =>
      b.tenunId === tenun.id &&
      ["accepted", "sent"].includes(b.status) &&
      dateRangeOverlap(start, end, new Date(b.startDate), new Date(b.endDate))
  );
  if (conflicts.length > 0) {
    bookingAlert.innerHTML =
      `<div class="alert error">Tanggal sewa tersebut tidak tersedia, sudah ada sewa lain.</div>`;
    return;
  }

  const type = bookingType ? bookingType.value : "set";
  const perHari = type === "set" ? tenun.hargaPerHari : 75000;
  const hari = hitungJumlahHari(start, end);
  const total = hari * perHari;

  const newBooking = {
    id: "b" + Date.now(),
    tenunId: tenun.id,
    penyewaId: userNow.id,
    ownerId: tenun.ownerId,
    pickupDate: sPickup,
    startDate: s,
    endDate: eDate,
    returnDate: sReturn,
    hari,
    hargaPerHari: perHari,
    bookingType: type,
    total,
    status: "pending",
    paymentStatus: "unpaid",
    createdAt: new Date().toISOString(),
    messages: []
  };

  bookings.push(newBooking);
  saveData(STORAGE_KEYS.BOOKINGS, bookings);

  bookingAlert.innerHTML =
    `<div class="alert">Permintaan sewa dikirim. Status: <strong>Menunggu konfirmasi pemilik</strong>.</div>`;
  bookingForm.reset();

  // setelah reset, select akan kosong → isi lagi
  applyPickupReturnOptions();
  updateBookingSummary();
});


  // ===== Review logic =====
  const reviewForm = document.getElementById("reviewForm");
  if (reviewForm) {
    reviewForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const userNow = getCurrentUser();
      if (!userNow || userNow.role !== "penyewa") {
        alert("Silakan login sebagai penyewa untuk memberi review.");
        return;
      }

      const rating = Number(document.getElementById("reviewRating").value || 0);
      const comment = (document.getElementById("reviewComment").value || "").trim();
      const photoFile = document.getElementById("reviewPhotoFile")?.files?.[0] || null;

      if (!rating || rating < 1 || rating > 5) {
        alert("Rating wajib dipilih (1-5).");
        return;
      }
      if (!comment) {
        alert("Ulasan wajib diisi.");
        return;
      }

      const tenunAll = loadData(STORAGE_KEYS.TENUN, []);
      const item = tenunAll.find((t) => t.id === tenun.id);
      if (!item) return;

      if (!Array.isArray(item.reviews)) item.reviews = [];
      if (item.reviews.some((r) => r.userId === userNow.id)) {
        alert("Kamu sudah memberi review untuk tenun ini.");
        return;
      }

      let photo = "";
      if (photoFile) {
        try {
          photo = await fileToDataURL(photoFile);
        } catch (err) {
          console.error(err);
          alert("Foto review gagal dibaca. Review akan disimpan tanpa foto.");
          photo = "";
        }
      }

      item.reviews.push({
        userId: userNow.id,
        rating,
        comment,
        photo,
        date: new Date().toISOString().slice(0, 10)
      });

      saveData(STORAGE_KEYS.TENUN, tenunAll);
      alert("Terima kasih! Review kamu tersimpan.");
      renderTenunDetail(tenun.id);
    });
  }
}

// ====== PROFIL TOKO ======
function renderTokoDetail(ownerId) {
  const container = document.getElementById("tokoDetailContainer");
  const users = loadData(STORAGE_KEYS.USERS, []);
  const tenun = loadData(STORAGE_KEYS.TENUN, []);
  const owner = users.find((u) => u.id === ownerId && u.role === "pemilik");

  if (!owner) {
    container.innerHTML = `<div class="card"><p>Toko tidak ditemukan.</p></div>`;
    return;
  }

  const produkToko = tenun.filter((t) => t.ownerId === owner.id && t.aktif !== false);
  const dendaText = getDendaText(owner, 150000);
  const foto = owner.fotoProfil || "https://via.placeholder.com/150x150?text=Toko";

  const waNumberForLink = (owner.waIntl || owner.wa || "").toString().replace(/[^0-9]/g, "");
  const waLink = waNumberForLink
    ? `<a class="chip" href="https://wa.me/${waNumberForLink}" target="_blank" rel="noopener">WhatsApp</a>`
    : "";

  const mapsLink = owner.maps
    ? `<a class="chip" href="${owner.maps}" target="_blank" rel="noopener">Lihat di Maps</a>`
    : "";

  const igLink = owner.igUrl
    ? `<a class="chip" href="${owner.igUrl}" target="_blank" rel="noopener">Instagram</a>`
    : owner.ig
    ? `<span class="chip">${escapeHtml(owner.ig)}</span>`
    : "";

  const produkHtml =
    produkToko.length > 0
      ? `
        <div class="grid" style="margin-top:10px;">
          ${produkToko
            .map(
              (t) => `
              <div class="card">
                <img src="${t.foto}" alt="${escapeHtml(t.nama)}" class="tenun-img" />
                <h3>${escapeHtml(t.nama)}</h3>
                <p class="muted">${escapeHtml(t.motif)} • ${escapeHtml(t.daerah)} • Warna ${escapeHtml(t.warna)}</p>
                <p><strong>Rp ${formatRupiah(t.hargaPerHari)} / hari (set lengkap)</strong></p>
                <p class="muted">Tenun saja / aksesoris saja: Rp 75.000 / hari</p>
                <button onclick="location.hash='#/tenun/${t.id}'">Lihat Detail</button>
              </div>
            `
            )
            .join("")}
        </div>
      `
      : `<p class="muted" style="margin-top:8px;">Belum ada produk tenun di toko ini.</p>`;

  container.innerHTML = `
    <div class="card">
      <button class="secondary small" onclick="window.history.back()">← Kembali</button>
      <div class="toko-header">
        <img src="${foto}" alt="${escapeHtml(owner.nama)}" class="toko-avatar" />
        <div>
          <h2>${escapeHtml(owner.nama)}</h2>
          ${owner.alamat ? `<p class="muted">Alamat: ${escapeHtml(owner.alamat)}</p>` : ""}
          <p class="muted">Email: ${escapeHtml(owner.email)}</p>
          ${owner.wa ? `<p class="muted">No. WA: ${escapeHtml(owner.wa)}</p>` : ""}
          ${owner.ig ? `<p class="muted">Instagram: ${escapeHtml(owner.ig)}</p>` : ""}
          <p class="muted">${escapeHtml(dendaText)}</p>
          <div class="toko-contact">
            ${waLink}
            ${mapsLink}
            ${igLink}
            <button class="small secondary" style="margin-top:0;" onclick="openShopChat('${owner.id}')">Chat Toko</button>
          </div>
        </div>
      </div>
      <h3 style="margin-top:10px;">Produk Tenun</h3>
      ${produkHtml}
    </div>
  `;
}

// ====== DASHBOARD SATU PINTU ======
function renderDashboard() {
  const subtitleEl = document.getElementById("dashboardSubtitle");
  const contentEl = document.getElementById("dashboardContent");
  const user = getCurrentUser();

  if (!user) {
    subtitleEl.textContent = "Belum login";
    contentEl.innerHTML = `<div class="alert error">Anda harus login untuk melihat dashboard.</div>`;
    return;
  }

  if (user.role === "penyewa") {
    subtitleEl.textContent = "Dashboard Penyewa";
    renderDashboardPenyewa(contentEl, user);
  } else if (user.role === "pemilik") {
    subtitleEl.textContent = "Dashboard Pemilik";
    renderDashboardPemilik(contentEl, user);
  } else {
    subtitleEl.textContent = "";
    contentEl.innerHTML = `<div class="alert error">Role tidak dikenal.</div>`;
  }
}

function renderDashboardPenyewa(container, user) {
  const bookings = loadData(STORAGE_KEYS.BOOKINGS, []).filter((b) => b.penyewaId === user.id);
  const tenun = loadData(STORAGE_KEYS.TENUN, []);

  if (bookings.length === 0) {
    container.innerHTML = `<p class="muted">Belum ada riwayat sewa. <a href="#/tenun" class="highlight">Cari tenun sekarang</a>.</p>`;
    return;
  }

  const rows = bookings
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .map((b) => {
      const t = tenun.find((x) => x.id === b.tenunId);
      const statusLabel = mapStatusLabel(b.status);
      const pillClass = mapStatusClass(b.status);
      const typeLabel = mapBookingTypeLabel(b.bookingType);
      const paymentLabel = mapPaymentStatusLabel(b.paymentStatus);
      const canPay = b.paymentStatus !== "paid" && b.status !== "rejected";

      return `
      <tr>
        <td>${t ? escapeHtml(t.nama) : "-"}<br/><span class="muted">${escapeHtml(typeLabel)}</span></td>
        <td>
          <div class="muted">Ambil: ${escapeHtml(b.pickupDate || "-")}</div>
          <div>${escapeHtml(b.startDate)} s/d ${escapeHtml(b.endDate)}</div>
          <div class="muted">Kembali: ${escapeHtml(b.returnDate || "-")}</div>
        </td>
        <td>Rp ${formatRupiah(b.total)}</td>
        <td><span class="status-pill ${pillClass}">${escapeHtml(statusLabel)}</span></td>
        <td>${escapeHtml(paymentLabel)}</td>
        <td>
          <button class="small secondary" onclick="location.hash='#/tenun/${b.tenunId}'">Detail</button>
          <button class="small secondary" onclick="openBookingChat('${b.id}')">Chat Booking</button>
          ${
            canPay
              ? `<button class="small" onclick="prosesPembayaranWeb('${b.id}')">Bayar Sekarang</button>`
              : ""
          }
        </td>
      </tr>
    `;
    })
    .join("");

  container.innerHTML = `
    <p class="muted">Sewaanku:</p>
    <table>
      <thead>
        <tr>
          <th>Tenun</th>
          <th>Tanggal</th>
          <th>Total</th>
          <th>Status</th>
          <th>Pembayaran</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

function renderDashboardPemilik(container, user) {
  const tenun = loadData(STORAGE_KEYS.TENUN, []).filter((t) => t.ownerId === user.id);
  const allBookings = loadData(STORAGE_KEYS.BOOKINGS, []).filter((b) => b.ownerId === user.id);
  const users = loadData(STORAGE_KEYS.USERS, []);

  const pendapatan = allBookings
    .filter((b) => b.status === "returned")
    .reduce((sum, b) => sum + Number(b.total || 0), 0);

  const tenunRows =
    tenun.length > 0
      ? tenun
          .map((t) => {
            const avgRating = hitungRatingRata2(t.reviews || []);
            return `
            <tr>
              <td>${escapeHtml(t.nama)}</td>
              <td>${escapeHtml(t.motif)}</td>
              <td>${escapeHtml(t.daerah)}</td>
              <td>Rp ${formatRupiah(t.hargaPerHari)}</td>
              <td>${t.aktif === false ? "Nonaktif" : "Aktif"}</td>
              <td>
                <button class="small secondary" onclick="toggleAktifTenun('${t.id}')">
                  ${t.aktif === false ? "Aktifkan" : "Nonaktifkan"}
                </button>
                <button class="small danger" onclick="hapusTenun('${t.id}')">Hapus</button>
              </td>
            </tr>
            <tr>
              <td colspan="6" class="muted">
                ${
                  avgRating
                    ? `Rating rata-rata: ★ ${avgRating.toFixed(1)} dari ${(t.reviews || []).length} review`
                    : "Belum ada review"
                }
              </td>
            </tr>
          `;
          })
          .join("")
      : `<tr><td colspan="6" class="muted">Belum ada tenun. Tambahkan di bawah.</td></tr>`;

  const bookingRows =
    allBookings.length > 0
      ? allBookings
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((b) => {
            const t = tenun.find((x) => x.id === b.tenunId);
            const penyewa = users.find((u) => u.id === b.penyewaId);
            const statusLabel = mapStatusLabel(b.status);
            const pillClass = mapStatusClass(b.status);
            const actionButtons = buildBookingOwnerActions(b.id, b.status);
            const typeLabel = mapBookingTypeLabel(b.bookingType);
            const paymentLabel = mapPaymentStatusLabel(b.paymentStatus);

            return `
            <tr>
              <td>${t ? escapeHtml(t.nama) : "-"}<br/><span class="muted">${escapeHtml(typeLabel)}</span></td>
              <td>
                <div class="muted">Ambil: ${escapeHtml(b.pickupDate || "-")}</div>
                <div>${escapeHtml(b.startDate)} s/d ${escapeHtml(b.endDate)}</div>
                <div class="muted">Kembali: ${escapeHtml(b.returnDate || "-")}</div>
              </td>
              <td>${penyewa ? escapeHtml(penyewa.nama) : "-"}</td>
              <td>Rp ${formatRupiah(b.total)}</td>
              <td><span class="status-pill ${pillClass}">${escapeHtml(statusLabel)}</span></td>
              <td>${escapeHtml(paymentLabel)}</td>
              <td>
                ${actionButtons}
                <button class="small secondary" onclick="openBookingChat('${b.id}')">Chat Booking</button>
              </td>
            </tr>
          `;
          })
          .join("")
      : `<tr><td colspan="7" class="muted">Belum ada permintaan sewa.</td></tr>`;

  const me = users.find((u) => u.id === user.id) || user;

  container.innerHTML = `
    <div class="alert">
      Pendapatan selesai (status Dikembalikan): <strong>Rp ${formatRupiah(pendapatan)}</strong>
    </div>

    <h3>Edit Profil Toko</h3>
    <form id="formEditProfil">
      <div class="grid">
        <div>
          <label>Nama Toko</label>
          <input type="text" id="editNama" value="${escapeHtml(me.nama || "")}" required />
        </div>
        <div>
          <label>Alamat</label>
          <input type="text" id="editAlamat" value="${escapeHtml(me.alamat || "")}" />
        </div>
        <div>
          <label>No. WhatsApp (tampil)</label>
          <input type="text" id="editWA" value="${escapeHtml(me.wa || "")}" placeholder="Contoh: 0821xxxx" />
        </div>
        <div>
          <label>No. WhatsApp untuk link (format 62...)</label>
          <input type="text" id="editWAIntl" value="${escapeHtml(me.waIntl || "")}" placeholder="Contoh: 62821xxxx" />
        </div>
        <div>
          <label>Instagram (tampil)</label>
          <input type="text" id="editIG" value="${escapeHtml(me.ig || "")}" placeholder="@toko" />
        </div>
        <div>
          <label>Link Instagram</label>
          <input type="text" id="editIGUrl" value="${escapeHtml(me.igUrl || "")}" placeholder="https://instagram.com/..." />
        </div>
        <div>
          <label>Link Google Maps</label>
          <input type="text" id="editMaps" value="${escapeHtml(me.maps || "")}" placeholder="https://maps.app..." />
        </div>
        <div>
          <label>Foto Profil (upload)</label>
          <input type="file" id="editFotoProfil" accept="image/*" />
          <p class="muted tiny-text">Kosongkan jika tidak ingin mengganti.</p>
        </div>
      </div>
      <button type="submit">Simpan Profil</button>
    </form>

    <h3 style="margin-top:16px;">Tenun Saya</h3>
    <table>
      <thead>
        <tr>
          <th>Nama</th>
          <th>Motif</th>
          <th>Daerah</th>
          <th>Harga / hari</th>
          <th>Status</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>${tenunRows}</tbody>
    </table>

    <h3 style="margin-top:16px;">Tambah Tenun Baru</h3>
    <form id="formTambahTenun">
      <div class="grid">
        <div>
          <label>Nama tenun</label>
          <input type="text" id="tenunNama" required />
        </div>
        <div>
          <label>Motif</label>
          <input type="text" id="tenunMotif" required />
        </div>
        <div>
          <label>Daerah asal</label>
          <input type="text" id="tenunDaerah" required />
        </div>
        <div>
          <label>Warna dominan</label>
          <input type="text" id="tenunWarna" required />
        </div>
        <div>
          <label>Harga sewa per hari (set lengkap)</label>
          <input type="number" id="tenunHarga" required min="0" />
        </div>
        <div>
          <label>Upload foto tenun</label>
          <input type="file" id="tenunFotoFile" accept="image/*" />
          <p class="muted tiny-text">Jika tidak memilih foto, sistem akan memakai gambar default.</p>
        </div>
      </div>
      <label>Ukuran</label>
      <input type="text" id="tenunUkuran" placeholder="Contoh: panjang 2m, lebar 80cm" />
      <label>Deskripsi</label>
      <textarea id="tenunDeskripsi"></textarea>
      <button type="submit">Simpan Tenun</button>
    </form>

    <h3 style="margin-top:20px;">Permintaan Sewa</h3>
    <table>
      <thead>
        <tr>
          <th>Tenun</th>
          <th>Tanggal</th>
          <th>Penyewa</th>
          <th>Total</th>
          <th>Status</th>
          <th>Pembayaran</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>${bookingRows}</tbody>
    </table>
  `;

  document.getElementById("formTambahTenun").addEventListener("submit", async (e) => {
    e.preventDefault();
    await tambahTenunBaru();
  });

  document.getElementById("formEditProfil").addEventListener("submit", async (e) => {
    e.preventDefault();
    await simpanProfilPemilik();
  });
}

function toggleAktifTenun(id) {
  const tenun = loadData(STORAGE_KEYS.TENUN, []);
  const item = tenun.find((t) => t.id === id);
  if (!item) return;
  item.aktif = item.aktif === false ? true : false;
  saveData(STORAGE_KEYS.TENUN, tenun);
  renderDashboard();
}

function hapusTenun(id) {
  if (!confirm("Yakin ingin menghapus tenun ini?")) return;
  let tenun = loadData(STORAGE_KEYS.TENUN, []);
  tenun = tenun.filter((t) => t.id !== id);
  saveData(STORAGE_KEYS.TENUN, tenun);
  renderDashboard();
}

// helper konversi file -> dataURL (base64)
function fileToDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error || new Error("Gagal membaca file"));
    reader.readAsDataURL(file);
  });
}

async function tambahTenunBaru() {
  const user = getCurrentUser();
  if (!user || user.role !== "pemilik") return;

  const nama = document.getElementById("tenunNama").value.trim();
  const motif = document.getElementById("tenunMotif").value.trim();
  const daerah = document.getElementById("tenunDaerah").value.trim();
  const warna = document.getElementById("tenunWarna").value.trim();
  const harga = Number(document.getElementById("tenunHarga").value || 0);
  const ukuran = document.getElementById("tenunUkuran").value.trim();
  const deskripsi = document.getElementById("tenunDeskripsi").value.trim();
  const fileInput = document.getElementById("tenunFotoFile");

  if (!nama || !motif || !daerah || !warna || !harga) {
    alert("Nama, motif, daerah, warna, dan harga wajib diisi.");
    return;
  }

  let foto = "https://via.placeholder.com/400x250?text=Tenun";
  if (fileInput && fileInput.files && fileInput.files[0]) {
    try {
      foto = await fileToDataURL(fileInput.files[0]);
    } catch (err) {
      console.error("Gagal membaca file foto", err);
      alert("Foto gagal dibaca, sistem akan memakai gambar default.");
    }
  }

  const tenun = loadData(STORAGE_KEYS.TENUN, []);
  tenun.push({
    id: "t" + Date.now(),
    nama,
    motif,
    daerah,
    warna,
    hargaPerHari: harga,
    ukuran,
    deskripsi,
    foto,
    ownerId: user.id,
    aktif: true,
    reviews: []
  });
  saveData(STORAGE_KEYS.TENUN, tenun);
  alert("Tenun berhasil ditambahkan.");
  document.getElementById("formTambahTenun").reset();
  renderDashboard();
}

async function simpanProfilPemilik() {
  const user = getCurrentUser();
  if (!user || user.role !== "pemilik") return;

  const nama = document.getElementById("editNama").value.trim();
  const alamat = document.getElementById("editAlamat").value.trim();
  const wa = document.getElementById("editWA").value.trim();
  const waIntl = document.getElementById("editWAIntl").value.trim();
  const ig = document.getElementById("editIG").value.trim();
  const igUrl = document.getElementById("editIGUrl").value.trim();
  const maps = document.getElementById("editMaps").value.trim();
  const fotoFile = document.getElementById("editFotoProfil")?.files?.[0] || null;

  if (!nama) {
    alert("Nama toko wajib diisi.");
    return;
  }

  let fotoProfil = "";
  if (fotoFile) {
    try {
      fotoProfil = await fileToDataURL(fotoFile);
    } catch (err) {
      console.error(err);
      alert("Foto profil gagal dibaca. Perubahan lain tetap disimpan.");
      fotoProfil = "";
    }
  }

  const users = loadData(STORAGE_KEYS.USERS, []);
  const me = users.find((u) => u.id === user.id);
  if (!me) return;

  me.nama = nama;
  me.alamat = alamat;
  me.wa = wa;
  me.waIntl = waIntl;
  me.ig = ig;
  me.igUrl = igUrl;
  me.maps = maps;
  if (fotoProfil) me.fotoProfil = fotoProfil;

  saveData(STORAGE_KEYS.USERS, users);
  setCurrentUser(me.id); // refresh current user data
  alert("Profil berhasil disimpan.");
  renderDashboard();
}

function buildBookingOwnerActions(bookingId, status) {
  if (status === "pending") {
    return `
      <button class="small" onclick="updateBookingStatus('${bookingId}','accepted')">Terima</button>
      <button class="small danger" onclick="updateBookingStatus('${bookingId}','rejected')">Tolak</button>
    `;
  }
  if (status === "accepted") {
    return `<button class="small" onclick="updateBookingStatus('${bookingId}','sent')">Tandai Dikirim</button>`;
  }
  if (status === "sent") {
    return `<button class="small" onclick="updateBookingStatus('${bookingId}','returned')">Tandai Dikembalikan (Selesai)</button>`;
  }
  return `<span class="muted">-</span>`;
}

function updateBookingStatus(bookingId, newStatus) {
  const bookings = loadData(STORAGE_KEYS.BOOKINGS, []);
  const b = bookings.find((x) => x.id === bookingId);
  if (!b) return;
  b.status = newStatus;
  saveData(STORAGE_KEYS.BOOKINGS, bookings);
  renderDashboard();
}

// ====== REVIEW helpers ======
function sudahReviewTenun(tenunItem, userId) {
  if (!tenunItem || !Array.isArray(tenunItem.reviews)) return false;
  return tenunItem.reviews.some((r) => r.userId === userId);
}

// ====== LOGIN & REGISTER HANDLER ======
function ensureRegisterExtraFields() {
  const form = document.getElementById("registerForm");
  if (!form) return;

  let extra = document.getElementById("registerExtraPemilik");
  if (!extra) {
    extra = document.createElement("div");
    extra.id = "registerExtraPemilik";
    extra.style.display = "none";
    extra.innerHTML = `
      <label>Alamat (Pemilik)</label>
      <input type="text" id="registerAlamat" placeholder="Alamat toko" />

      <label>No. WhatsApp (Pemilik)</label>
      <input type="text" id="registerWA" placeholder="Contoh: 0821xxxx" />
    `;
    const roleEl = document.getElementById("registerRole");
    if (roleEl && roleEl.parentNode) roleEl.parentNode.insertBefore(extra, roleEl.nextSibling);
    else form.appendChild(extra);
  }

  const role = document.getElementById("registerRole");
  const toggle = () => {
    const isPemilik = role.value === "pemilik";
    extra.style.display = isPemilik ? "block" : "none";
  };
  role.addEventListener("change", toggle);
  toggle();
}

function initAuthForms() {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const loginAlert = document.getElementById("loginAlert");
  const registerAlert = document.getElementById("registerAlert");

  ensureRegisterExtraFields();

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      loginAlert.innerHTML = "";
      const email = document.getElementById("loginEmail").value.trim().toLowerCase();
      const password = document.getElementById("loginPassword").value;
      const users = loadData(STORAGE_KEYS.USERS, []);
      const user = users.find((u) => u.email.toLowerCase() === email && u.password === password);
      if (!user) {
        loginAlert.innerHTML = `<div class="alert error">Email atau password salah.</div>`;
        return;
      }
      setCurrentUser(user.id);
      loginForm.reset();
      location.hash = "#/dashboard";
    });
  }

  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      registerAlert.innerHTML = "";
      const nama = document.getElementById("registerNama").value.trim();
      const email = document.getElementById("registerEmail").value.trim().toLowerCase();
      const password = document.getElementById("registerPassword").value;
      const role = document.getElementById("registerRole").value;

      const alamat = (document.getElementById("registerAlamat")?.value || "").trim();
      const wa = (document.getElementById("registerWA")?.value || "").trim();

      if (!nama || !email || !password) {
        registerAlert.innerHTML = `<div class="alert error">Semua field wajib diisi.</div>`;
        return;
      }

      if (role === "pemilik") {
        if (!alamat || !wa) {
          registerAlert.innerHTML = `<div class="alert error">Untuk pemilik, alamat dan nomor WhatsApp wajib diisi.</div>`;
          return;
        }
      }

      let users = loadData(STORAGE_KEYS.USERS, []);
      if (users.some((u) => u.email.toLowerCase() === email)) {
        registerAlert.innerHTML = `<div class="alert error">Email sudah terdaftar.</div>`;
        return;
      }

      const newUser = {
        id: "u" + Date.now(),
        nama,
        email,
        password,
        role
      };

      if (role === "pemilik") {
        newUser.alamat = alamat;
        newUser.wa = wa;
        newUser.waIntl = wa.replace(/[^0-9]/g, "").replace(/^0/, "62"); // best-effort
        newUser.ig = "";
        newUser.igUrl = "";
        newUser.maps = "";
        newUser.fotoProfil = "";
        newUser.dendaType = "sewa_lagi";
      }

      users.push(newUser);
      saveData(STORAGE_KEYS.USERS, users);

      // AUTO LOGIN setelah register
      setCurrentUser(newUser.id);
      registerAlert.innerHTML = `<div class="alert">Akun berhasil dibuat. Anda sudah login otomatis.</div>`;
      registerForm.reset();
      ensureRegisterExtraFields();
      location.hash = "#/dashboard";
    });
  }
}

// ====== Login page: tombol logout hanya di halaman login ======
function ensureLoginLogoutBox() {
  const loginView = document.getElementById("view-login");
  const card = loginView?.querySelector(".auth-card");
  if (!card) return;

  if (document.getElementById("alreadyLoginBox")) return;

  const box = document.createElement("div");
  box.id = "alreadyLoginBox";
  box.style.display = "none";
  box.innerHTML = `
    <div class="alert">
      Kamu sudah login sebagai <strong id="alreadyLoginName"></strong>.
    </div>
    <button type="button" class="danger" id="logoutBtnLogin">Logout</button>
    <button type="button" class="secondary" id="toDashBtnLogin">Ke Dashboard</button>
    <hr style="border:none;border-top:1px solid #e5e7eb;margin:12px 0;">
  `;

  // sisipkan setelah h2
  const h2 = card.querySelector("h2");
  if (h2 && h2.nextSibling) card.insertBefore(box, h2.nextSibling);
  else card.prepend(box);

  const toDash = box.querySelector("#toDashBtnLogin");
  if (toDash) toDash.onclick = () => (location.hash = "#/dashboard");
}

function renderLoginPageState() {
  ensureLoginLogoutBox();
  const user = getCurrentUser();
  const box = document.getElementById("alreadyLoginBox");
  const nameEl = document.getElementById("alreadyLoginName");
  const btn = document.getElementById("logoutBtnLogin");

  if (!box) return;

  if (user) {
    box.style.display = "block";
    if (nameEl) nameEl.textContent = user.nama || user.email || "User";
    if (btn) {
      btn.onclick = () => {
        setCurrentUser(null);
        alert("Berhasil logout.");
        router();
      };
    }
  } else {
    box.style.display = "none";
  }
}

// ====== FILTER FORM HANDLER ======
function initFilterForm() {
  const form = document.getElementById("filterForm");
  const resetBtn = document.getElementById("filterResetBtn");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      renderTenunList();
    });
  }
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      document.getElementById("filterMotif").value = "";
      document.getElementById("filterDaerah").value = "";
      document.getElementById("filterWarna").value = "";
      document.getElementById("filterHargaMax").value = "";
      document.getElementById("filterTanggalMulai").value = "";
      document.getElementById("filterTanggalSelesai").value = "";
      renderTenunList();
    });
  }
}

// ====== CHAT & PEMBAYARAN ======
function mapBookingTypeLabel(type) {
  switch (type) {
    case "set":
      return "Set lengkap";
    case "aksesoris":
      return "Aksesoris saja";
    case "tenun":
    default:
      return "Tenun saja";
  }
}

function mapPaymentStatusLabel(status) {
  switch (status) {
    case "paid":
      return "Sudah dibayar";
    default:
      return "Belum dibayar";
  }
}

function prosesPembayaranWeb(bookingId) {
  const user = getCurrentUser();
  if (!user) return;

  const ok = confirm("Lanjutkan pembayaran di web untuk booking?");
  if (!ok) return;

  const bookings = loadData(STORAGE_KEYS.BOOKINGS, []);
  const b = bookings.find((x) => x.id === bookingId);
  if (!b) return;
  b.paymentStatus = "paid";
  b.paidAt = new Date().toISOString();
  b.paymentChannel = "web-demo";
  saveData(STORAGE_KEYS.BOOKINGS, bookings);
  alert("Pembayaran berhasil dicatat di sistem.");
  renderDashboard();
}

// ====== Floating Chat (Booking + Toko) ======
function initFloatingChat() {
  if (document.getElementById("floatingChatBtn")) return;

  const btn = document.createElement("button");
  btn.id = "floatingChatBtn";
  btn.textContent = "Chat";
  btn.style.position = "fixed";
  btn.style.right = "20px";
  btn.style.bottom = "20px";
  btn.style.zIndex = "999";
  btn.style.borderRadius = "999px";
  btn.style.padding = "10px 16px";
  btn.style.border = "none";
  btn.style.background = "linear-gradient(135deg, #2563eb, #4f46e5)";
  btn.style.color = "#fff";
  btn.style.boxShadow = "0 12px 25px rgba(15,23,42,0.45)";
  btn.style.cursor = "pointer";
  btn.style.fontSize = "0.9rem";

  const panel = document.createElement("div");
  panel.id = "floatingChatPanel";
  panel.style.position = "fixed";
  panel.style.right = "20px";
  panel.style.bottom = "70px";
  panel.style.width = "320px";
  panel.style.maxHeight = "420px";
  panel.style.background = "#f9fafb";
  panel.style.borderRadius = "18px";
  panel.style.boxShadow = "0 20px 40px rgba(15,23,42,0.6)";
  panel.style.border = "1px solid rgba(148,163,184,0.5)";
  panel.style.display = "none";
  panel.style.zIndex = "998";
  panel.style.overflow = "hidden";
  panel.style.fontSize = "0.85rem";

  document.body.appendChild(btn);
  document.body.appendChild(panel);

  btn.addEventListener("click", () => {
    if (panel.style.display === "none") {
      panel.style.display = "flex";
      panel.style.flexDirection = "column";
      renderChatHome();
    } else {
      panel.style.display = "none";
    }
  });
}

function chatHeaderHtml(title, onCloseJs) {
  return `
    <div style="padding:10px 12px;border-bottom:1px solid #e5e7eb;display:flex;justify-content:space-between;align-items:center;">
      <strong>${escapeHtml(title)}</strong>
      <button onclick="${onCloseJs}" style="border:none;background:transparent;cursor:pointer;color:red;font-weight:bold;">✕</button>
    </div>
  `;
}

function renderChatHome() {
  const panel = document.getElementById("floatingChatPanel");
  const user = getCurrentUser();
  if (!panel) return;

  if (!user) {
    panel.innerHTML = `
      ${chatHeaderHtml("Chat", "document.getElementById('floatingChatPanel').style.display='none'")}
      <div style="padding:10px;">
        <p class="muted">Silakan login untuk menggunakan fitur chat.</p>
      </div>
    `;
    return;
  }

  const users = loadData(STORAGE_KEYS.USERS, []);
  const tenun = loadData(STORAGE_KEYS.TENUN, []);
  const allBookings = loadData(STORAGE_KEYS.BOOKINGS, []).filter(
    b => b.penyewaId === user.id || b.ownerId === user.id
  );

  // helper avatar toko
  const getAvatar = (u) =>
    u?.fotoProfil ||
    "https://via.placeholder.com/80x80?text=Toko";

  const rowStyle = `
    padding:10px 10px;
    border-bottom:1px solid #e5e7eb;
    cursor:pointer;
    display:flex;
    gap:10px;
    align-items:center;
  `;

  // ===== List chat toko (tanpa booking) =====
  const pemilik = users.filter(u => u.role === "pemilik");

  const tokoListHtml =
    pemilik.length > 0
      ? pemilik
          .map(p => `
            <div style="${rowStyle}" onclick="openShopChat('${p.id}')">
              <img src="${getAvatar(p)}" alt="${escapeHtml(p.nama)}"
                style="width:38px;height:38px;border-radius:12px;object-fit:cover;flex:0 0 auto;border:1px solid rgba(148,163,184,0.35);" />
              <div style="min-width:0;">
                <div style="font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                  ${escapeHtml(p.nama)}
                </div>
                <div class="muted" style="font-size:0.78rem;">Chat toko</div>
              </div>
            </div>
          `)
          .join("")
      : "";

  // ===== List chat booking (kalau ada) =====
  const bookingListHtml =
    allBookings.length > 0
      ? allBookings
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map(b => {
            const t = tenun.find(x => x.id === b.tenunId);
            const otherUserId = user.id === b.penyewaId ? b.ownerId : b.penyewaId;
            const otherUser = users.find(u => u.id === otherUserId);
            const avatar = getAvatar(otherUser);
            const typeLabel = mapBookingTypeLabel(b.bookingType);

            return `
              <div style="${rowStyle}" onclick="openBookingChat('${b.id}')">
                <img src="${avatar}" alt="${escapeHtml(otherUser?.nama || "User")}"
                  style="width:38px;height:38px;border-radius:12px;object-fit:cover;flex:0 0 auto;border:1px solid rgba(148,163,184,0.35);" />
                <div style="min-width:0;">
                  <div style="font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                    ${t ? escapeHtml(t.nama) : "Booking"}
                  </div>
                  <div class="muted" style="font-size:0.78rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                    ${escapeHtml(typeLabel)} • ${otherUser ? escapeHtml(otherUser.nama) : "-"}
                  </div>
                </div>
              </div>
            `;
          })
          .join("")
      : `<div style="padding:10px;"><p class="muted">Belum ada booking untuk chat.</p></div>`;

  panel.innerHTML = `
    ${chatHeaderHtml("Chat", "document.getElementById('floatingChatPanel').style.display='none'")}
    <div style="flex:1;overflow-y:auto;">
      ${tokoListHtml}
      ${bookingListHtml}
    </div>
  `;
}

// =====================
// CHAT BOOKING (booking yang sudah ada)
// =====================
function openBookingChat(bookingId) {
  const panel = document.getElementById("floatingChatPanel");
  const user = getCurrentUser();
  if (!panel) return;

  panel.style.display = "flex";
  panel.style.flexDirection = "column";

  if (!user) {
    renderChatHome();
    return;
  }

  const bookings = loadData(STORAGE_KEYS.BOOKINGS, []);
  const b = bookings.find(x => x.id === bookingId);
  if (!b) {
    renderChatHome();
    return;
  }

  // hanya peserta booking yang boleh buka chat ini
  if (user.id !== b.penyewaId && user.id !== b.ownerId) {
    renderChatHome();
    return;
  }

  if (!Array.isArray(b.messages)) b.messages = [];
  saveData(STORAGE_KEYS.BOOKINGS, bookings);

  const tenun = loadData(STORAGE_KEYS.TENUN, []);
  const users = loadData(STORAGE_KEYS.USERS, []);
  const t = tenun.find(x => x.id === b.tenunId);

  const otherUserId = user.id === b.penyewaId ? b.ownerId : b.penyewaId;
  const otherUser = users.find(u => u.id === otherUserId);
  const avatar = getUserAvatar(otherUser);

  const msgsHtml =
    b.messages.length > 0
      ? b.messages
          .slice()
          .sort((m1, m2) => new Date(m1.time || 0) - new Date(m2.time || 0))
          .map(m => {
            const isMe = m.senderId === user.id;
            return `
              <div style="margin:4px 0;display:flex;${isMe ? "justify-content:flex-end;" : "justify-content:flex-start;"}">
                <div style="
                  max-width:80%;
                  padding:8px 10px;
                  border-radius:14px;
                  font-size:0.82rem;
                  background:${isMe ? "#2563eb" : "#e5e7eb"};
                  color:${isMe ? "#fff" : "#111827"};
                ">
                  <div style="font-weight:700;font-size:0.75rem;margin-bottom:2px;">
                    ${isMe ? "Saya" : escapeHtml(otherUser ? otherUser.nama : "User")}
                  </div>
                  <div>${escapeHtml(m.text)}</div>
                  <div style="font-size:0.7rem;opacity:0.8;margin-top:2px;">
                    ${m.time ? new Date(m.time).toLocaleString("id-ID") : ""}
                  </div>
                </div>
              </div>
            `;
          })
          .join("")
      : `<p class="muted" style="font-size:0.8rem;">Belum ada pesan. Mulai percakapan sekarang.</p>`;

  panel.innerHTML = `
    <div style="padding:10px 12px;border-bottom:1px solid #e5e7eb;display:flex;justify-content:space-between;align-items:center;gap:10px;">
      <div style="display:flex;align-items:center;gap:10px;min-width:0;">
        <img src="${avatar}" alt="${escapeHtml(otherUser?.nama || "User")}"
          style="width:38px;height:38px;border-radius:12px;object-fit:cover;border:1px solid rgba(148,163,184,0.35);" />
        <div style="min-width:0;">
          <div style="font-weight:800;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
            Booking: ${escapeHtml(t ? t.nama : "Tenun")}
          </div>
          <div class="muted" style="font-size:0.78rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
            Chat dengan: ${escapeHtml(otherUser ? otherUser.nama : "")}
          </div>
        </div>
      </div>
      <button onclick="renderChatHome()"
        style="border:none;background:transparent;cursor:pointer;font-size:0.9rem;color:red;font-weight:bold;">✕</button>
    </div>

    <div id="chatMessages" style="flex:1;overflow-y:auto;padding:8px 10px;">
      ${msgsHtml}
    </div>

    <form id="chatForm" style="padding:8px 10px;border-top:1px solid #e5e7eb;display:flex;gap:8px;align-items:center;">
      <textarea id="chatInput" placeholder="Tulis pesan..." required
        style="flex:1;resize:none;font-size:0.82rem;padding:10px 12px;border-radius:14px;border:1px solid #d1d5db;max-height:90px;"></textarea>
      <button type="submit"
        style="border:none;border-radius:999px;padding:12px 14px;background:#2563eb;color:#fff;font-size:0.85rem;cursor:pointer;">
        Kirim
      </button>
    </form>
  `;

  const chatMessages = document.getElementById("chatMessages");
  if (chatMessages) chatMessages.scrollTop = chatMessages.scrollHeight;

  const chatForm = document.getElementById("chatForm");
  chatForm.addEventListener("submit", e => {
    e.preventDefault();
    const input = document.getElementById("chatInput");
    const text = (input.value || "").trim();
    if (!text) return;

    const bookingsNow = loadData(STORAGE_KEYS.BOOKINGS, []);
    const bookingNow = bookingsNow.find(x => x.id === bookingId);
    if (!bookingNow) return;

    if (!Array.isArray(bookingNow.messages)) bookingNow.messages = [];
    bookingNow.messages.push({
      senderId: user.id,
      text,
      time: new Date().toISOString()
    });

    saveData(STORAGE_KEYS.BOOKINGS, bookingsNow);
    input.value = "";
    openBookingChat(bookingId);
  });
}


// --- Shop chat (NEW: tanpa booking) ---
function getOrCreateShopChatId(userId, ownerId) {
  const a = String(userId);
  const b = String(ownerId);
  return a < b ? `shop_${a}_${b}` : `shop_${b}_${a}`;
}

function openShopChat(ownerId) {
  const panel = document.getElementById("floatingChatPanel");
  const user = getCurrentUser();
  if (!panel) return;

  // pastikan panel terlihat
  panel.style.display = "flex";
  panel.style.flexDirection = "column";

  if (!user) {
    renderChatHome();
    return;
  }

  const users = loadData(STORAGE_KEYS.USERS, []);
  const owner = users.find(u => u.id === ownerId && u.role === "pemilik");
  if (!owner) {
    renderChatHome();
    return;
  }

  // storage khusus chat toko (tanpa booking)
  const SHOP_CHAT_KEY = "tenun_shop_chats_v2";
  const allShopChats = loadData(SHOP_CHAT_KEY, []);

  // 1 thread per (penyewa/pengguna) x (owner)
  let thread = allShopChats.find(
    c => c.ownerId === ownerId && c.userId === user.id
  );
  if (!thread) {
    thread = {
      id: "sc" + Date.now(),
      ownerId,
      userId: user.id,
      createdAt: new Date().toISOString(),
      messages: []
    };
    allShopChats.push(thread);
    saveData(SHOP_CHAT_KEY, allShopChats);
  }

  const avatar = getUserAvatar(owner);

  const msgsHtml =
    thread.messages && thread.messages.length > 0
      ? thread.messages
          .slice()
          .sort((a, b) => new Date(a.time || 0) - new Date(b.time || 0))
          .map(m => {
            const isMe = m.senderId === user.id;
            return `
              <div style="margin:4px 0;display:flex;${isMe ? "justify-content:flex-end;" : "justify-content:flex-start;"}">
                <div style="
                  max-width:80%;
                  padding:8px 10px;
                  border-radius:14px;
                  font-size:0.82rem;
                  background:${isMe ? "#2563eb" : "#e5e7eb"};
                  color:${isMe ? "#fff" : "#111827"};
                ">
                  <div style="font-weight:700;font-size:0.75rem;margin-bottom:2px;">
                    ${isMe ? "Saya" : escapeHtml(owner.nama)}
                  </div>
                  <div>${escapeHtml(m.text)}</div>
                  <div style="font-size:0.7rem;opacity:0.8;margin-top:2px;">
                    ${m.time ? new Date(m.time).toLocaleString("id-ID") : ""}
                  </div>
                </div>
              </div>
            `;
          })
          .join("")
      : `<p class="muted" style="font-size:0.8rem;">Belum ada pesan. Mulai percakapan sekarang.</p>`;

  panel.innerHTML = `
    <div style="padding:10px 12px;border-bottom:1px solid #e5e7eb;display:flex;justify-content:space-between;align-items:center;gap:10px;">
      <div style="display:flex;align-items:center;gap:10px;min-width:0;">
        <img src="${avatar}" alt="${escapeHtml(owner.nama)}"
          style="width:38px;height:38px;border-radius:12px;object-fit:cover;border:1px solid rgba(148,163,184,0.35);" />
        <div style="min-width:0;">
          <div style="font-weight:800;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
            Toko: ${escapeHtml(owner.nama)}
          </div>
          <div class="muted" style="font-size:0.78rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
            Chat dengan: ${escapeHtml(owner.nama)}
          </div>
        </div>
      </div>
      <button onclick="renderChatHome()"
        style="border:none;background:transparent;cursor:pointer;font-size:0.9rem;color:red;font-weight:bold;">✕</button>
    </div>

    <div id="shopChatMessages" style="flex:1;overflow-y:auto;padding:8px 10px;">
      ${msgsHtml}
    </div>

    <form id="shopChatForm" style="padding:8px 10px;border-top:1px solid #e5e7eb;display:flex;gap:8px;align-items:center;">
      <textarea id="shopChatInput" placeholder="Tulis pesan..." required
        style="flex:1;resize:none;font-size:0.82rem;padding:10px 12px;border-radius:14px;border:1px solid #d1d5db;max-height:90px;"></textarea>
      <button type="submit"
        style="border:none;border-radius:999px;padding:12px 14px;background:#2563eb;color:#fff;font-size:0.85rem;cursor:pointer;">
        Kirim
      </button>
    </form>
  `;

  const msgBox = document.getElementById("shopChatMessages");
  if (msgBox) msgBox.scrollTop = msgBox.scrollHeight;

  const form = document.getElementById("shopChatForm");
  form.addEventListener("submit", e => {
    e.preventDefault();
    const input = document.getElementById("shopChatInput");
    const text = (input.value || "").trim();
    if (!text) return;

    const chatsNow = loadData(SHOP_CHAT_KEY, []);
    const threadNow = chatsNow.find(c => c.id === thread.id);
    if (!threadNow) return;

    if (!Array.isArray(threadNow.messages)) threadNow.messages = [];
    threadNow.messages.push({
      senderId: user.id,
      text,
      time: new Date().toISOString()
    });

    saveData(SHOP_CHAT_KEY, chatsNow);
    input.value = "";
    openShopChat(ownerId);
  });
}

// expose to window (dipakai onclick string)
window.openShopChat = openShopChat;
window.openBookingChat = openBookingChat;

// ====== HELPER FUNCTIONS ======
function escapeHtml(str) {
  return (str || "").toString().replace(/[&<>"']/g, (ch) => {
    switch (ch) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&#039;";
      default:
        return ch;
    }
  });
}

function getUserAvatar(u) {
  return (
    u?.fotoProfil ||
    "https://via.placeholder.com/80x80?text=Toko"
  );
}

function formatRupiah(num) {
  return Number(num || 0).toLocaleString("id-ID");
}

function hitungJumlahHari(startDate, endDate) {
  const ms = endDate.getTime() - startDate.getTime();
  const days = Math.floor(ms / (1000 * 60 * 60 * 24)) + 1;
  return days < 1 ? 1 : days;
}

function dateRangeOverlap(aStart, aEnd, bStart, bEnd) {
  return aStart <= bEnd && bStart <= aEnd;
}

function mapStatusLabel(status) {
  switch (status) {
    case "pending":
      return "Menunggu Konfirmasi";
    case "accepted":
      return "Diterima (Siap diambil)";
    case "rejected":
      return "Ditolak";
    case "sent":
      return "Dipinjam";
    case "returned":
      return "Dikembalikan / Selesai";
    default:
      return status;
  }
}

function mapStatusClass(status) {
  switch (status) {
    case "pending":
      return "status-pending";
    case "accepted":
      return "status-accepted";
    case "rejected":
      return "status-rejected";
    case "sent":
      return "status-sent";
    case "returned":
      return "status-returned";
    default:
      return "";
  }
}

function hitungRatingRata2(reviews) {
  if (!reviews || reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, r) => acc + Number(r.rating || 0), 0);
  return sum / reviews.length;
}

function getDendaText(owner, hargaSewa) {
  if (!owner) return "";
  if (owner.dendaType === "sewa_lagi") {
    return `Denda keterlambatan: Rp ${formatRupiah(hargaSewa)} (dianggap menyewa lagi 1 hari)`;
  }
  if (owner.dendaType === "flat") {
    return `Denda keterlambatan: Rp ${formatRupiah(owner.dendaFlat || 0)} per hari keterlambatan`;
  }
  return "Kebijakan denda diatur langsung oleh pemilik Tenun.";
}

function bolehReviewTenun(tenunId, penyewaId) {
  const bookings = loadData(STORAGE_KEYS.BOOKINGS, []);
  return bookings.some(
    b =>
      b.tenunId === tenunId &&
      b.penyewaId === penyewaId &&
      b.status === "returned"
  );
}


// ====== INIT ======
document.addEventListener("DOMContentLoaded", () => {
  initDummyData();
  initAuthForms();
  initFilterForm();
  renderAuthInfo(); // hidden
  router();
  initFloatingChat();
  renderLoginPageState();
});