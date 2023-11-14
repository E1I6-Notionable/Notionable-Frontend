const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      {
        path: 'signup',
        component: () => import('pages/signup/SignupPage.vue'),
      },
      {
        path: 'signup/next',
        component: () => import('pages/signup/SignupPageNext.vue'),
      },
      {
        path: 'signupsuccess',
        component: () => import('pages/signup/SignUpSuccess.vue'),
      },
      {
        path: 'findpassword',
        component: () => import('pages/signup/FindPassword.vue'),
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
