import axios from 'axios';
import './Input.css'
import React,{useState} from 'react';

export default function Input() {

	const [selectedFile, setSelectedFile] = useState(null);
	const [id, setID] = useState(null);
	
	// On file select (from the pop up)
	const onFileChange = event => {
	
	// Update the state
	setSelectedFile(event.target.files[0]);
	
	};

	
	
	// On file upload (click the upload button)
	const onFileUpload = () => {
	
	// Create an object of formData
	const formData = new FormData();
	
	// Update the formData object
	formData.append(
		"data",
		selectedFile
	);
	
	// Details of the uploaded file
	console.log(selectedFile);
	
	// Request made to the backend api
	// Send formData object
	console.log(formData);
	axios.post("http://localhost:8000/api/datainput/", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		})
		.then(function (res) {
			window.location='http://localhost:3000/monitor/'+ res.data.id

		}).catch((error) => {
				return error.response;
		}
		);

	console.log(id)
	};
	
	// File content to be displayed after
	// file upload is complete
	
	const fileData = () => {
	
	if (selectedFile) {
		
		return (
			
		<div>
			
            <div className='list-data'>
				<div className='data-details'>
					<h5>File Details:</h5>
					<p>File Name: {selectedFile.name}</p>

					<p>File Type: {selectedFile.type}</p>

					<p>
					Last Modified:{" "}
					{selectedFile.lastModifiedDate.toDateString()}
					</p>
				</div>
                <div>
					<button onClick={onFileUpload} class="start-button">START</button>
				</div>
            </div>
			

		</div>
		);
	} else {
		return (
		<div className='list-data'>
			No datasets added
		</div>
		);
	}
	};
	
	return (
		<div>
            <div className='upload-container'>
                <h3>
                Input your data
                </h3>
				<br/>
                <div>
					<input class="form-control" onChange={onFileChange} type="file" aria-label="default input example"></input>
                </div>
            </div>
			{fileData()}
		</div>
	);
}
