import $ from 'jquery';
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as yup from "yup";
import { BsReverseLayoutTextSidebarReverse as TextIcon } from "react-icons/bs";
import { BsImageFill as ImageIcon } from "react-icons/bs";
import { BiMoviePlay as VideoIcon } from "react-icons/bi";
import Popup from "../../popup/Popup";
import styles from "./CreatePostPanel.module.scss";
import { Post, PostType, User } from '../../../graphql/types';
import { gql, useMutation } from '@apollo/client';
import LoadingScreen from '../../loadingScreen/LoadingScreen';
import ImageChooser from '../../imageChooser/ImageChooser';
import base64ToBlob from '../../../utils/base64ToBlob';


type CreateTextPostInput = {
    title?: string;
    text?: string;
    userId: string;
}

const CREATE_TEXT_POST_GQL = gql`
    mutation CreateTextPost($title: String, $text: String, $userId: String!) {
        createPost(request: {
            title: $title,
            text: $text,
            ownerId: $userId,
            type: TEXT
        }) {
            postId
        }
    }
`;

type CreatePicturePostInput = {
    title?: string;
    text?: string;
    media?: number[];
    userId: string;
}

const CREATE_PICTURE_POST_GQL = gql`
    mutation CreatePicturePost($title: String, $text: String, $media: Upload, $userId: String!) {
        createPost(request: {
            title: $title,
            text: $text,
            media: $media,
            ownerId: $userId,
            type: TEXT
        }) {
            postId
        }
    }
`;

////////////////////////////////////////////////////////////////////////////////////////

interface PostTypeSelectionProps {
    icon: JSX.Element;
    title: string;
    type: PostType;
    onClick?: (type: PostType) => void;
}

const PostTypeSelection: React.FC<PostTypeSelectionProps> = ({ title, icon, type, onClick }) => {
    function handleClick() {
        if (onClick !== undefined) onClick(type);
    }

    return (
        <div className={styles.postTypeSelection}>
            <span className={styles.postTypeSelectionIcon} onClick={handleClick}>
                { icon }
            </span>
            <span className={styles.postTypeSelectionTitle}>
                { title }
            </span>
        </div>
    );
}


interface PostProps {
    user?: User;
    onLoading?: (loading: boolean) => void;
    onClose?: () => void;
}

const TextPost: React.FC<PostProps> = ({ user, onLoading, onClose }) => {
    const [createTextPost, { loading }] = useMutation<{ createPost: Post }, CreateTextPostInput>(CREATE_TEXT_POST_GQL);

    useEffect(() => {
        if (onLoading) onLoading(loading);
    });

    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            title: '',
            text: ''
        },
        validationSchema: yup.object({
            title: yup.string().required('Title is required'),
            text: yup.string().optional()
        }),
        onSubmit: (data) => {
            createTextPost({
               variables: {
                   title: data.title,
                   text: data.text,
                   userId: user?.userId ?? ''
                } 
            })
            .then(() => {
                router.reload();
            });
        }
    });

    function handleClose() {
        if (onClose) {
            onClose();
        }
    }

    return (
        <form className={styles.textPost} onSubmit={formik.handleSubmit}>
            <div className={styles.postHeader}>
                <button type="button" onClick={handleClose} className={styles.closePostButton}>
                    Close
                </button>
                Make Textual Post
                <button type="submit" className={styles.submitPostButton}>
                    Post
                </button>
            </div>
            <div className={styles.postForm}>
                <input
                    placeholder="Title"
                    spellCheck="false"
                    className={styles.textPostTitleInput}
                    required
                    id="title"
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                />
                <textarea
                    placeholder="Content"
                    spellCheck="false"
                    className={styles.textPostContentInput}
                    id="text"
                    name="text"
                    value={formik.values.text}
                    onChange={formik.handleChange}
                />
            </div>
        </form>
    );
}

