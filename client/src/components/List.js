import { Container, Form, Table } from "react-bootstrap";
import { getAllInterviewsForAUserOnThisDay } from "../requests/methods";

const List = ({ participants, selectedParticipants, setSelectedParticipants, date, startTime, endTime, setMessage }) => {

  let defaultCheckValues = new Array(participants.length);

  const selectedParticipantsSet = new Set();
  selectedParticipants.forEach(element => {
    selectedParticipantsSet.add(element._id);
  });
  for (let idx = 0; idx < participants.length; idx++) {
    const element = participants[idx];
    if (selectedParticipantsSet.has(element._id)) defaultCheckValues[idx] = true;
    else defaultCheckValues[idx] = false;
  } 

  const checkForTimeConflicts = async (id) => {
    const interviewsToday = await getAllInterviewsForAUserOnThisDay({id, date}).then(data => data.interviews);
    if(interviewsToday.length == 0) return false;
    console.log(interviewsToday);
    const ISOStartTime = new Date(startTime);
    const ISOEndTime = new Date(endTime);
    const conflictingInterviews = interviewsToday.filter((interview) => interview.startTime > ISOEndTime || interview.endTime < ISOStartTime);
    if(conflictingInterviews.length > 0) {
      return true;
    }
    else {
      return false;
    }
  }

  const handleAddParticipant = async (e) => {
    if (e.target.checked) {
      const isConflicting = await checkForTimeConflicts(e.target.value);
      console.log(isConflicting);
      if(!isConflicting) {
        setSelectedParticipants(prev => [...prev, e.target.value]);
      }
      else{
        setMessage(`Time is conflicting`)
      }
    }
    else {
      setSelectedParticipants(prev => prev.filter(entry => entry != e.target.value._id));
    }
  }
  return (
    <Container className="my-3">
      <Table className="table table-hover" bordered>
        <thead>
          <tr>
            <th className="text-center text-uppercase">
              Select participants
            </th>
          </tr>
        </thead>
        <tbody>
          {participants.map((participant, index) => (
            <tr key={index}>
              <td>
                <Form.Check
                  inline
                  label={participant.name}
                  value={participant._id}
                  name="group1"
                  type="checkbox"
                  onChange={handleAddParticipant}
                  defaultChecked={defaultCheckValues[index] ? defaultCheckValues[index] : false}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default List;