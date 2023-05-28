import { Card } from 'antd';

function StoryCard({ storyData }) {
    return (
        <div className="flex justify-center items-center">
            <Card
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
                <p className='p-10'> {storyData} </p>
            </Card>
        </div>
    )
}

export default StoryCard