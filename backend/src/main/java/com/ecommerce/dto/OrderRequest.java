package com.ecommerce.dto;

import lombok.Data;

@Data
public class OrderRequest {
    private String shippingName;
    private String shippingAddress;
    private String shippingCity;
    private String shippingZip;
    private String shippingPhone;
}
