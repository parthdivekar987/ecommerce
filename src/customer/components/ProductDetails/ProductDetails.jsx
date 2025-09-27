import { LinearProgress } from "@mui/material";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";
import { mens_kurta } from "../../../Data/mens_kurta";
import ProductReviewCard from "./ProductReviewCard";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { findProductsById } from "../../../State/Product/Action";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../../State/Cart/Action";

const staticProductImages = {
  name: "Basic Tee 6-Pack",
  price: "₹192",
  href: "#",
  breadcrumbs: [
    { id: 1, name: "Men", href: "#" },
    { id: 2, name: "Clothing", href: "#" },
  ],
  images: [
    {
      src: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
      alt: "Two each of gray, white, and black shirts laying flat.",
    },
    {
      src: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
      alt: "Model wearing plain black basic tee.",
    },
    {
      src: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
      alt: "Model wearing plain gray basic tee.",
    },
    {
      src: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
      alt: "Model wearing plain white basic tee.",
    },
  ],
  sizes: [
    { name: "S", inStock: true, quantity: 10 },
    { name: "M", inStock: true, quantity: 15 },
    { name: "L", inStock: true, quantity: 20 },
    { name: "XL", inStock: true, quantity: 5 },
  ],
  description: "The Basic Tee 6-Pack allows you to fully express...",
  highlights: [
    "Hand cut and sewn locally",
    "Dyed with our proprietary colors",
    "Pre-washed & pre-shrunk",
    "Ultra-soft 100% cotton",
  ],
  details: "The 6-Pack includes two black, two white, and two heather gray...",
};

const reviews = { average: 4.5, totalCount: 1230 };

export default function ProductDetails() {
  const [selectedSize, setSelectedSize] = useState(null);
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  const { product, loading, error } = useSelector((store) => store.products);
  const { auth } = useSelector((store) => store);

  const handleAddToCart = () => {
    if (selectedSize && auth.user) {
      const data = { 
        productId: params.productId, 
        size: selectedSize,
        userId: auth.user.id 
      };
      console.log("data==", data);
      dispatch(addItemToCart(data));
      navigate("/cart");
    } else if (!selectedSize) {
      alert("Please select a size before adding to cart.");
    } else if (!auth.user) {
      alert("Please log in to add items to your cart.");
    }
  };

  useEffect(() => {
    const data = { productId: params.productId };
    dispatch(findProductsById(data));
  }, [params.productId, dispatch]);

  if (loading) {
    return <LinearProgress color="secondary" sx={{ mt: 3 }} />;
  }

  if (!product || error) {
    return <div>Product not found or an error occurred.</div>;
  }

  return (
    <div className="bg-white lg:px-20">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            {product?.category?.parentCategory?.parentCategory?.name && (
              <li key={product.category.parentCategory.parentCategory.name}>
                <a
                  href={`/product/${product.category.parentCategory.parentCategory.name}`}
                  className="mr-2 text-sm font-medium text-gray-900"
                >
                  {product.category.parentCategory.parentCategory.name}
                </a>
                <span className="text-gray-400">{">"}</span>
              </li>
            )}
            {product?.category?.parentCategory?.name && (
              <li key={product.category.parentCategory.name}>
                <a
                  href={`/product/${product.category.parentCategory.name}`}
                  className="mr-2 text-sm font-medium text-gray-900"
                >
                  {product.category.parentCategory.name}
                </a>
                <span className="text-gray-400">{">"}</span>
              </li>
            )}
            {product?.category?.name && (
              <li key={product.category.name}>
                <a
                  href={`/product/${product.category.name}`}
                  className="mr-2 text-sm font-medium text-gray-900"
                >
                  {product.category.name}
                </a>
                <span className="text-gray-400">{">"}</span>
              </li>
            )}
            <li className="text-sm font-medium text-gray-500 hover:text-gray-600">
              {product.title}
            </li>
          </ol>
        </nav>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 px-4 pt-10">
          <div className="flex flex-col items-center">
            <div className="overflow-hidden rounded-lg max-w-[30rem] max-h-[30rem]">
              <img
                src={product.imageUrl}
                alt={product.title}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex space-x-5 justify-center mt-4">
              {(product.images || staticProductImages.images).map((img, index) => (
                <img
                  key={index}
                  src={img.src}
                  alt={img.alt}
                  className="w-24 h-24 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>

          <div className="lg:col-span-1 mx-auto max-w-2xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
            <h1 className="text-lg lg:text-xl font-semibold text-gray-900">
              {product.brand} - {product.title}
            </h1>
            <div className="flex space-x-5 items-center text-lg mt-6">
              <p className="font-semibold">₹{product.discountedPrice}</p>
              <p className="opacity-50 line-through">₹{product.price}</p>
              <p className="text-green-600 font-semibold">{product.discountPersent}% Off</p>
            </div>
            <div className="mt-6 flex items-center space-x-3">
              <Rating
                value={product.ratings?.average || reviews.average}
                precision={0.5}
                readOnly
              />
              <p className="opacity-50 text-sm">{product.ratings?.count || 0} Ratings</p>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Size</h3>
              <div className="flex space-x-2 mt-4">
                {(product.sizes && product.sizes.length > 0 ? product.sizes : staticProductImages.sizes).map((size) => (
                  <button
                    key={size.name}
                    onClick={() => setSelectedSize(size.name)}
                    disabled={!size.inStock}
                    className={`
                      px-6 py-4 rounded-md border text-sm font-medium uppercase
                      ${selectedSize === size.name ? 'bg-indigo-600 text-white' : 'bg-white text-gray-900'}
                      ${!size.inStock ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100 cursor-pointer'}
                    `}
                  >
                    {size.name}
                  </button>
                ))}
              </div>
            </div>

            <Button
              onClick={handleAddToCart}
              variant="contained"
              color="secondary"
              disabled={!selectedSize}
              sx={{ mt: 2, px: "1rem", py: "0.5rem" }}
            >
              Add to Cart
            </Button>

            <div className="py-10">
              <h2 className="text-sm font-medium text-gray-900">Description</h2>
              <p className="text-sm text-gray-600 mt-2">{product.description}</p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl pt-8">
          <h1 className="font-semibold text-lg pb-4">Recent Review & Rating</h1>
          <div className="border border-gray-200 p-8 rounded-lg bg-white">
            <div className="flex flex-col md:flex-row gap-10">
              <div className="flex-1 space-y-5">
                {[1, 2, 3].map((_, idx) => (
                  <ProductReviewCard key={idx} />
                ))}
              </div>
              <div className="flex-2 flex flex-col justify-center">
                <h2 className="text-xl font-semibold pb-2">Product Ratings</h2>
                <Rating
                  value={product.ratings?.average || reviews.average}
                  precision={0.5}
                  readOnly
                />
              </div>
            </div>
          </div>
        </section>

        <section className="pt-10">
          <h1 className="py-5 text-xl font-bold">Similar Products</h1>
          <div className="flex flex-wrap gap-8">
            {mens_kurta.map((item, idx) => (
              <HomeSectionCard key={idx} product={item} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}