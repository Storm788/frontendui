
import { ProgramPage, ProgramRouterSegment, SubjectRouterSegment } from "@hrbolek/uoisfrontend-zp";
import {
      createBrowserRouter,
      RouterProvider
} from "react-router-dom";
import { ExamPage, ExamRouterSegment} from "../../../packages/exam/src";
import { EvaluationPage, EvaluationRouterSegment } from "C:/Users/kryst/source/repos/stefek1/frontendui/packages/exam/src/Evaluation";

export const Routes = [
    {
        path: `/exampage/exam/view/:id`,
        element: <ExamPage />,
    },
    {
        path: `/exampage/evaluation/view/:id`,
        element: <EvaluationPage/>
    },
    ExamRouterSegment,
    EvaluationRouterSegment
]

// const router = createBrowserRouter(Routes, {basename: "/ug"});
const router = createBrowserRouter(Routes);
// const router = createProxyBrowseRouter(Routes, {basename: "/ug"});

export const AppRouter = () => <RouterProvider router={router} />

