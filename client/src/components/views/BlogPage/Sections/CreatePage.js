import React,{ useState, useEffect } from 'react'
import { Typography, Button, Form, message } from 'antd';
import axios from 'axios';
import { useSelector } from "react-redux";
import QuillEditor from '../../../editor/QuillEditor';

const { Title } = Typography;

function CreatePage(props) {

    const user = useSelector(state => state.user);

    const [content, setContent] = useState("");
    const [files, setFiles] = useState([]);

    const onEditorChange = (value) => {
        setContent(value)
        
    }

    const onFilesChange = (files) => {
        setFiles(files)
    }

    const onSubmit = (event) => {
        event.preventDefault();

        setContent("");

        if( user.userData && !user.userData.isAuth) {
            return alert('Please log in!')
        }

        const variables = {
            content: content,
            writer: user.userData._id
        }

        

        axios.post('/api/blog/createPost', variables )
        .then(response => {
            if(response.data.success) {
                message.success('Post created!');

                setTimeout(() => {
                    props.history.push('/blog')
                }, 2000);
            }
            
        })
    }

    return (
        <div>
            <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
                <div style={{ textAlign: 'center' }}>
                    <Title level={2} > Editor</Title>
                </div>
                <QuillEditor
                    placeholder={"Start Posting Something"}
                    onEditorChange={onEditorChange}
                    onFilesChange={onFilesChange}
                />

                <Form onSubmit={onSubmit}>
                    <div style={{ textAlign: 'center', margin: '2rem', }}>
                        <Button
                            size="large"
                            htmlType="submit"
                            className=""
                            onSubmit={onSubmit}
                        >
                            Submit
                    </Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default CreatePage
