import { useTranslate, useUpdate, useNavigation } from "@pankod/refine-core";
import { Dropdown, Icons, Menu } from "@pankod/refine-antd";
import { IOrder } from "interfaces";

const { FormOutlined, FolderViewOutlined } = Icons;

type OrderActionProps = {
    record: IOrder;
};

export const OrderActions: React.FC<OrderActionProps> = ({ record }) => {
    const t = useTranslate();
    const { mutate } = useUpdate();
    const { edit, show } = useNavigation();
    const moreMenu = (record: IOrder) => (
        <Menu
            mode="vertical"
            onClick={({ domEvent }) => domEvent.stopPropagation()}
        >
            <Menu.Item
                key="2"
                style={{
                    fontWeight: 500,
                }}
                icon={
                    <FolderViewOutlined
                        style={{
                            color: "green",
                        }}
                    />
                }
                onClick={() => show("orders", record.id)}
            >
                View Order
            </Menu.Item>
            <Menu.Item
                key="2"
                style={{
                    fontWeight: 500,
                }}
                icon={
                    <FormOutlined
                        style={{
                            color: "green",
                        }}
                    />
                }
                onClick={() => edit("orders", record.id)}
            >
                Edit Order
            </Menu.Item>
        </Menu>
    );
    return (
        <Dropdown overlay={moreMenu(record)} trigger={["click"]}>
            <Icons.MoreOutlined
                onClick={(e) => e.stopPropagation()}
                style={{
                    fontSize: 24,
                }}
            />
        </Dropdown>
    );
};
