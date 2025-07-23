
import {
      createBrowserRouter,
      RouterProvider
} from "react-router-dom";
import { ExamListPage, ExamPage, ExamRouterSegment} from "../../../packages/exam/src";
import { EvaluationPage, EvaluationRouterSegment } from "../../../packages/exam/src/Evaluation";
import { StudentPage, StudentRouterSegment } from "../../../packages/exam/src/Student";

export const Routes = [
    {
            path: `/exam/exam/edit/:id`,
            element: <ExamPage readOnly={false}/>,
    },
    {
        path: `/exam/exam/view/:id`,
        element: <ExamPage readOnly={true}/>,
    },
    {
        path: '/exampage/examlistpage/edit/',
        element: <ExamListPage readOnly={false}/>,
    },
    {
        path: '/exampage/examlistpage/view/',
        element: <ExamListPage readOnly={true}/>,
    },
    ExamRouterSegment,
    EvaluationRouterSegment,
    StudentRouterSegment,
]

// const router = createBrowserRouter(Routes, {basename: "/ug"});
const router = createBrowserRouter(Routes);
// const router = createProxyBrowseRouter(Routes, {basename: "/ug"});

export const AppRouter = () => <RouterProvider router={router} />

