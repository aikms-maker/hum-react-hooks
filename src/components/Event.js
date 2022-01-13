import { DELETE_EVENT, ADD_OPERATION_LOG } from "../actions";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { timeCurrentIso8601 } from "../utils";

export const Event = ({ event }) => {
  const { dispatch } = useContext(AppContext);
  const deleteEvent = () => {
    if (
      !window.confirm(`id=${event.id}のイベントを削除します。よろしいですか？`)
    ) {
      return;
    }
    dispatch({
      type: DELETE_EVENT,
      id: event.id,
    });

    dispatch({
      type: ADD_OPERATION_LOG,
      description: `id=${event.id}のイベントを削除しました。`,
      operatedAt: timeCurrentIso8601(),
    });
  };
  return (
    <tr>
      <td>{event.id}</td>
      <td>{event.title}</td>
      <td>{event.body}</td>
      <td>
        <button type="button" className="btn btn-danger" onClick={deleteEvent}>
          削除
        </button>
      </td>
    </tr>
  );
};
