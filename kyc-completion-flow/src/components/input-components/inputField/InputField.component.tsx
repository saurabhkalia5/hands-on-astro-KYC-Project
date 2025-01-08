import './inputField.styles.css'

interface InputFieldProps {
  label: string;
  errors?: string;
  handleValueChange: (key: string, value: string) => void;
  value: string;
  placeholder: string;
  id: string;
}

export default function InputField(props: InputFieldProps) {
  return (
    <div>
      <h2>{props.label}</h2>
      <input
        type="text"
        id={props.id}
        className={`text-input ${props.errors ? "error-outline" : ""}`}
        value={props.value}
        onChange={(e) => props.handleValueChange(props.id, e.target.value)}
        placeholder={props.placeholder}
      />
      {props.errors && <div className="error-message">{props.errors}</div>}
    </div>
  );
}
