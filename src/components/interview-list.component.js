import { useEffect, useState } from "react";
import axios from 'axios';

function InterviewList() {

    const [interviews, setInterviews] = useState([]);

    useEffect(() => {
        const apiURL = "http://localhost:5000/interview/all/";
        axios.get(apiURL)
            .then(resp => { console.log(resp.data); setInterviews(resp.data) });
    }, []);

    const format = (date_time) => {
        let parsed_time = Date.parse(date_time);
        let dateObj = new Date(parsed_time);
        var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return new Intl.DateTimeFormat('en-US', options).format(dateObj);
    };

    const participant_items = (arr) => {
        return arr.map(participant => 
            <div className="col-sm-4">
                <div className="card-body participant-box">
                    <h6 className="card-title">{participant.name}</h6>
                    <div className="card-subtitle info-box"> Email : {participant.email} </div>
                    <div className="card-subtitle info-box"> Phone : {participant.phone} </div>
                    <div className="card-subtitle info-box"> Company : {participant.company} </div>
                </div>
            </div>
        );
    };

    const listItems = interviews.map((el) =>
        
            <div className="card interview-box" key={el.iid}>
                <div className="card-body">
                    <h5 className="card-title">{el.company}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{format(el.strt)} - {format(el.end)}</h6>
                    <p className="card-text">{el.position} : {el.place}</p>
                    <div className="row">
                        {participant_items(el.participants)}
                    </div>
                </div>
            </div>
        
    );

    return (
        <div>
            {listItems}
        </div>
    );
}

export default InterviewList;
