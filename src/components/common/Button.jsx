export default function Button(props) {
  return (
    <button type={props.type} onClick={props.onClick} className={props.variant}>
      {props.text} <i className={props.icon}></i>
    </button>
  );
}

