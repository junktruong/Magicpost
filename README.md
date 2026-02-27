# Magic Post

Magic Post là hệ thống quản lý vận đơn theo mô hình tách lớp:
- `frontend/`: Next.js (App Router)
- `backend/`: NestJS + Prisma

Mục tiêu của README này là giúp bạn chạy dự án nhanh, đúng thứ tự, và giảm lỗi môi trường.

## 1. Kiến trúc tổng quan

- Frontend chạy cổng `3000` (mặc định Next.js)
- Backend chạy cổng `3333`
- PostgreSQL local (Docker) chạy cổng:
  - Dev DB: `5434`
  - Test DB: `5435`

Luồng local:
1. Frontend gọi API qua `NEXT_PUBLIC_API_BASE_URL`
2. Backend đọc cấu hình từ `.env`
3. Backend kết nối PostgreSQL qua `DATABASE_URL`

## 2. Cấu trúc thư mục

```text
.
├── frontend/                 # Next.js app
├── backend/                  # NestJS API + Prisma
├── docs/                     # Tài liệu kỹ thuật, audit, kế hoạch refactor
├── scripts/                  # Script nội bộ
└── .github/workflows/        # CI pipeline
```

## 3. Yêu cầu hệ thống

- Node.js: khuyến nghị `20.x` LTS
- npm: khuyến nghị `>= 10`
- Docker + Docker Compose

Lưu ý: repo hiện chưa pin version bằng `.nvmrc`, nên nếu team dùng version khác cần xác nhận tương thích.

## 4. Thiết lập môi trường

### Backend env

```bash
cp backend/.env.example backend/.env
```

File mẫu: `backend/.env.example`

```env
NODE_ENV=development
PORT=3333
CORS_ORIGIN=http://localhost:3000
DATABASE_URL=postgresql://postgres:postgres@localhost:5434/magicpost?schema=public
JWT_SECRET=change-me
```

### Frontend env

```bash
cp frontend/.env.example frontend/.env.local
```

File mẫu: `frontend/.env.example`

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3333
```

## 5. Chạy local (quick start)

### Bước 1: chạy database

```bash
cd backend
npm install
npm run db:dev:up
```

### Bước 2: migrate schema

```bash
cd backend
npm run prisma:dev:deploy
```

### Bước 3: chạy backend

```bash
cd backend
npm run start:dev
```

### Bước 4: chạy frontend

```bash
cd frontend
npm install
npm run dev
```

Sau khi chạy:
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:3333](http://localhost:3333)

## 6. Scripts thường dùng

### Frontend (`frontend/package.json`)

- `npm run dev`: chạy dev
- `npm run build`: build production
- `npm run start`: chạy bản build
- `npm run lint`: lint
- `npm run lint:fix`: tự sửa lint
- `npm run typecheck`: kiểm tra TypeScript

### Backend (`backend/package.json`)

- `npm run start:dev`: chạy dev
- `npm run build`: build NestJS
- `npm run start:prod`: chạy production từ `dist`
- `npm run lint`: lint và auto-fix
- `npm run typecheck`: kiểm tra TypeScript
- `npm run test`: unit test
- `npm run test:e2e`: e2e test
- `npm run db:dev:up`: bật dev database
- `npm run db:dev:rm`: xoá dev database container + volume
- `npm run db:test:up`: bật test database
- `npm run db:test:rm`: xoá test database container + volume

## 7. Build production

### Frontend

```bash
cd frontend
npm run build
npm run start
```

### Backend

```bash
cd backend
npm run build
npm run start:prod
```

## 8. CI/CD

Pipeline mẫu đã có tại:
- `.github/workflows/ci.yml`

Nội dung chính:
1. Cài dependencies (cache)
2. Lint + typecheck FE/BE
3. Build FE/BE
4. Security audit (`npm audit`)
5. Upload artifact

## 9. Lưu ý bảo mật

- Không commit file `.env` thật.
- Chỉ commit `.env.example`.
- Nếu từng lộ credential thật, cần rotate ngay trên hạ tầng.

## 10. Sự cố thường gặp

### Frontend gọi API bị CORS

Kiểm tra:
1. `backend/.env` có `CORS_ORIGIN=http://localhost:3000`
2. Backend đã restart sau khi đổi env
3. Frontend đang gọi đúng `NEXT_PUBLIC_API_BASE_URL`

### Backend không kết nối DB

Kiểm tra:
1. Docker đã chạy
2. Container DB đã up (`npm run db:dev:up`)
3. `DATABASE_URL` trùng cổng `5434` cho dev

### E2E test fail do DB

Chạy lại:
```bash
cd backend
npm run db:test:restart
npm run test:e2e
```

## 11. Tài liệu bổ sung

- Audit & kế hoạch refactor: `docs/refactor-audit.md`
