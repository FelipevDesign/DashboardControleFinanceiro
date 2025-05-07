import React, { useState, useRef, useEffect } from 'react';

interface EditableTextProps {
  value: string;
  onChange: (newValue: string) => void;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  className?: string;
  placeholder?: string;
  multiline?: boolean;
}

const EditableText: React.FC<EditableTextProps> = ({
  value,
  onChange,
  as = 'p',
  className = '',
  placeholder = 'Clique para editar...',
  multiline = false
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(value);
  
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  
  useEffect(() => {
    setText(value);
  }, [value]);
  
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      
      // Colocar cursor no final do texto
      if ('setSelectionRange' in inputRef.current) {
        const length = inputRef.current.value.length;
        inputRef.current.setSelectionRange(length, length);
      }
    }
  }, [isEditing]);
  
  const handleClick = () => {
    setIsEditing(true);
  };
  
  const handleBlur = () => {
    setIsEditing(false);
    if (text !== value) {
      onChange(text);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setText(e.target.value);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      setIsEditing(false);
      onChange(text);
    }
    
    if (e.key === 'Escape') {
      setIsEditing(false);
      setText(value);
    }
  };
  
  // Classes para os diferentes tamanhos de elementos
  const elementClasses = {
    h1: 'text-2xl font-bold',
    h2: 'text-xl font-semibold',
    h3: 'text-lg font-medium',
    h4: 'text-base font-medium',
    p: 'text-base',
    span: 'text-sm'
  };
  
  const inputClasses = `bg-white bg-opacity-90 border border-blue-300 rounded px-2 py-1 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 w-full ${className}`;
  
  const Element = multiline ? 'textarea' : 'input';
  
  const renderViewMode = () => {
    const Tag = as;
    return (
      <Tag 
        className={`cursor-pointer hover:bg-blue-50 rounded px-1 transition-colors ${elementClasses[as]} ${className}`}
        onClick={handleClick}
      >
        {value || <span className="text-gray-400 italic">{placeholder}</span>}
      </Tag>
    );
  };
  
  const renderEditMode = () => {
    if (multiline) {
      return (
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          value={text}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={`${inputClasses} min-h-[80px]`}
          rows={3}
          placeholder={placeholder}
        />
      );
    }
    
    return (
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        type="text"
        value={text}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={inputClasses}
        placeholder={placeholder}
      />
    );
  };
  
  return isEditing ? renderEditMode() : renderViewMode();
};

export default EditableText;