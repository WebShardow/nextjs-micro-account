import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, CreditCard, Users, TrendingUp } from "lucide-react";

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">ภาพรวม (Dashboard)</h2>
                <p className="text-muted-foreground">สรุปข้อมูลทางการเงินและสถานะบริษัทของคุณ</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">รายรับรวม (Total Revenue)</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">฿452,318.90</div>
                        <p className="text-xs text-muted-foreground">+20.1% จากเดือนที่แล้ว</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">ค่าใช้จ่าย (Expenses)</CardTitle>
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">฿120,450.00</div>
                        <p className="text-xs text-muted-foreground">+4.5% จากเดือนที่แล้ว</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">ลูกหนี้การค้า (Accounts Receivable)</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">฿35,000.00</div>
                        <p className="text-xs text-muted-foreground">รอเก็บเงิน 5 รายการ</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">กำไรสุทธิ (Net Profit)</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">฿331,868.90</div>
                        <p className="text-xs text-muted-foreground">+18.2% จากเดือนที่แล้ว</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>รายรับย้อนหลัง 6 เดือน</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="h-[200px] flex items-center justify-center bg-slate-100 rounded-md text-slate-500">
                            (พื้นที่สำหรับกราฟ Chart.js / Recharts)
                        </div>
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>ใบแจ้งหนี้ล่าสุด</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {/* Mock Data */}
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                                    <div>
                                        <div className="font-medium">INV-00{i}</div>
                                        <div className="text-xs text-muted-foreground">บจก. ตัวอย่างจำกัด</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-medium">฿1,500.00</div>
                                        <div className="text-xs text-green-600">ชำระแล้ว</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
