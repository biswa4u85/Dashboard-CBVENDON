import { useTranslate } from "@pankod/refine-core";
import {
    Form,
    Select,
    Input,
    getValueFromEvent,
    Row,
    InputNumber,
    Col,
    Radio,
} from "@pankod/refine-antd";
import { Files, Address } from 'components'
const handleGetValueFromEventNumber = (e: any) => Math.round(e)
const { Option } = Select;

export const FormList = ({ formProps }: any) => {
    const t = useTranslate();

    const prefixSelector = (
        <Form.Item name="phoneCode" noStyle>
            <Select style={{ width: 80 }}>
                <Option value="+91">+91</Option>
                <Option value="+01">+01</Option>
            </Select>
        </Form.Item>
    );

    return <>
        <Row gutter={20}>
            <Col xs={24} lg={8}>
                <Form.Item>
                    <Form.Item
                        name="avatar"
                        valuePropName="fileList"
                        getValueFromEvent={getValueFromEvent}
                    >
                        <Files folder={'users'} name="avatar" lable={'User Profile'} formProps={formProps} />
                    </Form.Item>
                </Form.Item>
            </Col>
            <Col xs={24} lg={16}>
                <Row gutter={10}>
                    <Col xs={24} lg={12}>
                        <Form.Item name="type" initialValue={'user'} style={{ display: 'none' }}>
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label={'Full Name'}
                            name="title"
                            rules={[
                                {
                                    required: true,
                                    message: 'Full Name is required'
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
                                    message: 'Status is required'
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
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label={"Phone"}
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    message: 'Phone is required!'
                                },
                            ]}
                            getValueFromEvent={handleGetValueFromEventNumber}
                        >
                            <InputNumber style={{ width: 370 }} addonBefore={prefixSelector} type="number" />
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