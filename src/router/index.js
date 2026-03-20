import { createRouter, createWebHistory } from "vue-router";
import authMiddleware from "@/middleware/auth.js";
const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("@/views/Index.vue"),
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("@/views/Auth/Login.vue"),
    },
    {
      path: "/register",
      name: "Register",
      component: () => import("@/views/Auth/Register.vue"),
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: () => import("@/views/Customer/Dashboard.vue"),
    },
    {
      path: "/products",
      name: "AllProduct",
      component: () => import("@/views/Product/Index.vue"),
    },
    {
      path: "/product/:slug",
      name: "SingleProduct",
      component: () => import("@/views/Product/Show.vue"),
    },
    {
      path: '/new-arrivals',
      name: 'NewArrivals',
      component: () => import('@/views/NewArrivals/Index.vue'),
    },
    {
      path: '/reviews',
      name: 'AllReview',
      component: () => import('@/views/Review/Index.vue')
    },
    {
      path: "/wishlist",
      name: "WishProduct",
      component: () => import("@/views/WishProduct/Index.vue"),
    },
    {
      path: "/blogs",
      name: "Blogs",
      component: () => import("@/views/Blog/Index.vue"),
    },
    {
      path: "/blog/:slug",
      name: "SingleBlog",
      component: () => import("@/views/Blog/Show.vue"),
    },
	{
      path: "/categories/:slug",
      name: "AllCategory",
      component: () => import("@/views/Category/Index.vue"),
    },
    {
      path: "/category/:slug",
      name: "CategoryProduct",
      component: () => import("@/views/Category/Show.vue"),
    },
    {
      path: "/contact",
      name: "Contact",
      component: () => import("@/views/Contact/Index.vue"),
    },
    {
      path: "/cart",
      name: "Cart",
      component: () => import("@/views/Customer/Cart.vue"),
    },  
    {
      path: "/checkout",
      name: "Checkout",
      component: () => import("@/views/Order/Checkout.vue"),
    },
    {
      path: "/success",
      name: "OrderSuccess",
      component: () => import("@/views/Order/Success.vue"),
    },
	{
      path: "/order-invoice/:id",
      name: "OrderInvoice",
      component: () => import("@/views/Order/Invoice.vue"),
    },
    {
      path: "/order-detail/:id",
      name: "OrderDetail",
      component: () => import("@/views/Order/Show.vue"),
    },
    {
      path: "/write-review/:slug",
      name: "WriteReview",
      component: () => import("@/views/Review/Create.vue"),
    },
	{
		path: '/:slug',
		name: 'custom-page',
		component:() => import('@/views/CustomPage/Index.vue')
	}
  ],
});
router.beforeEach(authMiddleware);
export default router;
