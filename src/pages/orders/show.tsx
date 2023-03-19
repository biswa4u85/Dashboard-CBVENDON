import {
    useShow,
    useExport,
    IResourceComponentsProps,
} from "@pankod/refine-core";
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



export const OrderShow: React.FC<IResourceComponentsProps> = () => {
    const { queryResult } = useShow<IOrder>();
    const { data, isLoading } = queryResult;
    const order: any = data?.data ? data?.data : {};
    let orderStatusArray = order.orderStatusArray ? order.orderStatusArray.map((item: any) => { return { ...item, label: moment(item.label).format('MMMM Do YYYY, h:mm:ss a') } }) : []

    const exportData = useExport<IOrder>({
        pageSize: 50,
        maxItemCount: 50,
        mapData: (item: any) => {
            return {
                id: item.id,
                paymentConfirmation: item.paymentConfirmation,
                serviceType: item.serviceType,
                products: item.products,
                servicePrice: item.servicePrice,
                employeeID: item.employeeID,
                store: item.store,
                bags: item.bags,
                logisticCompanyProvider: item.logisticCompanyProvider,
                isPaid: item.isPaid,
                logisticConfirmationNumber: item.logisticConfirmationNumber,
                orderStatus: item.orderStatus
            };
        },
    });


    if (isLoading)
        return <Loader />

    return (
        <List
            title={"Order Details"}
            headerButtons={
                <Space>
                    <Button onClick={() => history.back()}>Back</Button>
                    {/* <ExportButton onClick={exportData.triggerExport} loading={exportData.isLoading} /> */}
                </Space>
            }
        >
            <Descriptions title="Order Info" bordered column={2}>
                <Descriptions.Item label="Order Number">{order.id}</Descriptions.Item>
                <Descriptions.Item label="Service Type">{order.serviceType}</Descriptions.Item>
                <Descriptions.Item label="Bags">{order.bags}</Descriptions.Item>
                <Descriptions.Item label="Is Paid">{order.isPaid ? 'Done' : 'Not Done'}</Descriptions.Item>
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
