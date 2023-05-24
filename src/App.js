import React, { useState/*, useEffect*/ } from 'react';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import ParticlesBg from 'particles-bg';
import './App.css';

function App() {
  //const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [box, setBox] = useState('');
  const [route, setRoute] = useState('signin');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({
            id:'',
            name: '',
            email:'',
            entries: 0,
            joined: ''            
        });

  /*useEffect(() => {
    fetch('http://localhost:3001/')
      .then(response => response.json())
      .then(console.log);
  });*/

  const loadUser = (data) => {
    setUser({
      id:data.id,
      name:data.name,
      email:data.email,
      entries:data.entries,
      joined: data.joined
    });
  }

  const calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height -(clarifaiFace.bottom_row * height)
    }
  }

  const displayFaceBox = (box) => {
    //console.log(box);
    setBox(box);
  }

  const onInputChange = (event) => {
    setImageUrl(event.target.value);
    setBox('');
  }

  /*const raw = JSON.stringify({
    "user_app_id": {
      "user_id": "koky",
      "app_id": "test"
    },
    "inputs": [
        {
            "data": {
                "image": {
                    "url": imageUrl
                }
            }
        }
    ]
  });

  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key 3bb2abf8530f4c439bfd0458cf6e674c'
      },
      body: raw
  };*/

  const onSubmit = () => {
    //fetch(`https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs`, requestOptions)
    fetch('http://localhost:3001/imageurl', {
      method: 'post',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: imageUrl
      })
    })
    .then(response => response.json())
    .then(fg => {
      if(fg) {
        fetch('http://localhost:3001/image', {
          method:'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          let userUpdate = Object.assign({}, user);
          userUpdate.entries = count;
          setUser(userUpdate);
        })
      }
      displayFaceBox(calculateFaceLocation(fg));
    })
    .catch(error => console.log('error', error));
  }

  const onRouteChange = (ruta) => {
    if(ruta === 'signout'){
      setIsSignedIn(false);
      setImageUrl('');
      setBox('');
      setUser({
            id:'',
            name: '',
            email:'',
            entries: 0,
            joined: ''            
        });
    } else if (ruta === 'home'){
      setIsSignedIn(true);
    }
    setRoute(ruta);
  }

  return (
    <div className="App">
      <ParticlesBg type="cobweb" bg={true} />
      <Navigation  isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
      { route === 'home' ?
        <div>
          <Logo />
          <Rank name={user.name} entries={user.entries} />
          <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onSubmit} />
          <FaceRecognition box={ box } imageUrl={ imageUrl } />
        </div>
        : (
            route === 'signin' 
            ? <SignIn loadUser={loadUser} onRouteChange={ onRouteChange } />
            : <Register loadUser={loadUser} onRouteChange={ onRouteChange } /> 
          )
        
      }
    </div>
  );
}

export default App;
