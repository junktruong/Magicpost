# Refactor Audit (Safe-First)

## 1) Ưu tiên xử lý

| Priority | Vấn đề | Tác hại | Vị trí | Cách sửa |
|---|---|---|---|---|
| P0 | Secret xuất hiện trong file env được track | Rò rỉ DB credential, rủi ro truy cập trái phép | `backend/.env` (trước khi chuẩn hoá) | Tạo `.env.example`, bỏ secret thật khỏi file track, thêm ignore rule, rotate secret thật trên hạ tầng |
| P0 | CORS backend mở toàn bộ `*` | Rủi ro API bị gọi từ origin không kiểm soát | `backend/src/main.ts` | Đọc `CORS_ORIGIN` từ env, hỗ trợ whitelist bằng danh sách origin |
| P1 | FE hardcode API URL + dùng `dotenv` phía client | Khó deploy đa môi trường, dễ lỗi runtime build | `frontend/app/service/BaseService.ts` | Chuẩn hoá `NEXT_PUBLIC_API_BASE_URL`, tách `apiClient` |
| P1 | `Access-Control-Allow-Origin` gửi ở request header | Sai chuẩn HTTP/CORS, gây nhiễu debug | `frontend/app/service/BaseService.ts` | Xoá header này khỏi request client |
| P1 | `docker-compose.yml` backend trống | Script DB dev/test không chạy được | `backend/docker-compose.yml` | Bổ sung service `dev-db` và `test-db` đúng port script |
| P2 | Cấu trúc module BE phụ thuộc chéo service trực tiếp | Tăng coupling, khó test/maintain | `backend/src/Order/order.module.ts` và các service liên quan | Refactor dần theo module import/export chuẩn Nest |
| P2 | Dead code và log debug trong FE | Tăng noise, khó bảo trì | `frontend/app/createOrder/page.tsx`, `frontend/app/grantAccess/MyForm.tsx`, nhiều page khác | Loại bỏ phần request không dùng và log thừa |

## 2) Cấu trúc thư mục đề xuất

```text
.
├── backend/
│   ├── src/
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   ├── users/
│   │   │   ├── orders/
│   │   │   ├── hubs/
│   │   │   └── trans/
│   │   ├── common/
│   │   │   ├── dto/
│   │   │   ├── filters/
│   │   │   ├── guards/
│   │   │   └── interceptors/
│   │   ├── config/
│   │   └── main.ts
│   ├── prisma/
│   └── test/
├── frontend/
│   ├── app/
│   │   ├── (routes)/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── utils/
│   ├── public/
│   └── tests/
├── docs/
├── scripts/
└── .github/
```

## 3) Mapping hiện tại -> đích (gợi ý)

| Hiện tại | Đích |
|---|---|
| `frontend/app/service/BaseService.ts` | `frontend/app/services/base.service.ts` |
| `frontend/public/utils/Utils.ts` | `frontend/app/utils/constants.ts` (hoặc tách thành nhiều file nhỏ) |
| `frontend/public/utils/interface.ts` | `frontend/app/utils/types.ts` |
| `backend/src/Order/*` | `backend/src/modules/orders/*` |
| `backend/src/HubManager/*` | `backend/src/modules/hubs/*` |
| `backend/src/TransactionManager/*` | `backend/src/modules/trans/*` |
| `backend/src/user/*` | `backend/src/modules/users/*` |
| `backend/src/auth/*` | `backend/src/modules/auth/*` |

## 4) Kế hoạch refactor an toàn (rollback được)

1. Baseline hardening (đã làm)
- Chuẩn hoá env FE/BE, CORS config, api client FE, docker compose DB.
- Rollback: revert từng file config (`main.ts`, `.env.example`, `apiClient.ts`, `docker-compose.yml`).

2. Tách service layer FE theo domain
- Tách `BaseService` thành `auth.service.ts`, `order.service.ts`, `user.service.ts` dùng chung `apiClient`.
- Rollback: giữ adapter `BaseService` re-export method cũ trong 1-2 sprint.

3. Chuẩn hoá module BE theo domain
- Di chuyển dần thư mục sang `src/modules/*`, giữ alias import tạm thời.
- Rollback: giữ re-export module cũ, không đổi endpoint URL trong giai đoạn đầu.

4. Chuẩn hoá response + error handling
- Thêm global exception filter + response envelope nhất quán.
- Rollback: bật/tắt filter theo env flag (`ENABLE_GLOBAL_FILTER=false`).

5. Testing gates
- FE: unit tests cho service và util chính.
- BE: integration test cho auth/order flow trọng yếu.
- Rollback: nếu test fail do migration, giữ test smoke cho endpoint chính trước.
