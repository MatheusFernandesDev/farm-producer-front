import { InputHTMLAttributes, useEffect, useState } from 'react'
import { Input } from './ui/input'
import { IErrorsType } from '@/interface/IErrorsType'




  
interface TextInputTypes extends InputHTMLAttributes<HTMLInputElement> {
	name_field?: string
	name_placeholder?: string
	disabled?: boolean
	value?: string,
	params?: string,
	errors?: []
}


const TextInput = ({
	name_field,
	name_placeholder,
	value,
	disabled,
	params,
	errors,
	...props
}: TextInputTypes) => {
	const [error, setError] = useState<IErrorsType>();

	useEffect(() => {
		if (errors) {
		  setError(errors.find((err: IErrorsType) => err?.property === params));
		}
	  }, [errors, params]);
	

	  const handleInputClick = () => {
		setError({property: "", message: ""}); // Limpa o estado de erro apenas para este input
	  };

return (
    <div>
      <p className="flex items-center gap-2 text-sm mb-1">{name_field}</p>
      <Input
        className="w-full bg-white dark:bg-black placeholder-gray-400 text-black dark:text-white outline-none"
        id={name_field}
        value={value}
        disabled={disabled}
        type="text"
        placeholder={name_placeholder}
		onClick={handleInputClick}
        {...props}
      />
      {error && (
        <span className="text-red-500 text-sm">{error.message}</span>
      )}
    </div>
  );
}

export default TextInput
