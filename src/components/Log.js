export const Log = ({ log }) => {
  return (
    <>
      <tr>
        <td>{log.description}</td>
        <td>{log.operatedAt}</td>
      </tr>
    </>
  );
};
