import { useState } from "react"

export const ThoughtForm = ({newThought, onNewThoughtChange, onFormSubmit}) => {
  const [textAreaCount, setTextAreaCount] = useState(0);

  const reCalculate = (e) => {
    setTextAreaCount(e.target.value.length);
    onNewThoughtChange(e); 
  };

  return (
    <form onSubmit = {onFormSubmit} className="thought-formContainer">
        <h1>What is making you happy right now?</h1>

        {/* Textarea with word count */}
        <textarea
        type="text"
        wrap="soft"
        rows={3}
        value={newThought}
        onChange={reCalculate}
        maxLength={140}
        onNewThoughtChange={onNewThoughtChange}
        />

        <p className="textareaWordCount">
          {textAreaCount}/140
        </p>

        {/* Submit button */}
        <button 
          className="thought-formButton" 
          type="submit">
          <span className="heart">❤️</span> Send happy thought! <span className="heart">❤️</span>
        </button>
    </form>
  );
};