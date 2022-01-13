import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { Log } from "./Log";

export const Logs = () => {
  const { state } = useContext(AppContext);
  return (
    <>
      <h4>操作ログ一覧</h4>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>内容</th>
            <th>日時</th>
          </tr>
        </thead>
        <tbody>
          {state.operationLogs.map((log, index) => (
            <Log log={log} key={index} />
          ))}
        </tbody>
      </table>
    </>
  );
};
