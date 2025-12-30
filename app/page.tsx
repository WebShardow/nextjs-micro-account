import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-16 items-center justify-between border-b px-6 lg:px-12">
        <div className="text-2xl font-bold text-blue-600">MicroAccount</div>
        <nav className="hidden gap-6 md:flex">
          <Link href="#features" className="text-sm font-medium hover:underline">คุณสมบัติ</Link>
          <Link href="#pricing" className="text-sm font-medium hover:underline">ราคา</Link>
          <Link href="#contact" className="text-sm font-medium hover:underline">ติดต่อเรา</Link>
        </nav>
        <div className="flex gap-4">
          <Link href="/dashboard">
            <Button variant="outline">เข้าสู่ระบบ</Button>
          </Link>
          <Link href="/dashboard">
            <Button>เริ่มต้นใช้งานฟรี</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <section className="bg-slate-50 py-20 text-center">
          <div className="container mx-auto px-4">
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight lg:text-5xl">
              ระบบบัญชีที่เข้าใจ <span className="text-blue-600">SME ไทย</span> มากที่สุด
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground">
              จัดการใบวางบิล ออกใบเสร็จ และดูงบการเงินได้ง่ายๆ บนคลาวด์ ปลอดภัย รวดเร็ว ครบจบในที่เดียว
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="h-12 px-8 text-lg">ทดลองใช้งานฟรี</Button>
              </Link>
              <Link href="#demo">
                <Button size="lg" variant="outline" className="h-12 px-8 text-lg">ดูวิดีโอสาธิต</Button>
              </Link>
            </div>
          </div>
        </section>

        <section id="features" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold">ฟีเจอร์ที่ช่วยให้ธุรกิจคุณเติบโต</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-lg border p-6 shadow-sm">
                <div className="mb-4 text-4xl">📊</div>
                <h3 className="mb-2 text-xl font-bold">Dashboard อัจฉริยะ</h3>
                <p className="text-muted-foreground">เห็นภาพรวมกระแสเงินสด กำไร-ขาดทุน ได้แบบ Real-time ตัดสินใจธุรกิจได้ทันที</p>
              </div>
              <div className="rounded-lg border p-6 shadow-sm">
                <div className="mb-4 text-4xl">📑</div>
                <h3 className="mb-2 text-xl font-bold">เอกสารครบครัน</h3>
                <p className="text-muted-foreground">ออกใบเสนอราคา ใบแจ้งหนี้ ใบเสร็จรับเงิน และใบหัก ณ ที่จ่ายถูกต้องตามมาตรฐาน</p>
              </div>
              <div className="rounded-lg border p-6 shadow-sm">
                <div className="mb-4 text-4xl">📱</div>
                <h3 className="mb-2 text-xl font-bold">ใช้งานได้ทุกที่</h3>
                <p className="text-muted-foreground">รองรับการใช้งานผ่านมือถือ แท็บเล็ต และคอมพิวเตอร์ ทำงานได้จากทุกมุมโลก</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} MicroAccount by WebShardow. All rights reserved.
      </footer>
    </div>
  );
}
