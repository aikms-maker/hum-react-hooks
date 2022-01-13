import React, { useState, useContext } from "react";
import {
  CREATE_EVENT,
  DELETE_ALL_EVENTS,
  ADD_OPERATION_LOG,
  DELETE_ALL_OPERATION_LOGS,
} from "../actions";
import { AppContext } from "../contexts/AppContext";
import { timeCurrentIso8601 } from "../utils";

const APP_KEY = "appWithRedux";

export const EventForm = () => {
  const { state, dispatch } = useContext(AppContext);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const addEvent = (e) => {
    e.preventDefault();
    console.log("addEvent");
    dispatch({
      type: CREATE_EVENT,
      title,
      body,
    });

    dispatch({
      type: ADD_OPERATION_LOG,
      description: "イベントを作成しました。",
      operatedAt: timeCurrentIso8601(),
    });

    setTitle("");
    setBody("");
  };

  const deleteAllEvents = async (e) => {
    e.preventDefault();
    if (!window.confirm("全てのイベントを削除してもよろしいですか？")) {
      return;
    }
    await dispatch({
      type: DELETE_ALL_EVENTS,
    });

    dispatch({
      type: ADD_OPERATION_LOG,
      description: "全てのイベントを削除しました。",
      operatedAt: timeCurrentIso8601(),
    });
    console.log("### deleteAllEvents end");
  };

  const deleteAllLogs = (e) => {
    e.preventDefault();
    if (!window.confirm("全てのログを削除してもよろしいですか？")) {
      return;
    }
    dispatch({
      type: DELETE_ALL_OPERATION_LOGS,
    });
  };

  const deleteLocalStorage = () => {
    localStorage.removeItem(APP_KEY);
  };

  const unCreatable = title === "" || body === "";
  const unDeleteAll = state.events.length === 0;
  const unDeleteLogAll = state.operationLogs.length === 0;
  const unDeleteLocalStorage =
    JSON.parse(localStorage.getItem(APP_KEY)) === null;
  return (
    <>
      <h4>イベント作成フォーム</h4>
      <form>
        <div className="form-group">
          <label htmlFor="formEventTitle">タイトル</label>
          <input
            className="form-control"
            id="formEventTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="formEventBody">ボディ</label>
          <input
            className="form-control"
            id="formEventBody"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>

        <button
          className="btn btn-primary"
          onClick={addEvent}
          disabled={unCreatable}
        >
          イベントを作成する
        </button>
        <button
          className="btn btn-danger"
          onClick={deleteAllEvents}
          disabled={unDeleteAll}
        >
          すべてのイベントを削除する
        </button>
        <button
          className="btn btn-danger"
          onClick={deleteAllLogs}
          disabled={unDeleteLogAll}
        >
          すべてのログを削除する
        </button>
        <button
          className="btn btn-danger"
          onClick={deleteLocalStorage}
          disabled={unDeleteLocalStorage}
        >
          ローカルストレージを削除する
        </button>
      </form>
    </>
  );
};
