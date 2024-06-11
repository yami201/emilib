const Input = ({type, name , required=false,defaultValue, onChange, placeholder}) => {
    return ( 
        <input 
            type={type} 
            className="w-full border p-2 rounded-lg" 
            defaultValue={defaultValue} 
            required={required}
            name={name}
            onChange={onChange}
            placeholder={placeholder}
        />
     );
}
 
export default Input;