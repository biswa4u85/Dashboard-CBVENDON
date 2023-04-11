import React from "react";
import { Refine } from "@pankod/refine-core";
import { RefineKbarProvider } from "@pankod/refine-kbar";
import routerProvider from "@pankod/refine-react-router-v6";
import {
    Icons,
    notificationProvider,
    Layout,
    ErrorComponent,
} from "@pankod/refine-antd";
import { authProvider } from "authProvider";
import { dataProvider } from "dataProvider";

import "dayjs/locale/de";

import { OrderList, OrderCreate, OrderEdit, OrderShow } from "./pages/orders";
import { AuthPage } from "./pages/auth";
import { AdminEdit } from "./pages/admins";
import { UserList, UserCreate, UserEdit, UserShow } from "./pages/users";
import { ProductList } from "./pages/products";
import { StoreCreate, StoreEdit, StoreList } from "./pages/stores";
import { CategoryList, CategoryCreate } from "./pages/categories";
import { useTranslation } from "react-i18next";
import { Header, Title } from "components";
import { PizzaIcon } from "components/icons";

import "@pankod/refine-antd/dist/reset.css";

const App: React.FC = () => {
    const { t, i18n } = useTranslation();
    const i18nProvider = {
        translate: (key: string, params: object) => t(key, params),
        changeLocale: (lang: string) => i18n.changeLanguage(lang),
        getLocale: () => i18n.language,
    };

    return (
        <RefineKbarProvider>
            <Refine
                routerProvider={{
                    ...routerProvider,
                    routes: [
                        {
                            path: "/register",
                            element: (
                                <AuthPage
                                    type="register"
                                    formProps={{
                                        initialValues: {

                                        },
                                    }}
                                />
                            ),
                        },
                        {
                            path: "/forgot-password",
                            element: <AuthPage type="forgotPassword" />,
                        },
                        {
                            path: "/update-password",
                            element: <AuthPage type="updatePassword" />,
                        },
                    ],
                }}
                dataProvider={dataProvider}
                authProvider={authProvider}
                i18nProvider={i18nProvider}
                LoginPage={() => (
                    <AuthPage
                        type="login"
                        rememberMe={false}
                        registerLink={false}
                        formProps={{
                            initialValues: {

                            },
                        }}
                    />
                )}
                Title={Title}
                Header={Header}
                Layout={Layout}
                options={{
                    syncWithLocation: true,
                    warnWhenUnsavedChanges: true,
                }}
                resources={[
                    {
                        name: "orders",
                        list: OrderList,
                        show: OrderShow,
                        create: OrderCreate,
                        edit: OrderEdit,
                        canDelete: true,
                        icon: <Icons.ShoppingOutlined />,
                    },
                    {
                        name: "stores",
                        list: StoreList,
                        edit: StoreEdit,
                        create: StoreCreate,
                        icon: <Icons.ShopOutlined />,
                    },
                    // {
                    //     name: "admins",
                    //     edit: AdminEdit,
                    //     icon: <Icons.UsergroupAddOutlined />,
                    // },
                    // {
                    //     name: "users",
                    //     list: UserList,
                    //     create: UserCreate,
                    //     edit: UserEdit,
                    //     show: UserShow,
                    //     icon: <Icons.UsergroupAddOutlined />,
                    // },
                    // {
                    //     name: "products",
                    //     list: ProductList,
                    //     icon: <PizzaIcon />,
                    // },
                    // {
                    //     name: "categories",
                    //     list: CategoryList,
                    //     create: CategoryCreate,
                    // },
                ]}
                notificationProvider={notificationProvider}
                catchAll={<ErrorComponent />}
            />
        </RefineKbarProvider>
    );
};

export default App;
