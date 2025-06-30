INSERT INTO categories(name) VALUES
('Điện thoại & Phụ kiện'),
('Máy tính & Laptop'),
('Thời trang Nam'),
('Thời trang Nữ'),
('Mẹ & Bé'),
('Sức khỏe & Làm đẹp'),
('Đồ gia dụng'),
('Thiết bị điện tử'),
('Thể thao & Dã ngoại'),
('Sách & Văn phòng phẩm'),
('Đồ chơi'),
('Thú cưng'),
('Voucher & Dịch vụ'),
('Tạp hóa'),
('Nhà sách online'),
('Giày dép'),
('Túi xách & Phụ kiện'),
('Đồng hồ & Trang sức'),
('Nhà cửa & Đời sống');

INSERT INTO order_status (status_name) VALUES
('Đang chờ xử lý'),
('Đang vận chuyển'),
('Đã hoàn thành'),
('Đã hủy');

INSERT INTO shipping_methods (name, price) VALUES 
('Bình thường', 5000),
('Nhanh', 8000),
('Hỏa tốc', 12000);