import { Product, User } from '../types';

export const mockProducts: Product[] = [
    {
        id: '1',
        name: 'React TypeScript Masterclass',
        price: 899000,
        originalPrice: 1299000,
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
        description: 'Học React với TypeScript từ cơ bản đến nâng cao',
        longDescription: 'Khóa học toàn diện về React và TypeScript. Bạn sẽ học cách xây dựng ứng dụng web hiện đại với React hooks, context API, và TypeScript để tạo ra code an toàn và dễ bảo trì.',
        category: 'Programming',
        instructor: 'Nguyễn Văn A',
        duration: '20 giờ',
        level: 'Intermediate',
        rating: 4.8,
        reviewCount: 1250,
        tags: ['React', 'TypeScript', 'Frontend', 'Web Development']
    },
    {
        id: '2',
        name: 'Python Data Science',
        price: 699000,
        originalPrice: 999000,
        image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop',
        description: 'Phân tích dữ liệu với Python và các thư viện ML',
        longDescription: 'Khóa học chuyên sâu về Data Science với Python. Học cách sử dụng pandas, numpy, matplotlib, scikit-learn để phân tích dữ liệu và xây dựng mô hình machine learning.',
        category: 'Data Science',
        instructor: 'Trần Thị B',
        duration: '25 giờ',
        level: 'Advanced',
        rating: 4.9,
        reviewCount: 890,
        tags: ['Python', 'Data Science', 'Machine Learning', 'Analytics']
    },
    {
        id: '3',
        name: 'UI/UX Design Fundamentals',
        price: 599000,
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
        description: 'Thiết kế giao diện người dùng hiện đại và trải nghiệm tốt',
        longDescription: 'Học các nguyên tắc thiết kế UI/UX, sử dụng Figma, Adobe XD để tạo ra giao diện đẹp và trải nghiệm người dùng tối ưu.',
        category: 'Design',
        instructor: 'Lê Văn C',
        duration: '15 giờ',
        level: 'Beginner',
        rating: 4.7,
        reviewCount: 567,
        tags: ['UI/UX', 'Design', 'Figma', 'Adobe XD']
    },
    {
        id: '4',
        name: 'Node.js Backend Development',
        price: 799000,
        originalPrice: 1199000,
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop',
        description: 'Xây dựng API và backend với Node.js và Express',
        longDescription: 'Học cách xây dựng RESTful API, authentication, database integration với Node.js, Express, MongoDB. Tạo ra backend mạnh mẽ cho ứng dụng web.',
        category: 'Programming',
        instructor: 'Phạm Thị D',
        duration: '18 giờ',
        level: 'Intermediate',
        rating: 4.6,
        reviewCount: 432,
        tags: ['Node.js', 'Express', 'Backend', 'API']
    },
    {
        id: '5',
        name: 'Digital Marketing Strategy',
        price: 499000,
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
        description: 'Chiến lược marketing kỹ thuật số hiệu quả',
        longDescription: 'Học các chiến lược marketing online, SEO, social media marketing, content marketing để tăng doanh số và phát triển thương hiệu.',
        category: 'Marketing',
        instructor: 'Hoàng Văn E',
        duration: '12 giờ',
        level: 'Beginner',
        rating: 4.5,
        reviewCount: 789,
        tags: ['Marketing', 'SEO', 'Social Media', 'Content']
    },
    {
        id: '6',
        name: 'Machine Learning với TensorFlow',
        price: 1299000,
        originalPrice: 1599000,
        image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=300&fit=crop',
        description: 'Deep Learning và AI với TensorFlow',
        longDescription: 'Khóa học nâng cao về Machine Learning và Deep Learning. Học cách xây dựng neural networks, CNN, RNN với TensorFlow và Keras.',
        category: 'Data Science',
        instructor: 'Vũ Thị F',
        duration: '30 giờ',
        level: 'Advanced',
        rating: 4.9,
        reviewCount: 234,
        tags: ['Machine Learning', 'TensorFlow', 'Deep Learning', 'AI']
    },
    {
        id: '7',
        name: 'Mobile App Development với Flutter',
        price: 899000,
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
        description: 'Phát triển ứng dụng mobile cross-platform',
        longDescription: 'Học Flutter để tạo ứng dụng mobile cho cả iOS và Android. Sử dụng Dart language và Flutter framework để xây dựng app hiệu suất cao.',
        category: 'Programming',
        instructor: 'Đỗ Văn G',
        duration: '22 giờ',
        level: 'Intermediate',
        rating: 4.7,
        reviewCount: 345,
        tags: ['Flutter', 'Mobile', 'Dart', 'Cross-platform']
    },
    {
        id: '8',
        name: 'Business Analytics với Excel',
        price: 399000,
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
        description: 'Phân tích dữ liệu kinh doanh với Excel',
        longDescription: 'Học cách sử dụng Excel để phân tích dữ liệu kinh doanh, tạo dashboard, báo cáo và đưa ra quyết định dựa trên dữ liệu.',
        category: 'Business',
        instructor: 'Ngô Thị H',
        duration: '10 giờ',
        level: 'Beginner',
        rating: 4.4,
        reviewCount: 678,
        tags: ['Excel', 'Analytics', 'Business', 'Dashboard']
    }
];

export const mockUser: User = {
    id: 'user1',
    name: 'Nguyễn Văn Test',
    email: 'test@example.com',
    favorites: ['1', '3', '5'],
    viewHistory: ['1', '2', '4', '6']
};

export const categories = [
    'All',
    'Programming',
    'Data Science',
    'Design',
    'Marketing',
    'Business'
];

export const levels = [
    'All',
    'Beginner',
    'Intermediate',
    'Advanced'
];

export const priceRanges = [
    'All',
    '< 500K',
    '500K - 1M',
    '1M - 2M',
    '> 2M'
]; 