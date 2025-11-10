import { useState } from 'react'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function App() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    fridge_brand: '',
    issue_description: '',
    preferred_time: '',
  })
  const [status, setStatus] = useState({ loading: false, success: null, message: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({ loading: true, success: null, message: '' })
    try {
      const res = await fetch(`${BACKEND_URL}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Gagal mengirim formulir. Coba lagi.')
      const data = await res.json()
      setStatus({ loading: false, success: true, message: 'Permintaan berhasil terkirim. Kami akan menghubungi Anda segera!' })
      setForm({ name: '', phone: '', email: '', address: '', fridge_brand: '', issue_description: '', preferred_time: '' })
    } catch (err) {
      setStatus({ loading: false, success: false, message: err.message })
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <header className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-sky-500 text-white">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.6),transparent_60%)]" />
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur px-3 py-1 rounded-full text-xs mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Layanan cepat • Bergaransi
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">Jasa Servis Kulkas Profesional</h1>
            <p className="mt-4 text-white/90 text-lg md:text-xl">Perbaikan semua merek & tipe: tidak dingin, bocor, berisik, mati total, freon habis, dan lainnya. Teknisi datang ke rumah Anda.</p>
            <div className="mt-8 flex gap-4 flex-wrap">
              <a href="#order" className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg shadow hover:shadow-lg transition">
                Pesan Teknisi Sekarang
              </a>
              <a href="#masalah" className="px-6 py-3 rounded-lg border border-white/40 hover:bg-white/10 transition">
                Lihat Masalah Umum
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Masalah & Solusi */}
      <section id="masalah" className="container mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center">Masalah Umum & Solusi</h2>
        <p className="text-slate-600 text-center mt-2 max-w-2xl mx-auto">Kenali keluhan pada kulkas Anda dan solusi yang kami tawarkan.</p>
        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {[{
            title: 'Kulkas Tidak Dingin',
            desc: 'Kemungkinan masalah pada thermostat, kipas atau kebocoran freon.',
            sol: 'Pengecekan menyeluruh, pengisian freon, penggantian komponen jika diperlukan.'
          },{
            title: 'Bunyi Berisik',
            desc: 'Sumber suara dari fan motor/kompresor yang aus.',
            sol: 'Pembersihan dan penggantian fan motor/komponen terkait.'
          },{
            title: 'Air Menetes / Bocor',
            desc: 'Drainase mampet atau karet pintu rusak.',
            sol: 'Membersihkan saluran pembuangan dan mengganti seal pintu.'
          },{
            title: 'Mati Total',
            desc: 'Kerusakan pada modul/kompresor/supply listrik.',
            sol: 'Diagnosa elektronik, perbaikan modul, cek kompresor.'
          },{
            title: 'Borok Es Berlebih',
            desc: 'Defrost tidak bekerja atau sensor rusak.',
            sol: 'Perbaikan sistem defrost, cek heater & sensor.'
          },{
            title: 'Listrik Jeglek',
            desc: 'Short pada komponen atau kompresor macet.',
            sol: 'Tracing arus, penggantian komponen bermasalah.'
          }].map((i,idx)=> (
            <div key={idx} className="p-6 rounded-xl bg-white shadow hover:shadow-lg transition">
              <h3 className="font-semibold text-lg text-slate-800">{i.title}</h3>
              <p className="text-slate-600 mt-2">{i.desc}</p>
              <div className="mt-4 text-sm">
                <span className="font-medium text-slate-700">Solusi: </span>
                <span className="text-slate-600">{i.sol}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Keunggulan */}
      <section className="bg-white/60 border-y border-slate-100">
        <div className="container mx-auto px-6 py-14 grid md:grid-cols-3 gap-6">
          {[{
            t:'Teknisi Berpengalaman', d:'Tim profesional dengan pengalaman >5 tahun di berbagai merek.'
          },{t:'Harga Transparan', d:'Estimasi jelas sebelum tindakan, tanpa biaya tersembunyi.'},{t:'Garansi Pekerjaan', d:'Garansi layanan hingga 30 hari setelah perbaikan.'}].map((f,idx)=> (
            <div key={idx} className="p-6 rounded-xl bg-white shadow">
              <div className="w-10 h-10 rounded-lg bg-blue-600/10 text-blue-700 grid place-items-center font-bold">{idx+1}</div>
              <h3 className="mt-3 font-semibold text-slate-800">{f.t}</h3>
              <p className="text-slate-600 mt-1">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Form CTA */}
      <section id="order" className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-3xl font-bold text-slate-800">Pesan Teknisi Sekarang</h2>
            <p className="text-slate-600 mt-2">Isi formulir di samping, kami akan konfirmasi melalui WhatsApp/telepon dalam 10-20 menit kerja.</p>
            <ul className="mt-6 space-y-2 text-slate-700">
              <li>• Layanan panggilan ke rumah/kantor</li>
              <li>• Tersedia hari ini (jadwal cepat)</li>
              <li>• Menerima semua merek & tipe</li>
            </ul>
          </div>
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-700">Nama</label>
                <input name="name" value={form.name} onChange={handleChange} required className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nama lengkap" />
              </div>
              <div>
                <label className="block text-sm text-slate-700">Telepon/WhatsApp</label>
                <input name="phone" value={form.phone} onChange={handleChange} required className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="08xxxx" />
              </div>
              <div>
                <label className="block text-sm text-slate-700">Email (opsional)</label>
                <input name="email" value={form.email} onChange={handleChange} type="email" className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="email@contoh.com" />
              </div>
              <div>
                <label className="block text-sm text-slate-700">Alamat</label>
                <input name="address" value={form.address} onChange={handleChange} className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Alamat lengkap" />
              </div>
              <div>
                <label className="block text-sm text-slate-700">Merek/Tipe Kulkas</label>
                <input name="fridge_brand" value={form.fridge_brand} onChange={handleChange} className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Contoh: Samsung 2 pintu" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-slate-700">Keluhan</label>
                <textarea name="issue_description" value={form.issue_description} onChange={handleChange} required rows={4} className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ceritakan masalah pada kulkas Anda" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-slate-700">Waktu Kunjungan (opsional)</label>
                <input name="preferred_time" value={form.preferred_time} onChange={handleChange} className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Hari/tanggal & jam" />
              </div>
            </div>
            <button disabled={status.loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition">
              {status.loading ? 'Mengirim...' : 'Kirim Permintaan Servis'}
            </button>
            {status.message && (
              <div className={`text-sm p-3 rounded-lg ${status.success ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                {status.message}
              </div>
            )}
            <p className="text-xs text-slate-500 text-center">Dengan mengirim, Anda menyetujui kebijakan privasi kami.</p>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-200">
        <div className="container mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-semibold">Servis Kulkas</h4>
            <p className="text-slate-400 text-sm mt-2">Layanan perbaikan kulkas cepat, profesional, dan bergaransi di area Anda.</p>
          </div>
          <div>
            <h4 className="font-semibold">Kontak</h4>
            <p className="text-slate-400 text-sm mt-2">Telepon/WA: 08xxxxxxxxxx</p>
            <p className="text-slate-400 text-sm">Email: info@serviskulkas.id</p>
          </div>
          <div>
            <h4 className="font-semibold">Jam Operasional</h4>
            <p className="text-slate-400 text-sm mt-2">Senin - Sabtu: 08.00 - 20.00</p>
            <p className="text-slate-400 text-sm">Minggu/Libur: Janji temu</p>
          </div>
        </div>
        <div className="border-t border-white/10 py-4 text-center text-xs text-slate-400">© {new Date().getFullYear()} Servis Kulkas. All rights reserved.</div>
      </footer>
    </div>
  )
}

export default App
