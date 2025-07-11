# 🎯 Demo Hướng Dẫn Sử Dụng

## 🚀 Cách Chạy Ứng Dụng

1. **Mở terminal và di chuyển vào thư mục dự án:**
   ```bash
   cd edu-ecommerce
   ```

2. **Cài đặt dependencies:**
   ```bash
   npm install
   ```

3. **Chạy ứng dụng:**
   ```bash
   npm start
   ```

4. **Mở trình duyệt và truy cập:**
   ```
   http://localhost:3000
   ```

## 🎮 Hướng Dẫn Sử Dụng

### 1. Trang Chủ (Home)
- **Xem danh sách khóa học**: Tất cả khóa học được hiển thị dưới dạng cards
- **Tìm kiếm**: Sử dụng thanh tìm kiếm để tìm khóa học theo tên
- **Lọc**: Sử dụng dropdown để lọc theo:
  - Danh mục (Programming, Data Science, Design, Marketing, Business)
  - Trình độ (Beginner, Intermediate, Advanced)
  - Khoảng giá (< 500K, 500K - 1M, 1M - 2M, > 2M)

### 2. Gợi Ý AI
- **Nhấn nút "Nhận gợi ý ngay"** để xem gợi ý thông minh
- **Loading skeleton** sẽ hiển thị trong 1.5 giây
- **Kết quả** dựa trên lịch sử xem và yêu thích của bạn

### 3. Chi Tiết Khóa Học
- **Nhấn "Xem chi tiết"** trên bất kỳ khóa học nào
- **Modal** sẽ mở với thông tin chi tiết:
  - Ảnh lớn
  - Mô tả đầy đủ
  - Rating và reviews
  - Instructor và duration
  - Tags và categories
  - Nút yêu thích

### 4. Yêu Thích
- **Thêm vào yêu thích**: Nhấn icon ♡ trên card hoặc trong modal
- **Xem danh sách yêu thích**: Nhấn "Yêu thích" trong header
- **Badge** hiển thị số lượng yêu thích
- **Xóa khỏi yêu thích**: Nhấn lại icon ♥

### 5. Lịch Sử Xem
- **Tự động cập nhật** khi bạn xem chi tiết khóa học
- **Xem lịch sử**: Nhấn "Lịch sử" trong header
- **Xóa lịch sử**: Nhấn "Xóa lịch sử" trong trang History

### 6. Navigation
- **Header menu**: Sử dụng menu user để truy cập nhanh
- **Responsive**: Hoạt động tốt trên mobile, tablet, desktop

## 🎨 Tính Năng UI/UX

### Visual Effects
- **Hover effects**: Cards nổi lên khi hover
- **Smooth transitions**: Tất cả animations mượt mà
- **Loading states**: Skeleton loaders cho API calls
- **Error handling**: Toast notifications và retry options

### Responsive Design
- **Mobile**: 1 cột, tối ưu cho màn hình nhỏ
- **Tablet**: 2 cột, layout cân bằng
- **Desktop**: 4 cột, hiển thị tối đa

### Color Scheme
- **Primary**: Gradient từ #667eea đến #764ba2
- **Cards**: White background với shadow
- **Text**: Dark gray cho readability
- **Accents**: Red cho favorites, blue cho primary actions

## 🔧 Mock Data

### Khóa Học Mẫu
1. **React TypeScript Masterclass** - 899K (giảm từ 1.299M)
2. **Python Data Science** - 699K (giảm từ 999K)
3. **UI/UX Design Fundamentals** - 599K
4. **Node.js Backend Development** - 799K (giảm từ 1.199M)
5. **Digital Marketing Strategy** - 499K
6. **Machine Learning với TensorFlow** - 1.299M (giảm từ 1.599M)
7. **Mobile App Development với Flutter** - 899K
8. **Business Analytics với Excel** - 399K

### User Data
- **User ID**: user1
- **Favorites**: [1, 3, 5] (React, UI/UX, Marketing)
- **View History**: [1, 2, 4, 6] (React, Python, Node.js, ML)

## 🎯 Test Cases

### 1. Tìm Kiếm
- Tìm "React" → Hiển thị React TypeScript Masterclass
- Tìm "Python" → Hiển thị Python Data Science
- Tìm "Marketing" → Hiển thị Digital Marketing Strategy

### 2. Lọc
- Lọc "Programming" → Hiển thị 3 khóa học
- Lọc "Beginner" → Hiển thị 2 khóa học
- Lọc "< 500K" → Hiển thị 2 khóa học

### 3. AI Suggestions
- Nhấn "Nhận gợi ý ngay" → Loading skeleton → 4 gợi ý
- Dựa trên lịch sử xem Programming và Data Science

### 4. Yêu Thích
- Thêm khóa học vào yêu thích → Badge tăng
- Xem trang Favorites → Hiển thị 3 khóa học
- Xóa khỏi yêu thích → Badge giảm

### 5. Chi Tiết
- Nhấn "Xem chi tiết" → Modal mở
- Thông tin đầy đủ hiển thị
- Có thể yêu thích từ modal

## 🚨 Error Scenarios

### 1. API Fail
- Simulate network error
- Fallback to mock data
- Error message với retry button

### 2. Empty Results
- Tìm kiếm không có kết quả
- Hiển thị empty state
- Suggest clear filters

### 3. Loading States
- API call delay
- Skeleton loaders
- Progress indicators

## 📱 Mobile Testing

### Responsive Breakpoints
- **< 600px**: Mobile layout
- **600px - 960px**: Tablet layout  
- **> 960px**: Desktop layout

### Touch Interactions
- Tap to view details
- Tap to favorite
- Swipe gestures (nếu có)

## 🎉 Kết Luận

Ứng dụng đã hoàn thành tất cả yêu cầu:
- ✅ Hiển thị danh sách sản phẩm
- ✅ Tìm kiếm và lọc
- ✅ Gợi ý AI thông minh
- ✅ Modal chi tiết sản phẩm
- ✅ Yêu thích và quản lý
- ✅ Lịch sử xem
- ✅ Responsive design
- ✅ Error handling
- ✅ Modern UI/UX

**Chúc bạn sử dụng ứng dụng vui vẻ! 🎊** 