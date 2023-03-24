import { IResourceComponentsProps, useTranslate } from "@pankod/refine-core";

import {
    Create,
    Form,
    Input,
    useForm,
    Row,
    Col,
    Typography,
    Radio,
} from "@pankod/refine-antd";

const { Text } = Typography;

import { ICategory } from "interfaces";

export const CategoryCreate: React.FC<IResourceComponentsProps> = () => {
    const t = useTranslate();
    const { formProps, saveButtonProps, queryResult } = useForm<ICategory>();

    return (
        <Create
            isLoading={queryResult?.isFetching}
            saveButtonProps={saveButtonProps}
        >
            <Form
                {...formProps}
                layout="vertical"
                initialValues={{
                    isActive: true,
                }}
            >
                <Row gutter={[64, 0]} wrap>
                    <Col xs={24} lg={8}>
                        <Form.Item
                            label={'Category Name'}
                            name="title"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label={t("stores.fields.isActive")}
                            name="isActive"
                        >
                            <Radio.Group>
                                <Radio value={true}>{t("status.enable")}</Radio>
                                <Radio value={false}>
                                    {t("status.disable")}
                                </Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Create>
    );
};
