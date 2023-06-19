import Input from "../common/Input";
import Label from "../common/Label";

export default function FormControl(props) {
  return (
    <>
      <Label desc={props.desc}/>
      <Input
        type={props.type}
        place={props.placeholder}
        name={props.name}
        value={props.value}
        onCha={props.onChange}
      />
    </>
  );
}
