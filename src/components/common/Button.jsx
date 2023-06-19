export default function Button(props) {
  return (
    <button type={props.type} onClick={props.onClick} className={props.variant}>
      {props.text} <i className={props.icon}></i>
    </button>
  );
}


// export default function ButtonSave(props) {
//   return  <button type="submit" className={props.variant} onClick={addItem}>
//   Save
// </button>
// }