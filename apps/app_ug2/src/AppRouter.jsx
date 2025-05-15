
import { ProgramPage, ProgramRouterSegment, SubjectRouterSegment } from "@hrbolek/uoisfrontend-zp";
import {
      createBrowserRouter,
      RouterProvider
} from "react-router-dom";
<<<<<<< HEAD
import { ExamPage, ExamRouterSegment} from "../../../packages/exam/src";
import { EvaluationPage, EvaluationRouterSegment } from "C:/Users/kryst/source/repos/stefek1/frontendui/packages/exam/src/Evaluation";

export const Routes = [
    {
        path: `/zk/:id`,
        element: <ExamPage />,
    },
    {
        path: `/pepa/:id`,
        element: <EvaluationPage/>
    },
    ExamRouterSegment,
    EvaluationRouterSegment
=======
  
// import { UserRouterSegment } from "@hrbolek/uoisfrontend-ug2";

export const Routes = [
    // UserRouterSegment
    {
        path: "/hello/:id",
        element: <ProgramPage />
    },
    ProgramRouterSegment,
    SubjectRouterSegment,
    
>>>>>>> cb8fd5d1390f13588a5a3d860a2b9bfcbdb931ab
]

// const router = createBrowserRouter(Routes, {basename: "/ug"});
const router = createBrowserRouter(Routes);
// const router = createProxyBrowseRouter(Routes, {basename: "/ug"});

export const AppRouter = () => <RouterProvider router={router} />

