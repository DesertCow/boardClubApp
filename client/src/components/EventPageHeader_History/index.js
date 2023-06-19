import { useNavigate } from "react-router-dom";

function EventPageHeaderHistory() {


  //Event Handlers

  const navigate = useNavigate();

  const handleCurrentEvents = async (event) => {
    event.preventDefault();
    navigate("/club_events/current_events");
  };

  return (

    <div className="d-flex flex-column min-vh-100">

      {/* <h1 className="homeTitle text-center mt-5"> Club Events Page!</h1> */}

      <div className="eventsTabBox">
         {/* <div className="d-flex align-items-center justify-content-center col px-5 py-3"> */}
         <div className="d-flex flex-col px-0 py-1 align-items-center justify-content-center">
          <div className="eventPageBtns p-3 m-3 text-center" onClick={(event) => handleCurrentEvents(event)}>Upcoming Events</div>
        </div>
      </div>

    </div>

  )

}

export default EventPageHeaderHistory;