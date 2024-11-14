export default function Logger({ logs }) {
  return (
    <>
      <ol id="log">
        {logs.map((a) => (
          <li key={Math.random()}>
            {a.player}= {a.square.row}, {a.square.col}
          </li>
        ))}
      </ol>
    </>
  );
}
