import React from 'react';
import { useNavigate } from 'react-router-dom';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import "./meeting-item.css"
const MeetingItem = (props) => {
    const navigate = useNavigate()
    let startTime = new Date(props.startTime)
    let endTime = new Date(props.endTime)

    const formatTime = (date) => {
        let str = `${date.toDateString()},${date.getHours()}:${date.getMinutes()}`
        return str
    }

    const editMeeting = () => {
        navigate(
            "/create",
            {
                state: {
                    id: props.id,
                    title: props.title,
                    agenda: props.agenda,
                    startTime: props.startTime,
                    endTime: props.endTime,
                    participants: props.participants
                }
            }
        )
    }
    return (
        <div className="meeting-item">
            <div className="meeting-heading">
                <h2>{props.title}</h2>
                <div className="edit-icon">
                    <IconButton size="large" onClick={editMeeting}>
                        <EditIcon />
                    </IconButton>
                </div>
            </div>
            <div className="agenda">
                {props.agenda.substring(0, 50)}
            </div>
            <div className="meeting-time">
                <label> Scheduled On </label>
                <div>

                    {formatTime(startTime)} - {formatTime(endTime)}
                </div>
            </div>

            <div className="participants-list">
                {
                    props.participants.slice(0, 3).map(p => (
                        <Chip key={p._id} label={p.name} />
                    ))
                }
                {
                    props.participants.length > 3 && (
                        <>
                            and {props.participants.length - 3} more
                        </>
                    )
                }
            </div>
        </div>
    );
}

export default MeetingItem;
