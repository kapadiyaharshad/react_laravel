import AddCategory from '../components/admin/category/AddCategory';
import Category from '../components/admin/category/Category';
import EditCategory from '../components/admin/category/EditCategory';
import Dashboard from '../components/admin/Dashboard';
import AddProduct from '../components/admin/product/AddProduct';
import EditProduct from '../components/admin/product/EditProduct';
import Product from '../components/admin/product/Product';
import Profile from '../components/admin/Profile';

const routes = [
    { path: '/admin', exact: true, name: 'Admin' },
    { path: '/admin/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
    { path: '/admin/category', exact: true, name: 'Category', component: Category },
    { path: '/admin/add-category', exact: true, name: 'AddCategory', component: AddCategory },
    { path: '/admin/edit-category/:id', exact: true, name: 'EditCategory', component: EditCategory },
    { path: '/admin/product', exact: true, name: 'Product', component:  Product},
    { path: '/admin/add-product', exact: true, name: 'AddProduct', component:  AddProduct},
    { path: '/admin/edit-product/:id', exact: true, name: 'EditProduct', component:  EditProduct},
    { path: '/admin/profile', exact: true, name: 'Profile', component: Profile },
];

export default routes;