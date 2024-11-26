import PrivateRoute from "../components/privateRouter";
import ContactUs from "../pages/contactus/contactus";
import Dashboard from "../pages/dashboard/dashboard";
import Login from "../pages/login/login";
import MainCategory from "../pages/maincategory/maincategory";
import PartnerCompany from "../pages/partnercompany/partnercompany";
import Product from "../pages/product/product";

const PageRoutes = [
    {
        path:"/",
        element:<Login/>,
        title:"Login",
        layout:false
    },
    {
        path:"/dashboard",
        element:
                <Dashboard/>
,
        title:"Dashboard",
        layout:true
    },
    {
        path:"/maincategory",
        element:
                <MainCategory/>
         ,
        title:"MainCategory",
        layout:true
    },
    {
        path:"/product",
        element: <Product/> ,
        title:"Product",
        layout:true
    },
    {
        path:"/partnercompany",
        element:
                <PartnerCompany/>
         ,
        title:"PartnerCompany",
        layout:true
    },
    {
        path:"/contactus",
        element:
                <ContactUs/>
         ,
        title:"ContactUs",
        layout:true
    },
]


export default PageRoutes;