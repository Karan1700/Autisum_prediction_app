import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

const questions = [
"Does the child respond when their name is called?",
"Does the child make eye contact?",
"Does the child point to objects to show interest?",
"Does the child smile back when someone smiles?",
"Does the child engage in pretend play?",
"Does the child follow where you look?",
"Does the child understand simple gestures?",
"Does the child respond to social interaction?",
"Does the child imitate actions or sounds?",
"Does the child show emotional response?"
];

const [step,setStep] = useState(0);

const [formData,setFormData] = useState({
A1_Score:0,
A2_Score:0,
A3_Score:0,
A4_Score:0,
A5_Score:0,
A6_Score:0,
A7_Score:0,
A8_Score:0,
A9_Score:0,
A10_Score:0,
age:"",
gender:"0",
ethnicity:"0",
jaundice:"0",
autism:"0",
country:"",
used_app_before:"0",
result:"",
relation:"0"
});

const [prediction,setPrediction] = useState("");
const [probability,setProbability] = useState(0);

const handleAnswer=(value)=>{

setFormData({
...formData,
[`A${step+1}_Score`]:value
});

setStep(step+1);

};

const handleChange=(e)=>{

setFormData({
...formData,
[e.target.name]:e.target.value
});

};

const handleSubmit=async(e)=>{

e.preventDefault();

const res = await axios.post("http://127.0.0.1:8000/predict",
formData
);

setPrediction(res.data.prediction);
setProbability(res.data.probability);

};

const progress = (step/questions.length)*100;

return(

<div className="app">

<header className="header">
Autism Detection System
</header>

<div className="container">

{step < questions.length ? (

<div className="glass-card">

<h2 className="question">
{questions[step]}
</h2>

<div className="buttons">

<button
className="yes"
onClick={()=>handleAnswer(0)}
>
Yes
</button>

<button
className="no"
onClick={()=>handleAnswer(1)}
>
No
</button>

</div>

<div className="progress-container">

<div
className="progress-bar"
style={{width:`${progress}%`}}
></div>

</div>

<p className="progress-text">
Question {step+1} / {questions.length}
</p>

</div>

) : (

<div className="glass-card">

<h2>Demographic Information</h2>

<form className="form" onSubmit={handleSubmit}>

<input
type="number"
placeholder="Age"
name="age"
onChange={handleChange}
/>

<select name="gender" onChange={handleChange}>
<option value="0">Male</option>
<option value="1">Female</option>
</select>

<select name="ethnicity" onChange={handleChange}>
<option value="0">White</option>
<option value="1">Asian</option>
<option value="2">Middle Eastern</option>
<option value="3">Black</option>
<option value="4">Hispanic</option>
</select>

<select name="jaundice" onChange={handleChange}>
<option value="0">No Jaundice</option>
<option value="1">Yes Jaundice</option>
</select>

<select name="autism" onChange={handleChange}>
<option value="0">No Family Autism</option>
<option value="1">Family Autism</option>
</select>

<input
type="number"
placeholder="Country Code"
name="country"
onChange={handleChange}
/>

<select name="used_app_before" onChange={handleChange}>
<option value="0">First Time User</option>
<option value="1">Used Before</option>
</select>

<input
type="number"
placeholder="Screening Score"
name="result"
onChange={handleChange}
/>

<select name="relation" onChange={handleChange}>
<option value="0">Parent</option>
<option value="1">Self</option>
<option value="2">Relative</option>
</select>

<button className="predict-btn">
Predict
</button>

</form>

{prediction && (

<div className="result">

<h3>{prediction}</h3>

<p>Autism Risk: {probability}%</p>

<div className="risk-bar">

<div
className="risk-fill"
style={{width:`${probability}%`}}
></div>

</div>

</div>

)}

</div>

)}

</div>

</div>

);

}

export default App;