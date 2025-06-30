-- CREATE DATABASE e_commerce_project
-- USE e_commerce_project

/* Hình ảnh của người dùng - brand */
CREATE TABLE images(
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

/* Đối tượng người dùng */
CREATE TABLE users (
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(50) NOT NULL UNIQUE, 
    password VARCHAR(255) NOT NULL,
    name VARCHAR(30) NOT NULL,
    phone VARCHAR(10) NOT NULL UNIQUE,
    role ENUM('admin', 'customer', 'seller') NOT NULL,
    image_id BIGINT UNIQUE NULL,
    verified ENUM('verified', 'unverified') DEFAULT 'unverified',
    verified_at TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_users_images FOREIGN KEY (image_id) REFERENCES images(id)
    ON DELETE SET NULL ON UPDATE CASCADE -- Đặt image_id thành NULL khi xóa ảnh
);

/* Đối tượng người bán hàng được mở rộng từ khách hàng */
CREATE TABLE sellers (
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL UNIQUE, 
	business_license ENUM('pending', 'approved', 'expired') NOT NULL DEFAULT 'pending',
    payment_status ENUM('unpaid', 'paid') NOT NULL DEFAULT 'unpaid',    
    province_code VARCHAR(20),
    district_code VARCHAR(20),
    ward_code VARCHAR(20),
    address_description VARCHAR(255) NOT NULL,
    expired_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_sellers_users FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE, -- Đặt user bị xóa thì seller cũng bị xóa
    CONSTRAINT fk_sellers_provinces FOREIGN KEY (province_code) REFERENCES provinces(code)
    ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT fk_sellers_districts FOREIGN KEY (district_code) REFERENCES districts(code)
    ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT fk_sellers_wards FOREIGN KEY (ward_code) REFERENCES wards(code)
    ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE brands (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    seller_id BIGINT NOT NULL,
    name VARCHAR(100) NOT NULL,
    image_id BIGINT,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (seller_id) REFERENCES sellers(id)
    ON DELETE CASCADE,
    FOREIGN KEY (image_id) REFERENCES images(id)
    ON DELETE SET NULL ON UPDATE CASCADE
);

/* Địa chỉ của khách hàng, 1 khách hàng có thể có nhiều địa chỉ */
CREATE TABLE address(
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    name VARCHAR(30) NOT NULL,
    phone VARCHAR(10) NOT NULL,
    province_code VARCHAR(20),
    district_code VARCHAR(20),
    ward_code VARCHAR(20),
    address_description VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_address_provinces FOREIGN KEY (province_code) REFERENCES provinces(code)
    ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT fk_address_districts FOREIGN KEY (district_code) REFERENCES districts(code)
    ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT fk_address_wards FOREIGN KEY (ward_code) REFERENCES wards(code)
    ON DELETE SET NULL ON UPDATE CASCADE
);

/* Giữ token để lấy lại mật khẩu - xác thực email */
CREATE TABLE email_tokens (
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(50) NOT NULL UNIQUE,
    token VARCHAR(50) NOT NULL UNIQUE,
    type ENUM('password_reset', 'email_verification') NOT NULL,
    expired_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_password_reset_token_users FOREIGN KEY (email) REFERENCES users(email)
    ON DELETE CASCADE -- user bị xóa thì xóa luôn trường chứa email tham chiếu
);

/* Danh mục sản phẩm */
CREATE TABLE categories (
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(50) NOT NULL UNIQUE,
    active ENUM('active', 'stopped') NOT NULL DEFAULT 'active',
    deleted_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

/* Thuộc tính của sản phẩm, do người bán tự tạo */
CREATE TABLE product_attributes (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    seller_id BIGINT NOT NULL, -- Người bán tạo thuộc tính
    attribute_name VARCHAR(50) NOT NULL, -- Tên thuộc tính (VD: "Màu sắc", "Kích thước")
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_product_attributes_sellers FOREIGN KEY (seller_id) REFERENCES sellers(id)
    ON DELETE CASCADE
);

/* Giá trị của từng thuộc tính, 1 thuộc tích có thể có nhiều giá trị */
CREATE TABLE product_attribute_values (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    attribute_id BIGINT NOT NULL, -- Thuộc tính liên quan
    value VARCHAR(50) NOT NULL, -- Giá trị thuộc tính (VD: "Đỏ", "Xanh", "S", "M")
    
    CONSTRAINT fk_product_attribute_values_attributes FOREIGN KEY (attribute_id) REFERENCES product_attributes(id)
    ON DELETE CASCADE
);

/* Sản phẩm */
CREATE TABLE products (
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(200) NOT NULL,
    category_id BIGINT,
    brand_id BIGINT NOT NULL,
    description LONGTEXT NOT NULL,
    rating DECIMAL(3,1) NULL,
    sales_count INT NOT NULL DEFAULT 0,
    views_count INT NOT NULL DEFAULT 0,
    stock INT NOT NULL DEFAULT 0,
    active ENUM('selling', 'out_of_stock', 'stopped') NOT NULL DEFAULT 'selling',
    discount_percent INT NOT NULL DEFAULT 0,
    discount_start_date TIMESTAMP,
    discount_end_date TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_products_categories FOREIGN KEY (category_id) REFERENCES categories(id)
    ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT fk_products_brands FOREIGN KEY (brand_id) REFERENCES brands(id)
    ON DELETE CASCADE
);

/* Ảnh/Video sản phẩm */
CREATE TABLE product_media(
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL UNIQUE,
    product_id BIGINT NOT NULL,
    media_type ENUM('image', 'video'),
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_products_media_products FOREIGN KEY (product_id) REFERENCES products(id)
    ON DELETE CASCADE
);

/* Ảnh của sản phẩm biến thể */
CREATE TABLE product_variant_images(
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

/* Sản phẩm biến thể */
CREATE TABLE product_variants (
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    product_id BIGINT NOT NULL,
    price INT NOT NULL DEFAULT 0,
    stock INT NOT NULL DEFAULT 0,
    weight DECIMAL(5,2) DEFAULT NULL, -- trọng lượng sản phẩm
    dimensions VARCHAR(100) NULL, -- kích thước cao x dài x rộng
    active ENUM('selling', 'out_of_stock', 'stopped') NOT NULL DEFAULT 'selling',
    image_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_products_variants_products FOREIGN KEY (product_id) REFERENCES products(id)
    ON DELETE CASCADE,
    CONSTRAINT fk_products_variants_product_variant_images FOREIGN KEY (image_id) REFERENCES product_variant_images(id)
    ON DELETE CASCADE
);

/* Sản phẩm biến thể đi kèm thuộc tính */
CREATE TABLE product_variant_attributes (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    product_variant_id BIGINT NOT NULL, -- Biến thể sản phẩm
    attribute_value_id BIGINT NOT NULL, -- Giá trị thuộc tính
    
    CONSTRAINT fk_product_variant_attributes_variants FOREIGN KEY (product_variant_id) REFERENCES product_variants(id)
    ON DELETE CASCADE,
    CONSTRAINT fk_product_variant_attributes_values FOREIGN KEY (attribute_value_id) REFERENCES product_attribute_values(id)
    ON DELETE CASCADE
);

/* Trạng thái đơn hàng */
CREATE TABLE order_status (
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
	status_name VARCHAR(50) NOT NULL UNIQUE,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

/* Phương thức vận chuyển */
CREATE TABLE shipping_methods (
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(50) NOT NULL UNIQUE,
    price INT NOT NULL, -- giá vận chuyển 5k/1km
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

/* Đơn hàng */
CREATE TABLE orders (
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT,
    status_id BIGINT,
    shipping_method_id BIGINT,
    note VARCHAR(255),
    shipped_at TIMESTAMP,
    delivered_at TIMESTAMP,
    distance INT NOT NULL,
    total_price INT NOT NULL, -- phương thức vận chuyển -> tiền * distance + tổng tiền sp = total price
    deleted_at TIMESTAMP NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_orders_users FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT fk_orders_shipping_methods FOREIGN KEY (shipping_method_id) REFERENCES shipping_methods(id)
    ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT fk_orders_order_status FOREIGN KEY (status_id) REFERENCES order_status(id)
    ON DELETE SET NULL ON UPDATE CASCADE
);

/* Vật phẩm đơn hàng
	product_name: tránh hiển thị tên null khi sản phẩm bị xóa
 */
CREATE TABLE order_items (
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    product_name VARCHAR(255),
    price INT NOT NULL,
    quantity INT NOT NULL,
    discount_percent INT NOT NULL DEFAULT 0,
    return_status ENUM('not_requested', 'requested', 'approved', 'rejected', 'returned') DEFAULT 'not_requested',
    final_price INT NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_order_items_orders FOREIGN KEY (order_id) REFERENCES orders(id),
    CONSTRAINT fk_order_items_products FOREIGN KEY (product_id) REFERENCES products(id)
);

/* Thanh toán đơn hàng */
CREATE TABLE payments (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    order_id BIGINT NOT NULL,
    method ENUM('cod', 'qr') NOT NULL,
    status ENUM('pending', 'completed', 'failed', 'refunded') NOT NULL DEFAULT 'pending',
    paid_at TIMESTAMP NULL, -- thời gian thanh toán thành công
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_payments_orders FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

/* Mã giảm giá */
CREATE TABLE coupons (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    code VARCHAR(50) NOT NULL UNIQUE,
    type ENUM('brand', 'admin') NOT NULL,
    brand_id BIGINT NULL,
    discount_percent INT NOT NULL,
    max_uses INT NOT NULL,
    used_count INT DEFAULT 0,
    expired_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_coupons_brands FOREIGN KEY (brands) REFERENCES brands(id) ON DELETE CASCADE
);

/* Mã giảm giá được áp dụng cho đơn hàng */
CREATE TABLE order_coupons (
    order_id BIGINT NOT NULL,
    coupon_id BIGINT NOT NULL,

    PRIMARY KEY(order_id, coupon_id),
    CONSTRAINT fk_order_coupons_orders FOREIGN KEY (order_id) REFERENCES orders(id),
    CONSTRAINT fk_order_coupons_coupons FOREIGN KEY (coupon_id) REFERENCES coupons(id)
);

/* Yêu cầu hoàn trả hàng
	refund: hoàn tiền
    exchange: đổi hàng
 */
CREATE TABLE return_requests (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    order_item_id BIGINT NOT NULL,
    reason TEXT NOT NULL,
    return_type ENUM('refund', 'exchange') NOT NULL DEFAULT 'refund',
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_return_requests_order_items FOREIGN KEY (order_item_id) REFERENCES order_items(id)
);

/* Ảnh/video tình trạng sản phẩm đơn hàng - hoàn đổi */
CREATE TABLE return_media (
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    return_request_id BIGINT NOT NULL,
    media_type ENUM('image', 'video') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_return_media_return_requests FOREIGN KEY (return_request_id) REFERENCES return_requests(id)
);

/* Bình luận, đánh giá sản phẩm */
CREATE TABLE reviews (
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    product_id BIGINT NOT NULL,
    user_id BIGINT,
    rating INT NOT NULL,
    review_text TEXT NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_reviews_products FOREIGN KEY (product_id) REFERENCES products(id)
    ON DELETE CASCADE,
    CONSTRAINT fk_reviews_users FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE SET NULL ON UPDATE CASCADE
);

/* Ảnh/video đánh giá */
CREATE TABLE review_media(
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL UNIQUE,
    review_id BIGINT NOT NULL,
    media_type ENUM('image', 'video') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_review_media_reviews FOREIGN KEY (review_id) REFERENCES reviews(id)
    ON DELETE CASCADE
);

/* Sản phẩm yêu thích */
CREATE TABLE favorite_products (
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT,
    product_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_favorite_products_users FOREIGN KEY (user_id) REFERENCES users(id) 
    ON DELETE CASCADE,
    CONSTRAINT fk_favorite_products_products FOREIGN KEY (product_id) REFERENCES products(id) 
    ON DELETE CASCADE
);

/* Ghi lại thao tác của người dùng */
CREATE TABLE activity_logs (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT,
    action VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_activity_logs_users FOREIGN KEY (user_id) REFERENCES users(id)
);

/* Điều chỉnh % chiết khấu
	seller_id: NULL -> áp dụng cho toàn bộ hệ thống, ngược lại chỉ áp dụng cho 1 số seller
	commission_percent: % chiết khấu
	effective_from: ngày có hiệu lực
 */
CREATE TABLE commission_settings(
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    brand_id BIGINT NULL,
    commission_percent INT NOT NULL,
    effective_from TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (brand_id) REFERENCES brands(id)
);

/* Thống kê doanh thu 
	total_amount: tổng tiền của đơn
    commission_percent: chiết khấu
    seller_receive_amount: seller nhận tiền sau chiết khấu
    admin_receive_amount: admin nhận tiền sau chiết khấu
*/
CREATE TABLE commission_history (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    brand_id BIGINT,
    order_id BIGINT,
    total_amount INT NOT NULL,
    commission_setting_id BIGINT NOT NULL,
    seller_receive_amount INT NOT NULL,
    admin_receive_amount INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (brand_id) REFERENCES brands(id),
    FOREIGN KEY (order_id) REFERENCES orders(id),
    
    FOREIGN KEY (commission_setting_id) REFERENCES commission_settings(id)
);