const PicturePost: React.FC<PostProps> = ({ user, onLoading, onClose }) => {
    const [base64Image, setBase64Image] = useState<string | null>(null);

    const [createPicturePost, { loading }] = useMutation<{ createPost: Post }, CreatePicturePostInput>(CREATE_PICTURE_POST_GQL);

    useEffect(() => {
        if (onLoading) onLoading(loading);
    });

    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            title: '',
            text: ''
        },
        validationSchema: yup.object({
            title: yup.string().required('Title is required'),
            text: yup.string().optional()
        }),
        onSubmit: (data) => {
            console.log('hello')
            console.log(base64ToBlob(base64Image))
            createPicturePost({
               variables: {
                   title: data.title,
                   text: data.text,
                   // @ts-ignore
                   media: base64ToBlob(base64Image) ?? undefined,
                   userId: user?.userId ?? ''
                } 
            })
            .then(() => {
                router.reload();
            });
        }
    });

    function handleClose() {
        if (onClose) {
            onClose();
        }
    }

    return (
        <form className={styles.picturePost} onSubmit={formik.handleSubmit}>
            <div className={styles.postHeader}>
                <button type="button" onClick={handleClose} className={styles.closePostButton}>
                    Close
                </button>
                Make Picture Post
                <button type="submit" className={styles.submitPostButton}>
                    Post
                </button>
            </div>
            <div className={styles.postForm}>
                <div className={styles.picturePostImageChooser}>
                    <ImageChooser onUpload={base64 => setBase64Image(base64)} />
                </div>
                <input
                    placeholder="Title"
                    spellCheck="false"
                    className={styles.picturePostTitleInput}
                    required
                    id="title"
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                />
                <textarea
                    placeholder="Content"
                    spellCheck="false"
                    className={styles.picturePostContentInput}
                    id="text"
                    name="text"
                    value={formik.values.text}
                    onChange={formik.handleChange}
                />
            </div>
        </form>
    );
}


interface CreatePostPanelProps {
    user?: User
}

const CreatePostPanel: React.FC<CreatePostPanelProps> = ({ user }) => {
    const [loading, setLoading] = useState<boolean>(false);

    const [selectionOpen, setSelectionOpen] = useState<boolean>(false);

    const [typeSelected, setTypeSelected] = useState<PostType | undefined>(undefined);

    function handleSelection(type: PostType) {
        $('.' + styles.postTypePopup).addClass(styles.postTypeSelectionTransitions);
        if (!typeSelected) {
            $('.' + styles.postTypePopup).addClass(styles.postTypeSelectionFlipped);
        } else {
            $('.' + styles.postTypePopup).removeClass(styles.postTypeSelectionFlipped);
        }
        switch (type) {
            case "TEXT":
                $('.' + styles.textPost).addClass(styles.postFlipped);
                break;
            case "PICTURE":
                $('.' + styles.picturePost).addClass(styles.postFlipped);
                break;
        }
        setTypeSelected(type);
    }

    function handleClose() {
        $('.' + styles.postTypePopup).removeClass(styles.postTypeSelectionFlipped);
        switch (typeSelected) {
            case "TEXT":
                $('.' + styles.textPost).removeClass(styles.postFlipped);
                break;
            case "PICTURE":
                $('.' + styles.picturePost).removeClass(styles.postFlipped);
                break;
        }
        setTypeSelected(undefined);
    }

    function handlePopupOutsideClick() {
        if (typeSelected) {
            handleClose();
            $('.' + styles.postTypePopup).removeClass(styles.postTypeSelectionFlipped);
        }
        $('.' + styles.postTypePopup).removeClass(styles.postTypeSelectionTransitions);
        setSelectionOpen(false);
    }

    function handlePopupOpenBecauseOfButton() {
        setSelectionOpen(true);
    }

    function handleLoading(loading: boolean) {
        if (loading) {
            setLoading(true);
            handlePopupOutsideClick();
        } else {
            setLoading(false);
        }
    }

    // render nothing if not logged in
    if (!user) {
        return <></>;
    }

    const postPanelProps: PostProps = {
        user: user,
        onLoading: handleLoading,
        onClose: handleClose
    }

    return (
        <div>
            {/* Loading screen when making API calls */}
            <LoadingScreen open={loading} />

            {/* Popup to make selection */}
            <Popup open={selectionOpen} onOutsideClick={handlePopupOutsideClick}>
                <TextPost {...postPanelProps} />
                <PicturePost {...postPanelProps} />
                <div className={styles.postTypePopup}>
                    <div className={styles.postTypeHeader}>
                        Make A Post
                    </div>
                    <div className={styles.postTypeSelectionWrapper}>
                        <PostTypeSelection
                            icon={<TextIcon size="100%" />}
                            title="Text"
                            type="TEXT"
                            onClick={handleSelection}
                        />
                        <PostTypeSelection
                            icon={<ImageIcon size="100%" />}
                            title="Picture"
                            type="PICTURE"
                            onClick={handleSelection}
                        />
                        <PostTypeSelection
                            icon={<VideoIcon size="100%" />}
                            title="Video"
                            type="VIDEO"
                            onClick={handleSelection}
                        />
                    </div>
                </div>
            </Popup>

            {/* Post button */}
            <button onClick={handlePopupOpenBecauseOfButton} className={styles.makePostButton}>
                Make A Post
            </button>

        </div>
    );
}

export default CreatePostPanel;
