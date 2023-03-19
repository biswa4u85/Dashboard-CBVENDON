import {
    useShow,
    IResourceComponentsProps,
} from "@pankod/refine-core";
import {
    List,
    Avatar, Button, Descriptions
} from "@pankod/refine-antd";
import { IUser } from "interfaces";

export const UserShow: React.FC<IResourceComponentsProps> = () => {
    const { queryResult } = useShow<IUser>();
    const { data } = queryResult;
    const user: any = data?.data ? data?.data : {};

    console.log(user)

    return (
        <List
            title={"User Details"}
            headerButtons={
                <Button onClick={() => history.back()}>Back</Button>
            }
        >
            <Descriptions title="User Info">
                <Descriptions.Item label="User ID">{user.id}</Descriptions.Item>
                <Descriptions.Item label="Full Name">{user.title}</Descriptions.Item>
                <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
                <Descriptions.Item label="Phone">{user.phone}</Descriptions.Item>
                <Descriptions.Item label="Gender">{user.gender}</Descriptions.Item>
                <Descriptions.Item label="Status">{user.isActive ? 'Active' : 'Inactive'}</Descriptions.Item>
                <Descriptions.Item><Avatar
                    size={120}
                    src={user?.avatar?.[0].url}
                ></Avatar></Descriptions.Item>
            </Descriptions>
        </List>
    );
};
