import { useContext } from "react";
import { Event } from "./Event";
import { AppContext } from "../contexts/AppContext";

export const Events = () => {
  const { state } = useContext(AppContext);
  return (
    <>
      <h4>イベント一覧</h4>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>タイトル</th>
            <th>ボディ</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {state.events.map((event) => (
            <Event event={event} key={event.id} />
          ))}
        </tbody>
      </table>
    </>
  );
};
