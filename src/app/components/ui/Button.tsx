import React , { ButtonHTMLAttributes }  from 'react'


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger';
  }
  


  const Button: React.FC<ButtonProps> = ({ variant = 'primary', className, children, ...rest }) => {
    // Define Tailwind CSS classes based on the variant prop
    const variantClasses = {
      primary: 'bg-blue-500 hover:bg-blue-600 text-white',
      secondary: 'bg-gray-700 hover:bg-gray-600 text-white',
      danger: 'bg-red-500 hover:bg-red-600 text-white',
    }[variant];
  
    // Combine the variant classes with any custom classes passed as props
    const combinedClasses = `px-4 py-2 rounded-md focus:outline-none ${variantClasses} ${className}`;
  
    return (
      <button className={combinedClasses} {...rest}>
        {children}
      </button>
    );
  };

export default Button
