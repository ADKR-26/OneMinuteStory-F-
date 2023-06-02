import { Card } from 'antd';
import { DeleteOutlined, LikeOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { deleteStoryData } from '../../store/action';

function StoryCard({ storyData, id }) {

    const dispatch = useDispatch();

    const deleteStory = (id) => {
        dispatch(deleteStoryData(id));
        console.log("IDDDD", id);
    }

    return (
        <div className="flex justify-center items-center">
            <Card
                key = {id}
                // className="border border-black-1100 rounded-lg"
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 900,
                    marginBottom: 10,
                    border: '2px solid rgba(150, 150, 150, 1)'
                }}
            >
                <DeleteOutlined className="absolute top-0 right-1 cursor-pointer" onClick={() => deleteStory(id)} />
                <LikeOutlined className="absolute bottom-1 left-1 cursor-pointer"/>
                <p className='p-10'> {storyData} </p>
            </Card>
        </div>
    )
}

export default StoryCard