import { Button } from 'antd'
import TextArea from 'antd/es/input/TextArea'

function AddStory() {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Add New Story</h2>
            <TextArea
                className="w-96 h-48"
                placeholder="Write Story Title"
                autoSize={{
                    minRows: 2,
                    maxRows: 10,
                }}
            />
            <div className="flex justify-center items-center mt-8">
                <Button
                    type="primary"
                    size="large"
                    className="bg-blue-600 hover:bg-blue-500 transition duration-300"
                >
                    Add Story
                </Button>
            </div>
        </div>
    )
}

export default AddStory

