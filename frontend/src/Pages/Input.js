import axios from 'axios';
import './Input.css'
import React,{useState} from 'react';
import CustomButton from '../Components/StartButton';

export default function Input() {

	const [selectedFileC, setSelectedFileC] = useState(null);
	const [selectedFileB, setSelectedFileB] = useState(null);
	const [selectedFileM, setSelectedFileM] = useState(null);
	const [showLoader, setShowLoader] = useState(false)
	const [id, setID] = useState(null);
	
	// On file select (from the pop up)
	const onFileChangeC = event => {
	
	// Update the state
	setSelectedFileC(event.target.files[0]);
	
	};

	const onFileChangeB = event => {
	
		// Update the state
		setSelectedFileB(event.target.files[0]);
		
	};

	const onFileChangeM= event => {
	
			// Update the state
			setSelectedFileM(event.target.files[0]);
			
	};

	
	
	// On file upload (click the upload button)
	const onFileUpload = () => {
		setShowLoader(true)
	// Create an object of formData
	const formData = new FormData();
	// const formDataB = new FormData();
	// const formDataM = new FormData();
	// Update the formData object
	formData.append(
		"input_c1",
		selectedFileC
	);

	formData.append(
		"input_b1",
		selectedFileB
	);

	formData.append(
		"input_m1",
		selectedFileM
	);

	// formDataB.append(
	// 	"data",
	// 	selectedFileB
	// );

	// formDataM.append(
	// 	"data",
	// 	selectedFileM
	// );
	
	// Details of the uploaded file
	// console.log(selectedFile);
	
	// Request made to the backend api
	// Send formData object
	// console.log(formData);
	// axios.post("http://localhost:8000/api/input_c1", formDataC, {
	// 		headers: {
	// 			"Content-Type": "multipart/form-data",
	// 		},
	// 	});

	// axios.post("http://localhost:8000/api/input_b1", formDataB, {
	// 		headers: {
	// 			"Content-Type": "multipart/form-data",
	// 		},
	// 	});

	axios.post("http://localhost:8000/api/datainput/", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		})
		.then(function (res) {
			window.location='http://localhost:3000/monitor/'+ res.data.id
			setShowLoader(false)

		});
	console.log(id)
	};
	
	// File content to be displayed after
	// file upload is complete
	
	const fileData = () => {
	
	if (selectedFileC && selectedFileB && selectedFileM) {
		
		return (
			
		<div>
            <div className='list-data'>
				<div className='data-details'>
					<table id="customers">
						<tr>
							<th>File Name</th>
							<th>File Type</th>
							<th>Last Modified</th>
						</tr>
						<tr>
							<th>{selectedFileC.name}</th>
							<th>{selectedFileC.type}</th>
							<th>{selectedFileC.lastModifiedDate.toDateString()}</th>
						</tr>
						<tr>
							<th>{selectedFileB.name}</th>
							<th>{selectedFileB.type}</th>
							<th>{selectedFileB.lastModifiedDate.toDateString()}</th>
						</tr>
						<tr>
							<th>{selectedFileM.name}</th>
							<th>{selectedFileM.type}</th>
							<th>{selectedFileM.lastModifiedDate.toDateString()}</th>
						</tr>
					</table>
					{/* <h5>File Details:</h5>
					<p>File Names: {selectedFileC.name}, {selectedFileB.name}, {selectedFileM.name}</p>

					<p>File Type: {selectedFileC.type}</p>

					<p>
					Last Modified:{" "}
					{selectedFileC.lastModifiedDate.toDateString()}
					</p> */}
				</div>
                <div>
					{/* <button onClick={onFileUpload} class="start-button">START</button> */}
					<CustomButton
						text="Start"
						onSubmit={onFileUpload}
						loading={showLoader}
						disabled={showLoader}
					/>
					
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
		<div className='body-cont'>
            <div className='upload-container'>
                <h3>
                Input your data
                </h3>
				<br/>
                <div>
					<input class="form-control" onChange={onFileChangeC} type="file" aria-label="default input example"></input>
					<br></br>
					<input class="form-control" onChange={onFileChangeB} type="file" aria-label="default input example"></input>
					<br></br>
					<input class="form-control" onChange={onFileChangeM} type="file" aria-label="default input example"></input>
                </div>
            </div>
			{fileData()}
		</div>
	);
}
