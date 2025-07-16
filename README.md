# EduE-Com - Sàn Giáo Dục Thương Mại Điện Tử Tích Hợp AI

Ứng dụng React TypeScript với Material-UI cho sàn giáo dục thương mại điện tử tích hợp AI, nơi người dùng có thể tìm kiếm, khám phá và yêu thích các khóa học hoặc sản phẩm giáo dục.

## 🚀 Demo

**Live Demo:** [https://vunhatcr7.github.io/ecom](https://vunhatcr7.github.io/ecom)

## 🚀 Tính Năng

### ✅ Đã Hoàn Thành
- **Hiển thị danh sách sản phẩm**: Hiển thị khóa học với thông tin đầy đủ
- **Tìm kiếm và lọc**: Tìm kiếm theo tên, lọc theo danh mục, trình độ, khoảng giá
- **Gợi ý thông minh (AI)**: Nút "Gợi ý sản phẩm phù hợp" với loading skeleton
- **Modal chi tiết sản phẩm**: Xem thông tin chi tiết khóa học
- **Yêu thích**: Đánh dấu và quản lý danh sách yêu thích
- **Lịch sử xem**: Theo dõi sản phẩm đã xem
- **Responsive Design**: Hoạt động tốt trên mọi thiết bị
- **Error Handling**: Xử lý lỗi khi API fail
- **Modern UI/UX**: Thiết kế hiện đại với Material-UI
- **Trang Giỏ hàng mới**: Giao diện tối giản, hiện đại, chỉ gồm danh sách sản phẩm và tổng giá tiền.
- **Trang Thanh toán mới**: Giao diện tối ưu, chỉ gồm sản phẩm, thành tiền, chọn phương thức thanh toán (Thẻ, Momo, VNPay).
- **Đồng bộ màu chủ đạo**: Sử dụng màu primary (#667eea) và secondary (#764ba2) cho toàn bộ giao diện.
- **Tối ưu UX**: Giao diện gọn gàng, dễ thao tác, responsive tốt trên mọi thiết bị.

### 🎯 Điểm Cộng Đã Tích Hợp
- ✅ Lịch sử xem (sản phẩm người dùng đã click)
- ✅ Loading skeleton khi gọi API gợi ý
- ✅ Xử lý lỗi khi API fail
- ✅ Thiết kế responsive và modern
- ✅ Hiệu ứng hover và transition mượt mà
- ✅ Toast notifications cho yêu thích

## 🛠️ Công Nghệ Sử Dụng

- **Frontend**: React 18 + TypeScript
- **UI Framework**: Material-UI (MUI) v5
- **State Management**: React Context + useReducer
- **HTTP Client**: Axios
- **Styling**: MUI System + Emotion
- **Mock Data**: Local mock data với API simulation

## 📦 Cài Đặt

### Yêu Cầu Hệ Thống
- Node.js >= 14.0.0
- npm >= 6.0.0

### Bước 1: Clone Repository
```bash
git clone https://github.com/vunhatcr7/ecom.git
cd ecom
```

### Bước 2: Cài Đặt Dependencies
```bash
npm install
```

### Bước 3: Chạy Ứng Dụng
```bash
npm start
```

Ứng dụng sẽ chạy tại: http://localhost:3000

## 🏗️ Build Production

```bash
npm run build
```

## 🧪 Chạy Tests

```bash
npm test
```

## 📁 Cấu Trúc Dự Án

```
src/
├── components/          # React components
│   ├── ProductCard.tsx
│   ├── ProductModal.tsx
│   ├── SearchAndFilter.tsx
│   ├── AISuggestions.tsx
│   └── Header.tsx
├── pages/              # Page components
│   ├── HomePage.tsx
│   ├── FavoritesPage.tsx
│   └── HistoryPage.tsx
├── types/              # TypeScript interfaces
│   └── index.ts
├── utils/              # Utility functions
│   ├── api.ts          # API services
│   ├── helpers.ts      # Helper functions
│   └── AppContext.tsx  # Global state
├── data/               # Mock data
│   └── mockData.ts
└── App.tsx             # Main App component
```

## 🎨 Tính Năng UI/UX

### Design System
- **Color Palette**: Gradient primary colors (#667eea to #764ba2)
- **Typography**: Roboto font family
- **Spacing**: Consistent 8px grid system
- **Border Radius**: 8px for buttons, 12px for cards

### Responsive Breakpoints
- **Mobile**: < 600px
- **Tablet**: 600px - 960px
- **Desktop**: > 960px

### Interactive Elements
- Hover effects trên cards và buttons
- Smooth transitions (0.3s ease)
- Loading states với skeleton
- Error states với retry options

## 🔧 API Endpoints (Mock)

### Products
- `GET /api/products` - Lấy danh sách sản phẩm
- `GET /api/products/:id` - Lấy chi tiết sản phẩm
- `GET /api/products/search?q=:query` - Tìm kiếm sản phẩm
- `GET /api/products/filter` - Lọc sản phẩm

### AI Suggestions
- `GET /api/suggestions?userId=:userId` - Lấy gợi ý AI

## 📱 Tính Năng Chính

### 1. Trang Chủ
- Hiển thị danh sách khóa học
- Tìm kiếm và lọc nâng cao
- Gợi ý AI thông minh
- Loading states và error handling

### 5. Giỏ Hàng
- Hiển thị danh sách sản phẩm trong giỏ
- Xóa từng sản phẩm hoặc xóa tất cả
- Hiển thị tổng giá tiền
- Chuyển sang trang thanh toán

### 6. Thanh Toán
- Hiển thị lại sản phẩm trong giỏ
- Hiển thị thành tiền
- Chọn phương thức thanh toán (Thẻ, Momo, VNPay)
- Xác nhận thanh toán

### 2. Yêu Thích
- Quản lý danh sách yêu thích
- Thêm/xóa khỏi yêu thích
- Badge hiển thị số lượng

### 3. Lịch Sử Xem
- Theo dõi sản phẩm đã xem
- Xóa lịch sử
- Giới hạn 10 items gần nhất

### 4. Modal Chi Tiết
- Thông tin đầy đủ sản phẩm
- Rating và reviews
- Instructor và duration
- Tags và categories

## 🎯 AI Integration

### Gợi Ý Thông Minh
- Dựa trên lịch sử xem
- Dựa trên danh sách yêu thích
- Phân tích category preferences
- Loading skeleton với 1.5s delay
- Error handling với retry option

### Mock AI Logic
```typescript
// Dựa trên hành vi người dùng
const suggestedProducts = products.filter(product => {
  // Không hiển thị sản phẩm đã thích
  if (userFavorites.includes(product.id)) return false;
  
  // Ưu tiên sản phẩm cùng category với sản phẩm đã xem
  const viewedCategories = userHistory.map(id => 
    products.find(p => p.id === id)?.category
  );
  
  return viewedCategories.includes(product.category);
});
```

## 🚀 Performance Optimizations

- **Debounced Search**: 500ms delay
- **Lazy Loading**: Components load khi cần
- **Memoization**: React.memo cho components
- **Optimized Images**: Unsplash CDN
- **Efficient State Management**: Context + useReducer

## 🔒 Error Handling

- **API Errors**: Graceful fallback to mock data
- **Network Errors**: Retry mechanisms
- **User Feedback**: Toast notifications
- **Loading States**: Skeleton loaders

## 📊 Mock Data

Ứng dụng sử dụng 8 khóa học mẫu với đầy đủ thông tin:
- React TypeScript Masterclass
- Python Data Science
- UI/UX Design Fundamentals
- Node.js Backend Development
- Digital Marketing Strategy
- Machine Learning với TensorFlow
- Mobile App Development với Flutter
- Business Analytics với Excel

## 🎨 Customization

### Theme Configuration
```typescript
const theme = createTheme({
  palette: {
    primary: { main: '#667eea' },
    secondary: { main: '#764ba2' },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: { styleOverrides: { root: { borderRadius: 8 } } },
    MuiCard: { styleOverrides: { root: { borderRadius: 12 } } },
  },
});
```

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

MIT License

## 👨‍💻 Author

Nguyễn Văn Test - Frontend Developer

---

**Lưu ý**: Đây là ứng dụng demo với mock data. Trong production, cần thay thế mock API bằng real API endpoints.
