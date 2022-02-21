import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./ProductsCards.module.css";
import { useMediaQuery } from "react-responsive";
import { saveRecentClick } from "../../../store/actions/User-actions";
import { useDispatch } from "react-redux";

function ProductsCards({ products }) {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const dispatch = useDispatch();

  return (
    <div className={styles.products_cards}>
      {isMobile && (
        <div className={styles.products_cards__text_container}>
          <p>Best Products</p>
        </div>
      )}

      <div className={styles.products_cards__container}>
        {products.map((product, index) => (
          <div className={styles.products_cards__best_product_box} key={index}>
            <Link to={`/product/${product.item_slug}/${product.item_id}`}>
              <div className={styles.products_cards__image_container}>
                <img
                  src={`${process.env.REACT_APP_STATIC_URL}${product.item_img_path}`}
                  alt=""
                />
              </div>
            </Link>

            <div className={styles.products_cards__text_content}>
              <span className={styles.products_cards__brand_name}>
                {product.brand_name}
              </span>

              <p>{product.item_name}</p>

              <span className={styles.products_cards__price}>
                ₹
                {product.item_price -
                  (product.item_cb_percent / 100) * product.item_price}{" "}
                <s>₹{product.item_price}</s>
              </span>
              {localStorage.getItem("userInfo") ? (
                <a href={product.item_url} target="_blank" rel="noreferrer">
                  <button
                    onClick={() => dispatch(saveRecentClick(product.store_id))}
                  >
                    Buy Now
                  </button>
                </a>
              ) : (
                <Link to={`/product/${product.item_slug}/${product.item_id}`}>
                  <button>Buy Now</button>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsCards;
