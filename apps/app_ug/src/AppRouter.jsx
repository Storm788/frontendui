import {
      createBrowserRouter,
      RouterProvider
} from "react-router-dom";
import { GroupRouterSegment, UserRouterSegment } from "@hrbolek/uoisfrontend-ug2";
  
// import { UserPage } from "@hrbolek/uoisfrontend-ug";
// import { UserStudiesPage } from "@hrbolek/uoisfrontend-granting";
// import { GroupPage } from "@hrbolek/uoisfrontend-ug";
// import { AdmissionPage } from "../../../packages/admissions/src";
// import { RequestTypePage, RequestCategoriesPage, RequestCategoryPage, RequestDesignPage, RequestPage, RequestsPage, RequestCreatePage } from "../../../packages/requests/src";
// import { GroupCategoryEditPage } from "@hrbolek/uoisfrontend-ug/";
// import { GroupEditPage } from "@hrbolek/uoisfrontend-ug";

// const prefix = "/ug"
// export const Routes = [
//     {
//         path: `/${prefix}/user/view/:id`,
//         element: <UserPage />,
//     },  
//     {
//       path: `/${prefix}/group/view/:id`,
//       element: <GroupPage />,
//     },  //GroupCategoryEditPage
//     {
//         path: `/${prefix}/group/edit/:id`,
//         element: <GroupEditPage />,
//     },  //GroupCategoryEditPage
//     {
//         path: `/${prefix}/groupcategory/edit/:id`,
//         element: <GroupCategoryEditPage />,
//     },  //GroupCategoryEditPage
//     {
//         path: `/admissions/admission/view/:id`,
//         element: <AdmissionPage />
//     },  
//     {
//         path: `/studies/user/view/:id`,
//         element: <UserStudiesPage />
//     },
//     {
//         path: `/requests/request/view/:id`,
//         element: <RequestPage />
//     },
//     {
//         path: `/requests/request/wizard`,
//         element: <RequestCreatePage />
//     },
//     {
//         path: `/requests/request/wizard/:id`,
//         element: <RequestCreatePage />
//     },
//     {
//         path: `/requests/request/design/:id`,
//         element: <RequestDesignPage />
//     },
//     {
//         path: `/requests/category/view/:id`,
//         element: <RequestCategoryPage />
//     },
//     {
//         path: `/requests/categories/view`,
//         element: <RequestCategoriesPage />
//     },
//     {
//         path: `/requests/type/view/:id`,
//         element: <RequestTypePage />
//     },
//     {
//         path: `/requests/all/view`,
//         element: <RequestsPage />
//     }
// ]

const Routes = [
    UserRouterSegment,
    GroupRouterSegment
]

// const router = createBrowserRouter(Routes, {basename: "/ug"});
const router = createBrowserRouter(Routes);
// const router = createProxyBrowseRouter(Routes, {basename: "/ug"});

export const AppRouter = () => <RouterProvider router={router} />

