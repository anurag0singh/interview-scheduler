import { Container, Form, Table } from "react-bootstrap";

const List = ({ participants, selectedParticipants, setSelectedParticipants }) => {

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

  const handleAddParticipant = async (e) => {
    if (e.target.checked) {
      setSelectedParticipants([...selectedParticipants, e.target.value]);
    }
    else {
      setSelectedParticipants(selectedParticipants.filter(entry => entry != e.target.value));
    }
  }

  console.log(selectedParticipants);

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