import React, { useEffect, useMemo } from "react";
import { useFilePicker } from 'use-file-picker';
import styles from './ImageChooser.module.scss';


interface ImageChooserProps {
    defaultValue?: string;
    onUpload?: (base64String: string) => void;
    onError?: () => void;
}

const ImageChooser: React.FC<ImageChooserProps> = ({
        defaultValue,
        onUpload = () => {},
        onError = () => {}
    }) => {

    const [openFileSelector, { filesContent, loading, errors }] = useFilePicker({
        accept: ['.png', '.jpg', '.jpeg', '.gif'],
        limitFilesConfig: { max: 1, min: 1 },
        readAs: 'ArrayBuffer'
    });

    const data = useMemo(() => {
        if (filesContent.length > 0) {
            const buffer = Buffer.from(filesContent[0].content);
            const base64 = buffer.toString('base64');
            return 'data:image/png;base64,' + base64;
        }
        return undefined;
    }, [filesContent, onUpload]);

    useEffect(() => {
        if (data !== undefined) onUpload(data);
    });

    if (loading)
        return (
            <div className={styles.main}>
                <div className={styles.skeleton} />
            </div>
        );

    if (errors.length > 0) {
        onError();
        return (
            <div className={styles.main}>
                <div className={styles.errorMessage}>
                    An error occured
                </div>
            </div>
        );
    }

    return (
        <div className={styles.main}>
            <img src={ (filesContent.length > 0)? data : defaultValue } alt="" />
            <div className={styles.mask}>
                <div role="button" className={styles.maskBlank} onClick={openFileSelector} />
                <button className={styles.button} onClick={openFileSelector}>
                    Select Image
                </button>
            </div>
            
        </div>
    );
}

export default ImageChooser;
