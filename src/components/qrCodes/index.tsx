import React, { Fragment, useState, useEffect } from "react";
import QRCode from "react-qr-code";
type QRCodeTimesProps = {
    text: any
    size?: any
};
export const QRCodes: React.FC<QRCodeTimesProps> = ({ text, size = 200 }) => {
    return (
        <QRCode size={size} value={`https://dashboard-cbvendon-git-main-biswa4u85.vercel.app/orders/show/${text}`} />
    );
};