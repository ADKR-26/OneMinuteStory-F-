import { Button, Card } from 'antd';
import { NavLink } from 'react-router-dom';
import { actionSetTitleId } from '../../store/action';
import { useDispatch } from 'react-redux';

function TitleCard({ titleData, id }) {

    const dispatch = useDispatch();

    const setTitleId = () => {
        dispatch(actionSetTitleId(id));
    }

    return (
        <div className="flex justify-center">
            {/* Current Stories */}
            <Card
                key={id}
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
                <p className='p-10'> {titleData} </p>
                <Button
                    onClick={setTitleId}
                >
                    <NavLink to={{
                        pathname: "/story_details",
                        // state: { key: demo }
                    }}>View</NavLink>
                </Button>
            </Card>
        </div>
    )
}

export default TitleCard