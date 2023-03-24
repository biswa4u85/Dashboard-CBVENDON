import {
    useShow,
    useOne,
    useExport,
    IResourceComponentsProps,
} from "@pankod/refine-core";
import moment from "moment";
import {
    List,
    ExportButton,
    Space,
    notification,
    Timeline, Button, Descriptions
} from "@pankod/refine-antd";
import { QRCodes } from 'components'
import { OrderStatus, Loader } from "components";
import { IOrder } from "interfaces";


export const OrderShow: React.FC<IResourceComponentsProps> = () => {
    const { queryResult } = useShow<IOrder>();
    const { data, isLoading } = queryResult;
    const order: any = data?.data ? data?.data : {};
    let orderStatusArray = order.orderStatusArray ? order.orderStatusArray.map((item: any) => { return { ...item, label: moment(item.label).format('MMMM Do YYYY, h:mm:ss a') } }) : []

    const userDetails = useOne<any>({
        resource: "users",
        id: order?.user,
    });
    const users = userDetails?.data?.data;

    const exportData = () => {
        fetch('https://us-central1-cbuserapp.cloudfunctions.net/emailSend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                "to": users?.email,
                "subject": "Order Details",
                "text": `Order link`,
                "html": `<p>Click the link to show order details. <br /><a href="https://dashboard-cbvendon-git-main-biswa4u85.vercel.app/orders/show/${order?.id}">Order</a></p>`
            })
        })
            .then(response => response.text())
            .then(data => notification.success({
                message: "Success",
                description: data,
            }))
            .catch(error => notification.error({
                message: "Error",
                description: "Email Error",
            }));
    }

    if (isLoading)
        return <Loader />

    return (
        <List
            title={"Order Details"}
            headerButtons={
                <Space>
                    <Button onClick={() => history.back()}>Back</Button>
                    <ExportButton onClick={() => exportData()} />
                </Space>
            }
        >
            <Descriptions title="Order Info" bordered column={2}>
                <Descriptions.Item label="Order Number">{order.id}</Descriptions.Item>
                <Descriptions.Item label="Service Type">{order.serviceType}</Descriptions.Item>
                <Descriptions.Item label="Bags">{order.bags}</Descriptions.Item>
                <Descriptions.Item label="Paid">{order.isPaid ? 'Done' : 'Not Done'}</Descriptions.Item>
                <Descriptions.Item label="Logistic Company Provider">{order.logisticCompanyProvider}</Descriptions.Item>
                <Descriptions.Item label="Logistic Confirmation Number">{order.logisticConfirmationNumber}</Descriptions.Item>
                <Descriptions.Item label="Payment Confirmation">{order.paymentConfirmation}</Descriptions.Item>
                <Descriptions.Item label="Service Price">₹{order.servicePrice}</Descriptions.Item>
                <Descriptions.Item label="Status">{order.status ? 'Active' : 'Inactive'}</Descriptions.Item>
                <Descriptions.Item label="QR Code">
                    <QRCodes text={order.id} size={150} />
                </Descriptions.Item>
                <Descriptions.Item label="Order Status"><OrderStatus status={order.orderStatus} /></Descriptions.Item>
            </Descriptions>
            <Descriptions title="Order Status Info" bordered>
                <Descriptions.Item>
                    <Timeline
                        mode={'left'}
                        items={orderStatusArray}
                    />
                </Descriptions.Item>
            </Descriptions>
        </List>
    );
};
