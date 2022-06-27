import { ImgHTMLAttributes } from "react";


export default function convertBinaryProfilePicture(bytes?: number[] | null, imgProps?: Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'>): JSX.Element {
    if (bytes === null || bytes === undefined) {
        return <img src="user/user.png" {...imgProps} />;
    }
    return <img src={`data:image/png;base64, ${Buffer.from(bytes).toString('base64')}`} {...imgProps} />;
}
