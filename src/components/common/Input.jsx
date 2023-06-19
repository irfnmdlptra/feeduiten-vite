export default function Input(props) {
  return (
    <input
      type={props.type}
      className="form-control"
      placeholder={props.place}
      name={props.name}
      value={props.value}
      onChange={props.onCha}
      required
    />
  );
}
