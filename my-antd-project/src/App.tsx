import { 
    Refine,
    GitHubBanner, 
    WelcomePage,
    Authenticated, 
} from '@refinedev/core';
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { AuthPage,ErrorComponent
,useNotificationProvider
,ThemedLayoutV2
,ThemedSiderV2} from '@refinedev/antd';
import "@refinedev/antd/dist/reset.css";

import dataProvider from "@refinedev/simple-rest";
import { App as AntdApp } from "antd"
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import routerBindings, { NavigateToResource, CatchAllNavigate, UnsavedChangesNotifier, DocumentTitleHandler } from "@refinedev/react-router-v6";
import { useTranslation } from "react-i18next";
import { BlogPostList, BlogPostCreate, BlogPostEdit, BlogPostShow } from "./pages/blog-posts";
import { CategoryList, CategoryCreate, CategoryEdit, CategoryShow } from "./pages/categories";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { Header } from "./components/header";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { ForgotPassword } from "./pages/forgotPassword";
import { authProvider } from "./authProvider";




function App() {
    const { t, i18n } = useTranslation();

    
            const i18nProvider = {
                translate: (key: string, params: object) => t(key, params),
                changeLocale: (lang: string) => i18n.changeLanguage(lang),
                getLocale: () => i18n.language,
            };
            
    
    return (
        <BrowserRouter>
        <GitHubBanner />
        <RefineKbarProvider>
            <ColorModeContextProvider>
<AntdApp>
            <DevtoolsProvider>
                <Refine dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
notificationProvider={useNotificationProvider}
routerProvider={routerBindings}
authProvider={authProvider}
i18nProvider={i18nProvider} 
                        resources={[
                            {
                                name: "blog_posts",
                                list: "/blog-posts",
                                create: "/blog-posts/create",
                                edit: "/blog-posts/edit/:id",
                                show: "/blog-posts/show/:id",
                                meta: {
                                    canDelete: true,
                                },
                            },
                            {
                                name: "categories",
                                list: "/categories",
                                create: "/categories/create",
                                edit: "/categories/edit/:id",
                                show: "/categories/show/:id",
                                meta: {
                                    canDelete: true,
                                },
                            },
                        ]}
                    options={{
                        syncWithLocation: true,
                        warnWhenUnsavedChanges: true,
                        useNewQueryKeys: true,
                            projectId: "2gtwJm-EuzFlw-rdfWQc",
                        
                    }}
                >
                    <Routes>
                        <Route
                            element={
                                <Authenticated
                                    key="authenticated-inner"
                                    fallback={<CatchAllNavigate to="/login" />}
                                >
                                        <ThemedLayoutV2
                                            Header={() => <Header sticky />}
                                            Sider={(props) => <ThemedSiderV2 {...props} fixed />}
                                        >
                                            <Outlet />
                                        </ThemedLayoutV2>
                                </Authenticated>
                            }
                        >
                            <Route index element={
                                    <NavigateToResource resource="blog_posts" />
                            } />
                            <Route path="/blog-posts">
                                <Route index element={<BlogPostList />} />
                                <Route path="create" element={<BlogPostCreate />} />
                                <Route path="edit/:id" element={<BlogPostEdit />} />
                                <Route path="show/:id" element={<BlogPostShow />} />
                            </Route>
                            <Route path="/categories">
                                <Route index element={<CategoryList />} />
                                <Route path="create" element={<CategoryCreate />} />
                                <Route path="edit/:id" element={<CategoryEdit />} />
                                <Route path="show/:id" element={<CategoryShow />} />
                            </Route>
                            <Route path="*" element={<ErrorComponent />} />
                        </Route>
                        <Route
                            element={
                                <Authenticated key="authenticated-outer" fallback={<Outlet />}>
                                    <NavigateToResource />
                                </Authenticated>
                            }
                        >
                                <Route path="/login" element={<Login />}  />
                                    <Route path="/register" element={<Register />} />
                                    <Route path="/forgot-password" element={<ForgotPassword />} />
                        </Route>
                    </Routes>


                    <RefineKbar />
                    <UnsavedChangesNotifier />
                    <DocumentTitleHandler />
                </Refine>
            <DevtoolsPanel />
            </DevtoolsProvider>
            </AntdApp>
</ColorModeContextProvider>
        </RefineKbarProvider>
        </BrowserRouter>
      );
};

export default App;
