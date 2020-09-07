import React, { useState } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import "./Home.css";

export default function Home() {
    const [imageURL, setImageURL] = useState("");

    function calculateFaceLocation(face, imageWidth, imageHeight) {
        return {
            top: face.top_row * imageHeight,
            right: imageWidth - (face.right_col * imageWidth),
            bottom: imageHeight - (face.bottom_row * imageHeight),
            left: face.left_col * imageWidth
        }
    }

    function displayImage() {
        const image = document.getElementById("inputImage");
        image.src = imageURL;
    }

    function displayBoundingBoxes(response) {
        const image = document.getElementById("inputImage");
        const imageWidth = Number(image.width);
        const imageHeight = Number(image.height);
        console.log(imageWidth, imageHeight);
        const imageDisplayArea = document.getElementById("imageDisplayArea");
        let boxes = document.getElementById("boxes");
        boxes.remove();
        boxes = document.createElement("div");
        boxes.id = "boxes";
        imageDisplayArea.appendChild(boxes);
        const faces = response['outputs'][0]['data']['regions'];
        for (let i = 0; i < faces.length; i++) {
            let face = faces[i]['region_info']['bounding_box'];
            let pos = calculateFaceLocation(face, imageWidth, imageHeight);
            let box = document.createElement("div");
            box.className = 'bounding-box';
            box.style.top = pos.top + 'px';
            box.style.right = pos.right + 'px';
            box.style.bottom = pos.bottom + 'px';
            box.style.left = pos.left + 'px';
            boxes.appendChild(box);
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        fetch('https://guarded-brook-59804.herokuapp.com/imageurl', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                input: imageURL
            })
        })
            .then(response => response.json())
            .then(response => {
                displayImage();
                displayBoundingBoxes(response);
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="Home">
            <div className="lander">
                <h1>Smart Brain</h1>
                <p>A simple face recognition app</p>
            </div>

            <div className="imageURLForm text-center">
                <form onSubmit={handleSubmit}>
                    <FormGroup controlId="imageUrl" bsSize="large">
                    <FormControl
                        autoFocus
                        type="url"
                        value={imageURL}
                        onChange={e => setImageURL(e.target.value)}
                        placeholder="Enter the image URL here"
                        className="mb-2 mr-sm-2"
                    />
                    </FormGroup>
                    <Button type="submit" className="mb-2">
                        Detect
                    </Button>
                </form>
            </div>

            <div className='result text-center'>
                <div id='imageDisplayArea'>
                    <img id='inputImage' alt='' src="" width='480px' height='auto' />
                    <div id="boxes"></div>
                </div>
            </div>
        </div>
    );
}
