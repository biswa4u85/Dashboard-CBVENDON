import { IResourceComponentsProps, useUpdate } from "@pankod/refine-core";
import {
    Form,
    Edit,
    Button,
    useStepsForm,
} from "@pankod/refine-antd";
import { IUser } from "../../interfaces";
import { FormList } from "./form";

export const AdminEdit: React.FC<IResourceComponentsProps> = () => {
    const {
        formProps,
        queryResult,
    } = useStepsForm<IUser>();
    const { mutate } = useUpdate();

    const updateData = (values: any) => {
        mutate(
            {
                resource: "admins",
                values: values.form.getFieldsValue(),
                id: values?.initialValues.id,
            },
            {
                onError: (error, variables, context) => {
                    console.log(error, variables, context)
                },
                onSuccess: (data, variables, context) => {
                    setTimeout(() => history.back(), 100)
                },
            },
        );
    };

    return (
        <>
            <Edit
                isLoading={queryResult?.isFetching}
                headerButtons={
                    <Button onClick={() => history.back()}>Back</Button>
                }
                footerButtons={() => (
                    <>
                        <Button onClick={() => updateData(formProps)} type="primary">Save</Button>
                    </>
                )}
            >
                <Form
                    {...formProps}
                    style={{ marginTop: 30 }}
                    layout="vertical"
                    initialValues={{
                        ...formProps.initialValues,
                    }}
                    onFinish={(values) => {
                        updateData(values);
                    }}
                >
                    <FormList formProps={formProps} />
                </Form>
            </Edit>
        </>
    );
};