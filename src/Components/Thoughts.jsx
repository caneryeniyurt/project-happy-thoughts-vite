import { useEffect, useState } from "react"
import { ThoughtList } from "./ThoughtList"
import { ThoughtForm } from "./ThoughtForm"
import "./Thoughts.css";

export const Thoughts = () => {
  const [loading, setLoading] = useState(false);
  const [thoughtsList, setThoughtsList] = useState([]);
  const [newThought, setNewThought] = useState("");

  // Happy Thoughts url
  const url ="https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts";
  

  const fetchThoughts = async () => {
    setLoading(true);
    try {
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setThoughtsList(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  const handleNewThoughtChange = (e) => {
    setNewThought(e.target.value);
  };


  const onFormSubmit = async (e) => {
    e.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        message: newThought,
      }),
    };

    
    try {
      const res = await fetch(url, options);
      if (res.ok) {
        await fetchThoughts();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setNewThought("");
    }
  };

  useEffect(() => {
    fetchThoughts();
  }, []);


  return (
    <div className="container">
        <ThoughtForm
        newThought = {newThought}
        onNewThoughtChange = {handleNewThoughtChange}
        onFormSubmit = {onFormSubmit}
         />

        <ThoughtList 
        loading = {loading}
        thoughtsList = {thoughtsList}
        />
    </div>
  );
};