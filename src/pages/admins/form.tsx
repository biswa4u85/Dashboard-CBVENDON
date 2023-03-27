import { useTranslate } from "@pankod/refine-core";
import {
    Form,
    Select,
    Input,
    getValueFromEvent,
    Row,
    Col,
    Radio,
} from "@pankod/refine-antd";
import { Files, Address } from 'components'

export const FormList = ({ formProps }: any) => {
    const t = useTranslate();
    return <>
        <Row gutter={20}>
            <Col xs={24} lg={8}>
                <Form.Item>
                    <Form.Item
                        name="avatar"
                        valuePropName="fileList"
                        getValueFromEvent={getValueFromEvent}
                        rules={[
                            {
                                required: true,
                                message: 'Profile Image required'
                            },
                        ]}
                    >
                        <Files folder={'users'} name="avatar" lable={'User Profile'} formProps={formProps} />
                    </Form.Item>
                </Form.Item>
            </Col>
            <Col xs={24} lg={16}>
                <Row gutter={10}>
                    <Col xs={24} lg={12}>
                        <Form.Item
                            label={'Full Name'}
                            name="title"
                            rules={[
                                {
                                    required: true,
                                    message: 'Last Name is required'
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label={"Gender"}
                            name="gender"
                            rules={[
                                {
                                    required: true,
                                    message: 'Gender is required'
                                },
                            ]}
                        >
                            <Select
                                options={[
                                    {
                                        label: "Male",
                                        value: "Male",
                                    },
                                    {
                                        label: "Female",
                                        value: "Female",
                                    },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item
                            label={"Status"}
                            name="isActive"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Radio.Group>
                                <Radio value={true}>{t("status.enable")}</Radio>
                                <Radio value={false}>
                                    {t("status.disable")}
                                </Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                    <Col xs={24} lg={12}>
                        <Form.Item
                            label={"Email"}
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    type: "email",
                                    message: 'Email is required'
                                },
                            ]}
                        >
                            <Input readOnly />
                        </Form.Item>
                        <Form.Item
                            label={"Phone"}
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    pattern: new RegExp(/^[0-9]+$/),
                                    message: 'Phone is required'
                                },
                            ]}
                        >
                            <Input type="number" />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item
                    label={"Address"}
                    name={["address"]}
                    rules={[
                        {
                            required: true,
                            message: 'Address is required'
                        },
                    ]}
                >
                    <Address name="address" formProps={formProps} />
                </Form.Item>
            </Col>
        </Row>
    </>
}