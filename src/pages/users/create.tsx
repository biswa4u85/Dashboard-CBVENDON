import { IResourceComponentsProps } from "@pankod/refine-core";
import {
    Form,
    Create,
    Button,
    useStepsForm,
} from "@pankod/refine-antd";
import { IUser } from "../../interfaces";
import { FormList } from "./form";

export const UserCreate: React.FC<IResourceComponentsProps> = () => {
    const {
        current,
        formProps,
        saveButtonProps,
        queryResult,
    } = useStepsForm<IUser>();
    return (
        <>
            <Create
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
                        // isActive: true,
                    }}
                >
                    <FormList formProps={formProps} />
                </Form>
            </Create>
        </>
    );
};