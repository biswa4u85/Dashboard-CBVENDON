import {
    useShow,
    useExport,
    IResourceComponentsProps,
} from "@pankod/refine-core";
import { collection } from "firebase/firestore";
import moment from "moment";
import {
    List,
    ExportButton,
    Space,
    Timeline, Button, Descriptions
} from "@pankod/refine-antd";
import { QRCodes } from 'components'
import { OrderStatus, Loader } from "components";
import { IOrder } from "interfaces";
import { Document, Page } from 'react-pdf';


export const OrderShow: React.FC<IResourceComponentsProps> = () => {
    const { queryResult } = useShow<IOrder>();
    const { data, isLoading } = queryResult;
    const order: any = data?.data ? data?.data : {};
    let orderStatusArray = order.orderStatusArray ? order.orderStatusArray.map((item: any) => { return { ...item, label: moment(item.label).format('MMMM Do YYYY, h:mm:ss a') } }) : []

    const exportData = () => {
        collection('mail').add({
            to: 'someone@example.com',
            message: {
                subject: 'Hello from Firebase!',
                html: 'This is an <code>HTML</code> email body.',
            },
        })
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
