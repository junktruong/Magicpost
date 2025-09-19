# Magic Post

**Magic Post** là hệ thống hỗ trợ quản lý vận đơn cho các đơn vị giao hàng **logistic**.  
Hệ thống được thiết kế với kiến trúc **frontend - backend** tách biệt, dễ mở rộng và bảo trì.

---

## 🚀 Tính năng chính

- Quản lý vận đơn, đơn hàng.
- Quản lý người dùng (quyền hạn, nhân viên, giám đốc, …).
- Quản lý sản phẩm và giao dịch.
- Quản lý điểm giao dịch, quét mã QR, cấp quyền truy cập.
- Dashboard trực quan cho quản trị hệ thống.
- Tích hợp bảo mật (mã hoá mật khẩu, phân quyền).
- Hỗ trợ tạo và in ấn file PDF vận đơn.

---

## 📂 Cấu trúc dự án

### Backend (`/backend`)
- **Ngôn ngữ & Framework:** TypeScript + [NestJS](https://nestjs.com/)  
- **ORM:** [Prisma](https://www.prisma.io/)  
- **Thư mục chính:**
  - `auth/` – Xử lý đăng nhập, xác thực
  - `Order/` – Quản lý đơn hàng
  - `product/` – Quản lý sản phẩm
  - `Role/` – Quản lý vai trò người dùng
  - `TransactionManager/` – Quản lý giao dịch
  - `user/` – Quản lý người dùng
  - `db.ts` – Kết nối database qua Prisma
  - `app.module.ts` – Module chính của ứng dụng

---

### Frontend (`/frontend`)
- **Ngôn ngữ & Framework:** TypeScript + [Next.js](https://nextjs.org/) (App Router)  
- **Thư mục chính:**
  - `app/components/` – Các component tái sử dụng
  - `app/dashboard/` – Dashboard quản lý
  - `app/createOrder/` – Tạo đơn hàng
  - `app/LogIn/` – Trang đăng nhập
  - `app/scanQR/` – Quét mã QR
  - `app/pdf/` – Xuất PDF
  - `app/service/` – Tầng gọi API
  - `globals.css` – Style toàn cục
  - `layout.tsx`, `page.tsx` – Layout và trang chính

---

## 🛠️ Công nghệ sử dụng

- **Backend:**  
  - NestJS, TypeScript  
  - Prisma ORM, PostgreSQL

- **Frontend:**  
  - Next.js (TypeScript, App Router)  
  - TailwindCSS và PrimeReact

---

## ⚙️ Cài đặt & Chạy hệ thống

### 1. Clone repo
```bash
git clone https://github.com/your-repo/magic-post.git
cd magic-post
```

### 2. Backend
```bash
cd backend
npm install
npx prisma generate
npm run start:dev
```

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 🎯 Mục tiêu phát triển
Magic Post hướng tới việc cung cấp một nền tảng **tối ưu cho quản lý vận đơn logistic**, giúp doanh nghiệp dễ dàng theo dõi, xử lý và phân tích hoạt động vận chuyển.  

---


