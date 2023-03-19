import {
    useTranslate,
    IResourceComponentsProps,
    CrudFilters,
    HttpError,
} from "@pankod/refine-core";

import {
    List,
    Table,
    Avatar,
    useTable,
    DateField,
    BooleanField,
    Card,
    Input,
    Space,
    Icons,
    Form,
    DatePicker,
    Button,
    Select,
    FormProps,
    Row,
    Col,
    ShowButton,
    EditButton,
} from "@pankod/refine-antd";

import { IUser, IUserFilterVariables } from "interfaces";

export const UserList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps, searchFormProps } = useTable<
        IUser,
        HttpError,
        IUserFilterVariables
    >({
        onSearch: (params) => {
            const filters: CrudFilters = [];
            const { q, status, createdAt, gender, isActive } = params;

            filters.push({
                field: "q",
                operator: "eq",
                value: q,
            });

            filters.push(
                {
                    field: "createdAt",
                    operator: "gte",
                    value: createdAt
                        ? createdAt[0].startOf("day").toISOString()
                        : undefined,
                },
                {
                    field: "createdAt",
                    operator: "lte",
                    value: createdAt
                        ? createdAt[1].endOf("day").toISOString()
                        : undefined,
                },
            );

            filters.push({
                field: "gender",
                operator: "eq",
                value: gender,
            });

            filters.push({
                field: "isActive",
                operator: "eq",
                value: isActive,
            });

            filters.push({
                field: "status.text",
                operator: "eq",
                value: status,
            });

            return filters;
        },
        syncWithLocation: false,
    });

    const t = useTranslate();

    return (
        <Row gutter={[16, 16]}>
            <Col
                xl={6}
                lg={24}
                xs={24}
                style={{
                    marginTop: "48px",
                }}
            >
                <Card title={t("users.filter.title")}>
                    <Filter formProps={searchFormProps} />
                </Card>
            </Col>

            <Col xl={18} xs={24}>
                <List>
                    <Table {...tableProps} rowKey="id">
                        <Table.Column
                            align="center"
                            key="avatar"
                            dataIndex={["avatar"]}
                            title={t("users.fields.avatar.label")}
                            render={(value) => <Avatar src={value ? value[0].url : ''} />}
                        />
                        <Table.Column
                            key="title"
                            dataIndex="title"
                            title={t("users.fields.firstName")}
                        />
                        <Table.Column
                            key="fullName"
                            dataIndex="fullName"
                            title={t("users.fields.fullName")}
                        />
                        <Table.Column
                            key="gender"
                            dataIndex="gender"
                            title={t("users.fields.gender.label")}
                            render={(value) =>
                                t(`users.fields.gender.${value}`)
                            }
                        />
                        <Table.Column
                            key="isActive"
                            dataIndex="isActive"
                            title={t("users.fields.isActive.label")}
                            render={(value) => <BooleanField value={value}
                            valueLabelTrue="Active"
                            valueLabelFalse="Inactive"
                             />}
                        />
                        <Table.Column
                            key="createdAt"
                            dataIndex="createdAt"
                            title={t("users.fields.createdAt")}
                            render={(value) => (
                                <DateField value={value} format="LLL" />
                            )}
                            sorter
                        />
                        <Table.Column<IUser>
                            fixed="right"
                            title={t("table.actions")}
                            render={(_, record) => (
                                <Space>
                                    <ShowButton hideText recordItemId={record.id} />
                                    <EditButton hideText recordItemId={record.id} />
                                </Space>
                            )}
                        />
                    </Table>
                </List>
            </Col>
        </Row>
    );
};

const Filter: React.FC<{ formProps: FormProps }> = (props) => {
    const t = useTranslate();
    return (
        <Form layout="vertical" {...props.formProps}>
            <Row gutter={[10, 0]} align="bottom">
                <Col xs={24} xl={24} md={12}>
                    <Form.Item label={t("users.filter.search.label")} name="q">
                        <Input
                            placeholder={"Name"}
                            prefix={<Icons.SearchOutlined />}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} xl={24} md={8}>
                    <Form.Item
                        label={t("users.filter.isActive.label")}
                        name="isActive"
                    >
                        <Select
                            allowClear
                            placeholder={t("users.filter.isActive.placeholder")}
                            options={[
                                {
                                    label: t("users.filter.isActive.true"),
                                    value: "true",
                                },
                                {
                                    label: t("users.filter.isActive.false"),
                                    value: "false",
                                },
                            ]}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} xl={24} md={8}>
                    <Form.Item>
                        <Button
                            style={{ width: "100%" }}
                            htmlType="submit"
                            type="primary"
                        >
                            {t("users.filter.submit")}
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};
