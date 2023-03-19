import { IResourceComponentsProps } from "@pankod/refine-core";
import {
    Form,
    Edit,
    Button,
    useStepsForm,
} from "@pankod/refine-antd";
import { IUser } from "../../interfaces";
import { FormList } from "./form";

export const UserEdit: React.FC<IResourceComponentsProps> = () => {
    const {
        formProps,
        saveButtonProps,
        queryResult,
    } = useStepsForm<IUser>();
    return (
        <>
            <Edit
                isLoading={queryResult?.isFetching}
                saveButtonProps={saveButtonProps}
                headerButtons={
                    <Button onClick={() => history.back()}>Back</Button>
                }
            >
                <Form
                    {...formProps}
                    style={{ marginTop: 30 }}
                    layout="vertical"
                    initialValues={{
                        ...formProps.initialValues,
                    }}
                >
                    <FormList formProps={formProps} />
                </Form>
            </Edit>
        </>
    );
};