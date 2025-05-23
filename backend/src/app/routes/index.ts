import express from 'express';
import { userRoutes } from '../modules/user/user.routes';
import { authRoutes } from '../modules/auth/auth.routes';
import { courseRoutes } from '../modules/course/course.routes';
import { noteRoutes } from '../modules/note/note.routes';
import { commentRoutes } from '../modules/comment/comment.routes';
import { transactionRoutes } from '../modules/transactions/transactions.routes';
import { videoRoutes } from '../modules/video/video.routes';
import { progressRoutes } from '../modules/progress/progress.routes';
import { quizRoutes } from '../modules/quiz/quiz.routes';
import { analyticsRoutes } from '../modules/analytics/analytics.routes';
import { moduleRoutes as courseModuleRoutes } from '../modules/module/module.routes';
import { milestoneRoutes } from '../modules/milestone/milestone.routes';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/user',
    route: userRoutes,
  },
  {
    path: '/course',
    route: courseRoutes
  },
  {
    path: '/note',
    route: noteRoutes
  },
  {
    path: '/comment',
    route: commentRoutes
  },
  {
    path: '/transaction',
    route: transactionRoutes
  },
  {
    path: '/video',
    route: videoRoutes
  },
  {
    path: '/progress',
    route: progressRoutes
  },
  {
    path: '/quiz',
    route: quizRoutes
  },
  {
    path: '/analytics',
    route: analyticsRoutes
  },
  {
    path: '/module',
    route: courseModuleRoutes
  },
  {
    path: '/milestone',
    route: milestoneRoutes
  }
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
