
import {
      createBrowserRouter,
      RouterProvider
} from "react-router-dom";
import { ExamListPage, ExamPage, ExamRouterSegment} from "../../../packages/exam/src";
import { EvaluationPage, EvaluationRouterSegment } from "../../../packages/exam/src/Evaluation";
import { StudentPage, StudentRouterSegment } from "../../../packages/exam/src/Student";

export const Routes = [
    {
        path: `/exampage/exam/view/:id`,
        element: <ExamPage />,
    },
    {
        path: `/exampage/evaluation/view/:id`,
        element: <EvaluationPage/>
    },
    {
        path: `/exampage/student/view/:id`,
        element: <StudentPage/>
    },
    {
        path: '/exampage/examlistpage/view/',
        element: <ExamListPage/>
    },
    ExamRouterSegment,
    EvaluationRouterSegment,
    StudentRouterSegment,
]

// const router = createBrowserRouter(Routes, {basename: "/ug"});
const router = createBrowserRouter(Routes);
// const router = createProxyBrowseRouter(Routes, {basename: "/ug"});

export const AppRouter = () => <RouterProvider router={router} />

